# Roles Overview

The system uses a role-based hierarchy combined with attribute-based restrictions. At the top of the hierarchy is the **SUPER_ADMIN**, followed by company-specific roles.

## Role Hierarchy

1.  **SUPER_ADMIN**: Platform-level control (Global).
2.  **ADMIN**: Company-level owner.
3.  **HR**: Human Resources & Staff management.
4.  **MANAGER**: Department Lead.
5.  **EMPLOYEE**: Individual contributor.

---

## Detailed Descriptions

### 🛡️ SUPER_ADMIN (Platform Administrator)
*   **Scope:** Global (All Companies).
*   **Purpose:** System-wide maintenance, technical support, and platform management.

**Capabilities:**
*   **Bypass:** Can access any company and any resource without boundary restrictions.
*   **Infrastructure:** Can manage companies, subscription plans, and global system settings.
*   **Support:** Can act on behalf of any user to resolve technical issues.

---

### 👑 ADMIN (Company Administrator)
*   **Scope:** Full Company.
*   **Purpose:** Business owner or primary decision-maker for the organization.

**Capabilities:**
*   **Company:** Full read/write access to all settings of their specific company.
*   **Structure:** Full CRUD on departments and positions.
*   **Employees:** Full CRUD operations on all users within the company.

---

### 🤝 HR (Human Resources Manager)
*   **Scope:** Entire Company (Staff & Structure focus).
*   **Purpose:** Staff administration and onboarding.

**Capabilities:**
*   **Employees:** Can manage most employees in the company.
*   **Restrictions:** Cannot manage users with the **ADMIN** role or other **HR** members (Horizontal Blocking).

---

### 📋 MANAGER (Department Manager)
*   **Scope:** Assigned Department.
*   **Purpose:** Team Leads and Department Heads.

**Capabilities:**
*   **Department:** Can manage their own department's settings.
*   **Employees:** Can only manage employees specifically assigned to their department.
*   **Restrictions:** Cannot manage users with **ADMIN**, **HR**, or other **MANAGER** roles.

---

### 👤 EMPLOYEE (Regular Employee)
*   **Scope:** Personal Profile.
*   **Purpose:** Basic system user.

**Capabilities:**
*   **Profile:** Can manage their own "safe" profile fields (avatar, phone, etc.).
*   **Colleagues:** Can view basic directory info.
