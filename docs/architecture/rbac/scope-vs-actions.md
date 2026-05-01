# Scope vs. Actions (RBAC vs. ABAC)

## 1. Scopes & Rules (Dynamic Layer)

Scopes define the boundaries of an action. **SUPER_ADMIN** introduces the "Global" scope.

| Scope | Description | Primary Roles |
| :--- | :--- | :--- |
| **Global** | Full access across all companies and resources. | SUPER_ADMIN |
| **Company** | Access limited to the user's own company. | ADMIN, HR |
| **Department** | Access limited to the user's assigned department. | MANAGER |
| **Self** | Access limited to the user's own profile. | EMPLOYEE |

## 2. Policy Overrides for SUPER_ADMIN

In the code implementation, the `PermissionsService` often includes a bypass for the `SUPER_ADMIN` role:

```typescript
if (user.role === UserRole.SUPER_ADMIN) {
  return { effect: 'ALLOW' }; // Immediate bypass for all rules
}
```

This means that rules like `CompanyBoundaryRule` (Priority 0) are skipped, allowing the Super Admin to monitor or fix data in any client organization.

## 3. Hierarchy Rules

The system prevents "Horizontal" or "Vertical" modification by users of the same or lower roles, but **SUPER_ADMIN** sits outside this logic:

- **HR** cannot edit **HR**.
- **MANAGER** cannot edit **MANAGER**.
- **ADMIN** cannot edit **ADMIN** (in some configurations).
- **SUPER_ADMIN** can edit **EVERYONE**.
