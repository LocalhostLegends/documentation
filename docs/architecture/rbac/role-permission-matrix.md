# Role-Permission Matrix

This matrix summarizes the base permissions for each role. Note that **SUPER_ADMIN** is exempt from most ABAC rules (like Company Boundaries).

| Resource / Action | SUPER_ADMIN | ADMIN | HR | MANAGER | EMPLOYEE |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Companies (Global)** | Full | No | No | No | No |
| **System Settings** | Full | No | No | No | No |
| **Company Data (Own)** | Full | Full | Read | Read | Read |
| **Departments** | Full | Full | Full | Read/Update [1] | No |
| **Users (Employee)** | Full | Full | Full | Own Dept | No |
| **Users (HR)** | Full | Full | Read [2] | No | No |
| **Users (ADMIN)** | Full | Full | Read | No | No |
| **Invites** | Full | Full | Full | No | No |

**Notes:**
*   **[1] Manager Scope:** Limited to their own department.
*   **[2] HR Rule:** Cannot modify other HR members (Horizontal blocking).
*   **SUPER_ADMIN** always sees all data across all companies.
