# Scope vs. Actions

Understanding the difference between **what** a user can do and **where** they can do it is critical to the system's security model.

## 1. Actions (The "What")

Actions are specific operations defined in the system. They represent the "verb" in a permission check.
*   `CREATE_USER`, `DELETE_USER`
*   `EDIT_COMPANY_SETTINGS`
*   `MANAGE_INVITES`
*   `READ_FINANCIALS`

## 2. Scopes (The "Where")

Scopes define the boundary of an action. They represent the "adverb" or the "context" of the permission.

| Scope | Description | Primary Users |
| :--- | :--- | :--- |
| **Global** | Across the entire platform (all companies). | Super Admin |
| **Company** | Anywhere within the user's organization. | Admin, HR |
| **Department** | Restricted to the user's assigned department(s). | Manager |
| **Personal** | Restricted only to the user's own data. | Employee |

## 3. The Permission Formula

In the `PermissionService`, a decision is made based on three factors:
**Permission = Action + Scope + Hierarchy**

### Case Study: Editing a Profile
Suppose a user wants to execute the `EDIT_USER` action on a target profile.

*   **Scenario A (Admin)**:
    *   **Action**: `EDIT_USER` (Allowed).
    *   **Scope**: `COMPANY` (Target is in same company).
    *   **Hierarchy**: `TARGET_IS_LOWER` (Target is HR).
    *   **Result**: ✅ **ALLOWED**.

*   **Scenario B (HR)**:
    *   **Action**: `EDIT_USER` (Allowed).
    *   **Scope**: `COMPANY` (Target is in same company).
    *   **Hierarchy**: `TARGET_IS_EQUAL` (Target is another HR).
    *   **Result**: ❌ **DENIED** (Cannot manage equal roles).

*   **Scenario C (Manager)**:
    *   **Action**: `EDIT_USER` (Allowed).
    *   **Scope**: `DEPARTMENT` (Target is in a DIFFERENT department).
    *   **Result**: ❌ **DENIED** (Out of scope).
