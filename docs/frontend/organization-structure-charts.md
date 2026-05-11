# Organization Structure & Charts

## 1. Business Goal
The Organization Structure & Charts module provides transparency and clarity regarding the company's hierarchy. It enables users to understand reporting lines, explore departments, view team compositions, and visualize the overall organizational architecture to facilitate effective communication and navigation.

---

## 2. Functional Blocks (User Flows)

### Interactive Org Chart
*   **Visualization:** A dynamic, tree-like representation of the company hierarchy.
*   **Interaction:** Users can expand or collapse branches to navigate from C-level executives down to individual contributors.
*   **Navigation:** Clickable nodes that allow users to jump to specific employee profiles or department details.

### Department Directory
*   **Overview:** A comprehensive list of all business units within the organization.
*   **Summary Info:** Each entry displays the department head, total headcount, and a brief description of the unit's function.

### Department Detail View
*   **Team Composition:** A full list of employees belonging to the department.
*   **Open Roles:** Integration with the Recruitment module to show active vacancies within the specific unit.
*   **Sub-units:** List of nested or child departments belonging to the current node.

### Locations & Offices
*   **Geographic Context:** Information regarding physical offices, remote hubs, or regional branches.
*   **Mapping:** Associating employees and departments with specific geographical locations.

### Structure Search
*   **Discovery:** A global search mechanism to quickly locate specific teams, functional blocks, or departments by name or keyword.

---

## 3. Technical Requirements (Logic)

### Tree Data Transformation
*   **Logic:** Implementation of algorithms to transform flat lists of departments/employees (received from the API) into a nested Tree Data Structure suitable for hierarchical rendering.
*   **Parent-Child Mapping:** Resolving `parentId` references to build the correct recursive model.

### Visualization Performance
*   **Scalability:** For large organizations (thousands of nodes), implement strategies such as:
    *   **Lazy Loading:** Fetching child nodes only when a branch is expanded.
    *   **Virtualization:** Rendering only the nodes currently visible within the viewport.
*   **Resource Management:** Efficiently handling DOM nodes or Canvas elements to maintain a high frame rate during navigation.

### Viewport Management (Zoom & Pan)
*   **Camera Logic:** Support for smooth zooming (in/out) and drag-and-drop panning to navigate large diagrams.
*   **Auto-Centering:** Logic to automatically center the view on a searched node or the root of a selected branch.

### State Persistence
*   **Branch States:** Retaining the expanded/collapsed state of nodes during the user's session to provide a consistent navigation experience.

---

## 4. API Endpoints (Contract)

### GET `/api/departments/tree`
*   Retrieves the hierarchical structure. Supports query parameters for depth (e.g., `?depth=2`) or starting node (`?rootId=uuid`).

### GET `/api/departments/{id}`
*   Returns detailed metadata about a specific department.

### GET `/api/departments/{id}/members`
*   Returns a list of employees associated with the department. Optional flag to include members of sub-departments.

### GET `/api/companies/stats`
*   Aggregated statistics (total departments, average team size, hierarchy depth).

---

## 5. UI States

### Node Interaction
*   **Feedback:** Hover states and active selections to provide visual cues.
*   **Quick Info:** Tooltips or side-drawers for viewing brief details without leaving the chart.

### Empty & Orphan States
*   **Empty Departments:** Clear indicators when a unit has no assigned members yet.
*   **Orphans:** Graceful handling of nodes that lack a valid parent (e.g., displaying them at a "top-level" or under a "Unassigned" bucket).

### Responsiveness & Adaptability
*   **Mobile Experience:** On smaller screens, the system should automatically transition from a complex graphical tree to a simplified list or accordion-based view.
*   **Layout Switching:** Allow users to toggle between a "Chart View" and a "List View" based on their preference or screen size.
