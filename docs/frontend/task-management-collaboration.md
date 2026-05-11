# Task Management & Collaboration

## 1. Business Goal
The Task Management & Collaboration module is designed to streamline organizational workflows. It enables users to create and assign tasks, track progress through various stages (Pipeline), manage deadlines, and foster team collaboration through integrated commenting and file sharing.

---

## 2. Functional Blocks (User Flows)

### Task Pipeline (Kanban/Flow)
*   **Stages:** Visualization of tasks grouped by their current state (`TASK_STAGE`).
*   **Transition:** Logic for moving tasks between stages (e.g., from "To Do" to "In Progress" or "Done").
*   **Ordering:** Ability to reorder tasks within a single stage to define execution priority.

### Task Lifecycle Management
*   **Creation & Editing:** Comprehensive forms for setting task titles, detailed descriptions, and defining core attributes.
*   **Prioritization:** Assigning importance levels (`TASK_PRIORITY`) to guide team focus.
*   **Deadlines:** Setting and tracking due dates (`dueDate`) to ensure timely completion.

### Collaboration & Communication
*   **Comment System:** In-task messaging allowing users to add, edit, and remove comments to discuss specific task details.
*   **Mentions:** (Optional recommendation) Ability to notify specific users within comments.

### Attachments & References
*   **Files:** Support for uploading documents and images directly to a task for context.
*   **External Links:** Ability to associate external URLs (`References`) relevant to the task's completion.

### Activity Feed (Audit Log)
*   **History:** A chronological log of all changes made to a task, including status updates, assignee changes, and comment additions, providing full transparency of the task's evolution.

---

## 3. Technical Requirements (Logic)

### Kanban & Movement Logic
*   **Stage Change:** When moving a task (`moveTask`), the system must update both the `stage` and the `order` within that stage.
*   **Optimistic Updates:** The UI should move the task card immediately upon drag-and-drop, rolling back only if the API request fails, to ensure a fluid user experience.

### Advanced Filtering & Search
*   **Query Builder:** Ability to filter the global or project-specific task list by:
    *   `assigneeId` (Responsible person).
    *   `creatorId` (Task author).
    *   `departmentId` (Associated team).
    *   `priority` and `stage`.
*   **Search:** Full-text search across task titles and descriptions.

### Data Validation
*   **Schema Enforcement:** Use strict Zod schemas for all task-related forms. Mandatory fields include Title, Stage, and optionally a Due Date if specific policy requires it.

### File Handling
*   **Uploads:** Implementation of `multipart/form-data` handling for task attachments.
*   **Management:** Secure deletion and retrieval of files associated with a specific task ID.

---

## 4. API Endpoints (Contract)

### GET `/api/tasks`
*   Returns a paginated list of tasks. Supports query parameters for all filters mentioned above.

### POST `/api/tasks`
*   Creates a new task. Requires title, stage, and priority.

### PATCH `/api/tasks/{id}`
*   Updates task metadata (description, priority, assignee, etc.).

### PATCH `/api/tasks/{id}/stage`
*   **Payload:** `{ "stage": TASK_STAGE, "order": number }`
*   Specialized endpoint for moving tasks within the pipeline.

### GET `/api/tasks/{id}/activity`
*   Retrieves the full history of changes (Activity Feed) for a specific task.

### Comments Workflow
*   **POST/PATCH/DELETE** `/api/tasks/{taskId}/comments`: Management of discussion threads.

### Attachments Workflow
*   **POST** `/api/tasks/{taskId}/attachments`: Uploading files (FormData).
*   **DELETE** `/api/tasks/{taskId}/attachments/{attachmentId}`: Removing files.

---

## 5. UI States

### Priority Visualization
*   **Color Coding:** High (Red), Medium (Orange/Yellow), Low (Blue/Grey) badges or markers to signal urgency.

### Stage Statistics
*   **Counters:** Display the total number of tasks and their combined "weight" at the top of each Kanban column.

### Overdue Indicators
*   **Alerting:** Visually highlighting tasks where the `dueDate` has passed or is approaching within 24 hours.

### Quick Add Functionality
*   **Efficiency:** A "Quick Task" input at the bottom or top of each column allowing for rapid entry without opening the full edit modal.
