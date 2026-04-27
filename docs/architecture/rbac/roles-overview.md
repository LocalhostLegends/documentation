# Roles Overview

The system uses a strict hierarchy where each role represents a specific level of authority and responsibility.

## Role Hierarchy

1.  **SUPER_ADMIN**: Platform-level control.
2.  **ADMIN**: Company-level owner.
3.  **HR**: Staff & structure management.
4.  **MANAGER**: Team/Department lead.
5.  **EMPLOYEE**: Individual contributor.

---

## Detailed Descriptions

### 🛡️ SUPER_ADMIN (System Administrator)
*   **Scope**: Global (Entire Platform).
*   **Purpose**: Technical administration, B2B onboarding, customer support, and system-wide maintenance.

**Capabilities:**
*   Full access to any company without restrictions.
*   Manual company creation (for B2B clients or demo modes).
*   Management of platform limits, quotas, and subscription plans.
*   Error recovery (e.g., manually fixing onboarding failures).

---

### 👑 ADMIN (Company Administrator)
*   **Scope**: Full Company.
*   **Purpose**: Business owner, CEO, or primary decision-maker for the organization.

**Capabilities:**
*   **Company**: Full read/write access to all company settings and billing.
*   **Structure**: Full CRUD on departments and positions.
*   **Employees**: Full CRUD operations on all users, including role assignment.
*   **Blocking**: Can block any user within the company except themselves.
*   **Invites**: Full control over company invitations.

---

### 🤝 HR (Human Resources Manager)
*   **Scope**: Entire Company (People & Structure focus).
*   **Purpose**: Staff administration and employee onboarding.

**Capabilities:**
*   **Company**: Read-only access to global settings; cannot modify billing.
*   **Structure**: Full CRUD on departments and positions to facilitate hiring.
*   **Employees**: Can manage anyone except the ADMIN role.
*   **Invites**: Can create invitations (except for the ADMIN role).

---

### 📋 MANAGER (Department Manager)
*   **Scope**: Assigned Department.
*   **Purpose**: Team Leads and Department Heads.

**Capabilities:**
*   **Company**: Read-only access.
*   **Department**: Can edit their own department's name/description; cannot create or delete departments.
*   **Employees**: Can view all employees in their department and edit basic info for direct reports.

---

### 👤 EMPLOYEE (Regular Employee)
*   **Scope**: Personal Profile.
*   **Purpose**: Basic system user.

**Capabilities:**
*   **Profile**: Full access to manage their own avatar, password, and contact info.
*   **Colleagues**: Can view basic directory info (name, department, position, work phone).
