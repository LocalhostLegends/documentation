# Custom Fields Engine (Dynamic Entity Extension)

## 1. Business Goal
The Custom Fields Engine allows administrators to extend standard system entities (Employees, Jobs, Departments) without altering the source code. This enables the platform to adapt to unique business requirements, capturing specialized attributes like "Uniform Size," "Parking Spot ID," or "Security Clearance Level."

---

## 2. Functional Blocks (User Flows)

### Definitions Constructor
*   **Metadata Management:** Admins can define new fields per `entityType`.
*   **Attributes:** Each definition specifies a unique `key`, a display `label`, a `dataType`, and a mandatory flag (`isRequired`).

### Data Storage & Association
*   **Dictionary Model:** Custom field values are stored as a Key-Value dictionary (`customFields`) attached to the core entity.
*   **Persistence:** The `key` from the definition serves as the unique identifier for the value in the database.

### Dynamic Form Rendering
*   **Automated UI:** The system automatically parses the list of field definitions and injects the appropriate input components into entity forms (e.g., Recruitment or Employee cards).

---

## 3. Technical Requirements (Logic)

### Supported Data Types (CustomFieldType)
*   **`string`**: Standard text input.
*   **`number`**: Numeric values with validation.
*   **`date`**: Calendar date picker.
*   **`boolean`**: Toggle or checkbox.
*   **`enum`**: Dropdown selection based on a predefined list of `options`.
*   **`entity_ref`**: A reference (UUID) to another system entity (e.g., linking a field to a specific Department).

### Contract Structure (CustomFieldDefinition)
Every field definition must adhere to a standardized schema:
*   `id`: Unique identifier for the definition.
*   `key`: The programmatic key used in the data object.
*   `label`: The user-facing name.
*   `type`: One of the supported `CustomFieldType` values.
*   `isRequired`: Boolean flag for form validation.

### Form Integration (Mixing Logic)
*   **Data Merging:** When loading an entity, the UI must merge the core fields (e.g., `firstName`) with the dynamic `customFields` object.
*   **Validation:** The form validation logic must dynamically incorporate the `isRequired` rules from the field definitions at runtime.

---

## 4. API Contracts

### GET `/api/custom-fields/definitions?entityType=...`
*   Retrieves the list of active custom field definitions for a specific entity (e.g., `USER` or `JOB`).

### POST `/api/custom-fields/definitions`
*   Creates a new custom field definition.

### PUT `/api/custom-fields/definitions/{id}`
*   Modifies the metadata of an existing definition (e.g., changing the label or options).

### DELETE `/api/custom-fields/definitions/{id}`
*   Removes the field definition. *Note: This action typically cascades to clear the associated data from all entities.*

---
