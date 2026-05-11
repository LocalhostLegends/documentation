# System Administration & Organization Setup

## 1. Business Goal
This module serves as the foundation of the platform. it manages the global configuration, organizational hierarchy (departments and positions), and allows for the extension of core entities via custom fields. It defines how data is grouped, secured, and displayed for all users across the system.

---

## 2. Functional Blocks (User Flows)

### Structure Management (Departments & Positions)
*   **Departments:** CRUD operations for business units. Supports hierarchical logic to represent the reporting lines and organizational tree.
*   **Positions:** Management of job titles and staffing positions. Includes logic for linking positions to specific departments and seniority levels (grades).

### User Management
*   **Access Control:** Administrators can invite users, modify account statuses (Active/Suspended/Deactivated), and assign global system roles.
*   **Security:** Centralized view of user activity and permission assignments.

### General Settings
*   **Organization Profile:** Management of company name, branding (logo/favicon), and contact details.
*   **Regional Settings:** Configuration of default timezone, currency, and primary language for the entire organization.

### Custom Fields Constructor
*   **Extensibility:** A mechanism to add supplementary attributes (e.g., "T-shirt size", "Parking Spot #") to core entities like Employees or Vacancies without backend code changes.
*   **Data Types:** Support for text, numbers, booleans, and single/multi-select dropdowns.

---

## 3. Technical Requirements (Logic)

### Dynamic Forms Rendering
*   The frontend must be able to parse a JSON schema of custom fields provided by the API.
*   Forms should dynamically inject these fields, handling validation and state management based on the schema definition.

### Dictionary Caching
*   **Strategy:** Data such as departments and positions are "static-heavy" (rarely change but frequently used).
*   **Implementation:** Store these dictionaries in a global state (e.g., Redux, Vuex, or Context) with a "stale-while-revalidate" approach or manual invalidation upon admin updates.

### Optimistic UI
*   To ensure a highly responsive experience, the UI should optimistically update lists and hierarchies when an administrator makes changes, rolling back only in the rare event of a server error.

---

## 4. API Endpoints (Contract)

### GET `/api/companies/stats`
*   Summary data for the admin dashboard (e.g., active user count, organizational structure completion).

### CRUD `/api/departments`
*   Standard operations for managing the department hierarchy. Use `GET`, `POST`, `PUT`, `DELETE` for `/api/departments/{id}`.

### CRUD `/api/positions`
*   Standard operations for managing the dictionary of positions. Use `GET`, `POST`, `PUT`, `DELETE` for `/api/positions/{id}`.

### CRUD `/api/users`
*   Operations for managing system users and their access levels. Use `GET`, `POST`, `PUT`, `DELETE` for `/api/users/{id}`.

### GET/PATCH `/api/companies/settings`
*   Retrieval and update of global organization configurations.

### GET `/api/custom-fields/definitions?entityType=...`
*   Retrieval of custom field definitions for a specific entity type (e.g., `USER`).

### CRUD `/api/custom-fields/definitions`
*   Management of the configuration and metadata for user-defined fields. Use `PUT` for updates at `/api/custom-fields/definitions/{id}`.

---

## 5. UI States

### Empty States
*   Provide helpful guidance and "Create First" actions for new organizations with no data.

### Hierarchy Visualization
*   Support for both tree-view (for nested departments) and flat-list views (for quick searching).

### Dependent Validation
*   Implement safeguards, such as preventing the deletion of a department if it still contains active employees or sub-departments.
