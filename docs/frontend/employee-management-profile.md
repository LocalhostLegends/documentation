# Employee Management & Profile

## 1. Business Goal
The Employee Management module provides a comprehensive "360-degree view" of every individual within the organization. It facilitates the management of personal data, official documents, career progression, and professional development. The module supports two primary contexts: a "Personal Profile" (Employee Self-Service) and an "Employee Card" (Admin/HR/Manager view).

---

## 2. Functional Blocks (User Flows)

### Digital Profile (360-degree View)
*   **Overview:** Display of core employee details including personal information, contact details, emergency contacts, current role, and department.
*   **Contextual Views:** Information is filtered based on the viewer's role (e.g., an employee sees their own sensitive data, while a manager sees performance-related metrics).

### Data Management & Editing
*   **Self-Service:** Employees can request updates to their personal data (e.g., change of address or marital status).
*   **Approval Workflow:** Critical changes may require HR or Manager approval before being finalized in the system.
*   **Validation:** Strict client-side validation for phone formats, emails, and mandatory fields.

### Career History (Timeline)
*   **Progression:** A chronological log of changes in positions, departments, salary grades, and employment types (e.g., transition from "Probation" to "Full-time").
*   **Promotion Logic:** Captures effective dates for each change to maintain historical accuracy.

### Document Management
*   **Secure Vault:** A dedicated section for uploading and storing employment contracts, IDs, tax documents, and professional certifications.
*   **Access Control:** Strict permissions ensuring only authorized personnel and the employee can access private documents.

### Team & Org Chart Context
*   **Reporting Lines:** Visualization of the employee's direct manager and any direct subordinates.
*   **Navigation:** Ability to navigate to the profiles of team members within the hierarchy.

### Skill Matrix & Competencies
*   **Professional Growth:** A directory of technical and soft skills assigned to the employee, with proficiency levels (e.g., Junior, Mid, Senior).

---

## 3. Technical Requirements (Logic)

### Field-Level Permissions
*   Implement a logic layer that determines field visibility and editability based on the user's role and the target employee's ID.
    *   *Example:* "Basic Salary" is hidden from everyone except HR and the employee's direct manager (if allowed by policy).

### File Handling
*   **Secure Uploads:** Multi-part upload support with file type and size restrictions.
*   **Preview & Secure Download:** Logic for generating temporary secure URLs or handling binary streams for private document viewing to prevent unauthorized link sharing.

### Draft & Approval Logic
*   When an employee edits protected fields, the system should store a "Draft" or "Pending Change" state instead of overwriting the active record.
*   The UI must clearly indicate fields that are "Awaiting Approval."

### Integration with Custom Fields
*   The profile must dynamically fetch and render custom fields defined in the **System Administration** module.
*   Custom fields should be treated as part of the core data model during GET and PATCH operations.

---

## 4. API Endpoints (Contract)

### GET `/api/users/{id}`
*   Returns the full employee profile, including aggregated data from career history, current position, and custom fields.

### PATCH `/api/users/{id}`
*   Updates specific segments of the profile. Supports partial updates (e.g., updating only contact information).

### POST `/api/users/{id}/block`
*   Suspends the user's access to the system.

### POST `/api/users/{id}/unblock`
*   Restores the user's access to the system.

### GET `/api/users/{id}/history`
*   Returns the chronological list of career transitions and role changes.

### POST/DELETE `/api/users/{id}/documents`
*   Endpoints for uploading new documents and removing existing ones.

### GET `/api/users/{id}/org-structure`
*   Returns data regarding direct managers and subordinates for hierarchy visualization.

---

## 5. UI States

### Read vs. Edit Modes
*   Distinct visual states for viewing data and modifying it. Inline editing or modal-based forms depending on the data complexity.

### Status Indicators
*   Visual badges for employee status: `Active`, `On Leave`, `Sick Leave`, `On Probation`, `Terminated`.

### Profile Completion Progress
*   Gamification/UX element: "Your profile is 70% complete. Add your emergency contact to reach 100%."

### Critical Action Modals
*   Multi-step confirmation dialogs for high-impact actions like "Terminate Employment" or "Change Reporting Manager."
