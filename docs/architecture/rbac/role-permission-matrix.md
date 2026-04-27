# Role-Permission Matrix

This table summarizes which roles have access to specific resources and actions within the system.

## Legend
*   **Full**: Full access (Create, Read, Update, Delete).
*   **Read**: View-only access.
*   **No**: Access denied.
*   **Forbidden**: Restricted by hierarchy (users cannot manage roles equal to or higher than their own).
*   **Own Dept**: Access is restricted exclusively to the user's assigned department. For example, a Manager can only see or edit employees who belong to the same department as the Manager.

## Matrix

| Action / Resource | SUPER_ADMIN | ADMIN | HR | MANAGER | EMPLOYEE |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Global (Platform)** | | | | | |
| Manually create company | Full | No | No | No | No |
| Manage limits / subscriptions | Full | No | No | No | No |
| **Company (Own)** | | | | | |
| Edit company settings | Full | Full | No | No | No |
| Read company data | Full | Full | Full | Read | Read |
| **Structure** | | | | | |
| CRUD departments | Full | Full | Full | Edit Own | No |
| CRUD positions | Full | Full | Full | No | No |
| **User Management** | | | | | |
| Create / edit ADMIN | Full | Full | Forbidden | Forbidden | Forbidden |
| Create / edit HR | Full | Full | Full | Forbidden | Forbidden |
| Create / edit MANAGER | Full | Full | Full | Forbidden | Forbidden |
| Manage regular employees | Full | Full | Full | Own Dept | No |
| Block / unblock users | Full | Full [1] | No | No | No |
| **Invites** | | | | | |
| Create / cancel invites | Full | Full | Full [2] | No | No |
| View invite list | Full | Full | Full | Read | No |

**Notes:**
*   **[1] Except self**: An Admin cannot block or delete their own account to prevent accidental lockout.
*   **[2] Except for the ADMIN role**: HR managers can invite Managers and Employees, but they do not have the authority to invite or create new Company Admins.
