# Access Control & Permissions (RBAC)

## 1. Business Goal
The Access Control system ensures data security and integrity through a rigorous Role-Based Access Control (RBAC) model. It supports a hierarchy of roles and atomic permissions, allowing for flexible configuration of access to specific features and sensitive data based on a user's position and responsibility within the organization.

---

## 2. Functional Blocks (Logic Flows)

### Role Hierarchy & Priority
The system utilizes a prioritized role model where lower numeric values represent higher authority:
`super_admin (0)` > `admin (10)` > `hr (20)` > `manager (30)` > `employee (40)`.

*   **Management Logic:** A user with a higher priority role (lower number) can manage users with roles of lower priority.
*   **Immutable Authority:** A user cannot elevate their own role beyond their current priority or modify users with a role higher than their own.

### Permission Calculation
This logic determines the "effective rights" a `currentUser` has over a `targetUser` (or object).
*   **Hierarchy Rule:** Access is denied if the `targetUser` has a higher or equal role priority than the `currentUser` (except for self-management).
*   **Self-Service Rule:** Users always maintain a baseline of "self" permissions to manage their own profiles and preferences, regardless of their global role.

### Atomic Permissions
Specific actions are guarded by unique string keys (e.g., `user.update`, `user.delete`, `admin.all`). This allows for granular control beyond simple role checks.

---

## 3. Technical Requirements (Logic)

### UserPermissions Interface
The calculation logic should return a standardized object containing access flags:
*   `canEditEmail`: Permission to modify contact data.
*   `canEditRoles`: Permission to change user access levels.
*   `canEditStatus`: Permission to block/unblock accounts.
*   `canDelete`: Permission to remove a user from the system.

### Core Logic Functions
*   **`hasPermission(permissionName: string): boolean`**: Checks if the current user possesses a specific atomic permission key in their profile.
*   **`calculatePermissions(currentUser, targetUser): UserPermissions`**: Compares the roles and permissions of both participants to generate a set of boolean flags for the UI.

### UI Visibility Logic (Preventive Hiding)
Components should be conditionally rendered based on permission flags. If a user lacks `canEditRoles`, the role selection dropdown should be entirely absent from the DOM, not just disabled.

---

## 4. Hierarchy Rules (Standard Implementation)

*   **super_admin:** Absolute access to all modules and user data.
*   **admin:** Can manage all organizational aspects and users, excluding `super_admin` accounts.
*   **hr:** Can manage personnel data and recruitment for employees, but cannot modify data belonging to administrators.
*   **employee:** Restricted to personal "Self-Service" data and public organizational charts.
