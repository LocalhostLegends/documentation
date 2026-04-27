# Permission Service (`can()`)

The core logic for access control is encapsulated in a centralized `PermissionService`. This ensures that security rules are consistent across the API, Web, and Mobile clients.

## The `can()` Method

The primary interface for checking permissions is the `can()` method. It evaluates the current user against a specific action and, optionally, a target resource.

```typescript
// Example usage in the backend
const allowed = permissionService.can(currentUser, Action.UPDATE_EMPLOYEE, targetEmployee);
```

### Why a Centralized Service?
*   **Consistency**: Rules are defined in one place, avoiding "spaghetti" logic in controllers or services.
*   **Testability**: The service can be unit-tested in isolation against various role/scope combinations.
*   **Readability**: Business logic stays clean and focused on "what" to do, while the service handles the "if it's allowed" logic.

## Backend Implementation

The permissions system is implemented as a modular service architecture to ensure scalability as more resources are added.

### Folder Structure
Permissions are categorized by resource to keep the logic manageable:

```text
src/permissions/
├── actions/
│   ├── employee.actions.ts      # Action enums for employees
│   └── department.actions.ts    # Action enums for departments
├── employee.permissions.ts      # Logic for employee-related actions
├── department.permissions.ts    # Logic for department-related actions
└── permissions.service.ts       # Central Facade for 'can()' calls
```

### Action Definitions
Actions are defined using string-based enums to provide clear, human-readable identifiers:

```typescript
// employee.actions.ts
export enum EmployeeAction {
  Read = 'employee.read',
  Update = 'employee.update',
  Delete = 'employee.delete',
}
```

### The Facade Pattern
The `PermissionsService` acts as a **Facade**. It doesn't contain all the logic itself; instead, it delegates to resource-specific permission files based on the action type.

```typescript
// permissions.service.ts
can(user: User, action: string, resource?: any): boolean {
  if (action.startsWith('employee.')) {
    return this.employeePermissions.check(user, action, resource);
  }
  // ... other resource checks
}
```

## Evaluation Logic

When `can(user, action, target)` is called, the service follows these steps:

1.  **Bypass Check**: If `user.role === SUPER_ADMIN`, immediately return `true`.
2.  **Action Check**: Does the user's role have the base permission to perform the `Action`? (e.g., An `EMPLOYEE` cannot perform `CREATE_DEPARTMENT`).
3.  **Hierarchy Check**: If the action involves another user (e.g., blocking or editing), the service checks if the target's role is lower than the current user's role.
4.  **Scope Check**: Is the target within the user's permitted scope?
    *   **ADMIN/HR**: Check if target is in the same `Company`.
    *   **MANAGER**: Check if target is in the same `Department`.
    *   **EMPLOYEE**: Check if the target is the user themselves (`target.id === user.id`).

## Usage in Guards

The `PermissionService` is typically used within decorators or guards to protect API endpoints:

```typescript
@UseGuards(PermissionsGuard)
@CheckPermissions([Action.DELETE_EMPLOYEE, 'employee'])
async deleteEmployee(@Param('id') id: string) {
  return this.employeesService.remove(id);
}
```
