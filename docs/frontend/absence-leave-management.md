# Absence & Leave Management

## 1. Business Goal
The Absence & Leave Management module is designed to automate the lifecycle of employee time-off requests. It ensures accurate tracking of leave balances, provides a structured approval workflow for managers, and maintains a transparent audit trail for all changes to ensure compliance and operational efficiency.

---

## 2. Functional Blocks (User Flows)

### Leave Types Configuration
*   **Categorization:** Definition of various absence categories such as Annual Leave, Sick Leave, Unpaid Leave, and Study Leave.
*   **Policy Rules:** Specific rules for each type, including accrual rates and maximum carry-over limits.

### Balance Control & Adjustments
*   **Self-Service View:** Employees can view their real-time available balances for each leave type.
*   **HR Oversight:** Capability for HR administrators to manually adjust balances (`adjustBalance`) to account for special circumstances or policy overrides.

### Leave Request Lifecycle
*   **Drafting:** Employees can create and save leave requests as drafts before formal submission.
*   **Submission:** Formalizing a request (`submitRequest`) to trigger the manager's approval workflow.
*   **Approval Workflow:** Managers can `Approve` or `Reject` requests, providing necessary comments for context.
*   **Cancellation:** Ability for employees to cancel their own requests before they are finalized or taken.

### Audit & Logging
*   **History Tracking:** A detailed chronological log (`Audit Log`) for every request, showing who initiated actions, when they occurred, and any comments left during the process.

### Absence Calendar
*   **Visualization:** A shared or team-specific calendar view displaying approved and pending absences to help with resource planning and team coordination.

---

## 3. Technical Requirements (Logic)

### Pre-submission Validation
*   **Balance Check:** Logic to verify if the employee has sufficient balance for the requested duration before allowing submission.
*   **Collision Detection:** Prevention of overlapping leave requests for the same employee to ensure data integrity.

### Status Transition Model
*   **Integrity:** Strict enforcement of valid state transitions:
    *   `Draft` → `Pending`
    *   `Pending` → `Approved` | `Rejected` | `Cancelled`

### Access Control & Scoping
*   **Employee Scope:** Access limited to their own requests and balances.
*   **Manager Scope:** Access to requests from their direct reports.
*   **HR Scope:** Full global access to all requests, balance adjustments, and type configurations.

### Work Day Calculation
*   **Logic:** Frontend and backend implementation of algorithms to calculate the net working days between `startDate` and `endDate`, excluding weekends and public holidays.

---

## 4. API Endpoints (Contract)

### Leave Requests
*   **GET `/api/leave/requests`**: Global list of requests (with filters for status and `employeeId`).
*   **GET `/api/leave/requests/me`**: Retrieves the current user's request history.
*   **POST `/api/leave/requests`**: Creates a new request record (initially in `Draft` status).
*   **POST `/api/leave/requests/{id}/submit`**: Submits a draft request for approval.
*   **POST `/api/leave/requests/{id}/approve`**: Manager action to approve a request.
*   **POST `/api/leave/requests/{id}/reject`**: Manager action to deny a request.
*   **POST `/api/leave/requests/{id}/cancel`**: User action to withdraw a request.

### Leave Balances
*   **GET `/api/leave/balances/me`**: Current user's available leave days.
*   **GET `/api/leave/employees/{id}/balances`**: Admin view of a specific employee's balances.
*   **POST `/api/leave/balances/adjust`**: Endpoint for HR to perform manual balance corrections.

### Settings & Audit
*   **GET `/api/leave/types`**: List of all configured absence types.
*   **GET `/api/leave/requests/{id}/audit`**: Retrieves the full activity history for a specific request.

---

## 5. UI States

### Balance Overview Widgets
*   **Visual Cards:** High-level summary of remaining days per category (e.g., "15 days of Annual Leave left").

### Dynamic Request Form
*   **Real-time Feedback:** As the user selects dates, the form should immediately display the "Total Days" calculation.

### Approval Timeline
*   **Visual Log:** A vertical or horizontal timeline showing the sequence of actions: Submission -> Manager Review -> Final Decision.

### Status Color Coding
*   **Standardization:** Use consistent coloring: `Yellow` (Pending), `Green` (Approved), `Red` (Rejected), `Grey` (Cancelled/Draft).
