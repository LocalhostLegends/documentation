# Manager View & Team Oversight

## 1. Business Goal
The Manager View module is designed to provide line managers with the tools and data they need to effectively lead their teams. It offers a consolidated view of team performance, attendance, and professional development, enabling data-driven decision-making and proactive management.

---

## 2. Functional Blocks (User Flows)

### Team Dashboard
*   **Overview:** A high-level summary of the manager's direct reports and their current status.
*   **Key Metrics:** Quick access to team-wide statistics such as headcount, upcoming leave, and performance indicators.

### Team Directory
*   **View:** A specialized list of all direct and indirect reports.
*   **Details:** Quick access to team member profiles, focusing on professional data and reporting lines.

---

## 3. Technical Requirements (Logic)

### Managerial Scope
*   The UI must ensure that managers can only access data for employees within their reporting line (direct and nested subordinates).
*   Data fetching should respect the `managerId` or similar context provided by the backend.

---

## 4. API Endpoints (Contract)

### GET `/api/manager/stats`
*   Summary data for the manager dashboard (e.g., team size, pending approvals, upcoming team milestones).

### GET `/api/companies/stats`
*   Global company statistics for context and comparison.

---

## 5. UI States

### Dashboard Widgets
*   Interactive cards showing "At a Glance" information for the manager's team.

### Team List
*   Searchable and filterable list of team members with quick actions for common managerial tasks.
