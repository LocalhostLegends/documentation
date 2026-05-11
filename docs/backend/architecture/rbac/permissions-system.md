# Authorization & Permission System

This document describes the hybrid **RBAC** (Role-Based Access Control) and **ABAC** (Attribute-Based Access Control) system implemented in the NestJS application.

## 1. Architecture Overview

The system operates in two distinct phases to determine if an action is permitted:

1.  **RBAC (Static Layer):** Checks if the user's role has the requested `PermissionAction` assigned in the database.
2.  **ABAC / Policy Rules (Dynamic Layer):** If RBAC allows the action, the system executes a pipeline of `PolicyRules`. These rules evaluate dynamic attributes (e.g., "Is this user in my department?" or "Am I trying to edit a restricted field in my own profile?").

### Execution Flow
`Request` → `PermissionGuard` → `PermissionsService` → `Rule Pipeline` → `Final Decision (ALLOW/DENY)`

---

## 2. Core Components

### 🛡️ PermissionGuard
The entry point for authorization. It performs several critical tasks:
- **Metadata Extraction:** Identifies the required action via `@RequirePermission`.
- **Automatic Resource Loading:** Uses `@Resource` metadata to fetch the target entity from the database using TypeORM repositories.
- **Composite Resource Creation:** For `PATCH` and `PUT` requests, it creates a "Composite Resource" that combines the current state (`old`) and the incoming changes (`new`).
- **Request Enrichment:** Attaches the loaded resource to `request.resource` to avoid redundant DB calls in controllers.

### ⚙️ PermissionsService
The central orchestrator of the permission logic:
- **`assertCan(user, action, resource)`:** The main method that throws a `ForbiddenException` if access is denied.
- **Rule Pipeline:** Iterates through all registered `PolicyRules`, sorted by their `priority`.
- **Decision Tracing:** Generates a trace string (e.g., `RBAC:ALLOW -> RuleA:SKIP -> RuleB:DENY`) for debugging.

### 📜 PolicyRule (Interface)
Every dynamic rule must implement the `PolicyRule` interface:
- `priority`: Execution order (lower numbers run first).
- `supports(action)`: Determines if the rule should run for a specific action.
- `check(user, action, resource)`: Returns a `PolicyResult` (`ALLOW`, `DENY`, or `SKIP`).

### 🛠️ ResourceHelper
A utility service that abstracts attribute extraction. It can retrieve `companyId`, `departmentId`, or `role` from various formats:
- Database Entities.
- Data Transfer Objects (DTOs).
- Composite Resources.

---

## 3. Rules and Priorities

Rules are executed in order of priority. A `DENY` result immediately halts the pipeline and rejects the request.

| Rule | Priority | Responsibility |
| :--- | :---: | :--- |
| **CompanyBoundaryRule** | 0 | **Hard Boundary.** Prevents any access to resources belonging to other companies. |
| **SelfAccessRule** | 10 | **Self-Service.** Allows users to read their own profile and update "safe" fields (e.g., `avatar`, `phone`). |
| **HrRestrictionRule** | 50 | **Hierarchy Protection.** Prevents HR from modifying Admins or other HR members. |
| **DepartmentScopeRule** | 60 | **Managerial Scope.** Limits Managers to resources within their own department. |

---

## 4. The Composite Resource

For update operations, the `PermissionGuard` synthesizes a composite object. This is crucial for rules that need to compare state or validate specific field changes.

**Structure:**
```typescript
{
  id: string;         // The ID of the resource
  old: User;          // The current state from the database
  new: UpdateUserDto; // The requested changes from the request body
  role: string;       // Final role (new.role || old.role)
  companyId: string;  // Final companyId
  departmentId: string; // Final departmentId
}
```

*Example:* `SelfAccessRule` uses this to ensure a user isn't trying to update their own `role` field.

---

## 5. Implementation Guide

### Using in Controllers

Protect your endpoints using the `@RequirePermission` and `@Resource` decorators:

```typescript
@Patch(':id')
@RequirePermission(PermissionAction.USER_UPDATE)
@Resource(User, 'id') // Automatically loads User by the 'id' param
async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
  // Guard has already verified access and loaded the resource into request.resource
  return this.usersService.update(id, dto);
}
```

### Adding a New Action
1.  Add the action to the `PermissionAction` enum.
2.  Create a database migration to insert the permission and link it to the appropriate roles.

### Adding a New Policy Rule
1.  Create a class implementing `PolicyRule`.
2.  Register the class as a provider in `PermissionsModule`.

```typescript
@Injectable()
export class ProjectAccessRule implements PolicyRule {
  priority = 100;

  supports(action: string) {
    return action.startsWith('project.');
  }

  check(user: AuthorizedUser, action: string, resource: any): PolicyResult {
    if (resource.isPrivate && resource.ownerId !== user.id) {
      return { 
        effect: 'DENY', 
        reason: { code: ExceptionCode.AUTH_FORBIDDEN_RESOURCE, params: ['Private project'] } 
      };
    }
    return { effect: 'SKIP' };
  }
}
```

---

## 6. Tracing & Debugging

If a request is denied, check the application logs for the permission trace. It shows the step-by-step decision process.

**Log Format:**
`Permission DENY for [user_email] on [action]. Trace: RBAC:ALLOW -> CompanyBoundaryRule:SKIP -> SelfAccessRule:SKIP -> HrRestrictionRule:DENY(AUTH_FORBIDDEN_RESOURCE)`

---

## 7. Performance & Scaling

- **Caching:** Permissions are cached per user. The `permissionsVersion` field in the User entity is used to invalidate the cache when rights are updated.
- **Multi-Instance:** In production, replace the local `Map` in `PermissionsService` with **Redis** to synchronize permission versions across nodes.
- **Lazy Loading:** `PermissionGuard` loads resources with minimal relations (`company`, `department`) required for rules to function.

---

## 8. Checklist for New Features

When adding a new resource type (e.g., "Invite" or "Position"):
- [ ] Define `PermissionAction` enums.
- [ ] Create SQL migrations for `permissions` and `role_permissions`.
- [ ] Ensure `ResourceHelper` can extract `companyId` and `departmentId` from the new entity/DTO.
- [ ] Verify if `CompanyBoundaryRule` needs specific error codes for the new resource.
- [ ] Check if `DepartmentScopeRule` should apply to the new actions.
- [ ] Add `@RequirePermission` and `@Resource` to the new controllers.
