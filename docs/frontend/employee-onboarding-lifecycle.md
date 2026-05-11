# Employee Onboarding & Lifecycle Adaptation

## 1. Business Goal
The Onboarding module automates and structures the process of integrating new hires into the organization. It enables the creation of standardized adaptation templates, converts them into personalized plans (instances), and monitors the completion of each step to ensure a smooth transition into the corporate culture and work processes.

---

## 2. Functional Blocks (User Flows)

### Onboarding Templates Creator
*   **Standardization:** Ability to create reusable onboarding plans tailored for specific roles, seniority levels, or departments.
*   **Cloning:** Option to duplicate existing templates to quickly create variations.

### Step Management
*   **Definition:** Each template consists of multiple steps with defined `ONBOARDING_STEP_TYPE` (e.g., Task, Meeting, Document, Training).
*   **Assignments:** Steps are assigned to specific `assigneeRole` (e.g., HR, Manager, or the Employee themselves).
*   **Duration:** Logic for setting the expected duration of each step (`durationDays`).

### Process Initiation (Start Onboarding)
*   **Activation:** Launching a personal onboarding plan for an existing user based on a selected template.
*   **Dynamic Deadlines:** Automatic calculation of step deadlines based on the process start date and defined durations.

### Transformation (Hire to Onboard)
*   **Recruitment Integration:** A specialized workflow that converts a successful candidate into a full employee while simultaneously initiating their onboarding process.
*   **Data Carry-over:** Automatically populating the employee profile with data from their candidate record during the transition.

### Instance Tracking & Monitoring
*   **Visibility:** A dashboard for HR and Managers to track the progress of all active onboarding processes across the company.
*   **Audit Trail:** Monitoring which steps have been completed and identifying bottlenecks.

---

## 3. Technical Requirements (Logic)

### Inheritance & Decoupling Logic
*   **Snapshotting:** When a process is started (`startOnboarding`), the system must create a snapshot of the template steps into a new instance.
*   **Independence:** Changes to the original template should not affect already active instances, ensuring plan stability for the employee.

### Role-Based Assignment
*   **Dynamic Resolution:** The system must resolve the actual user for a step based on the `assigneeRole`.
    *   *Example:* If a step is assigned to "Manager," the system identifies the specific manager linked to the employee's profile.

### Structural Validation
*   **Integrity:** Use nested Zod schemas to ensure that templates contain valid steps, unique orders, and consistent role assignments.

### Time Management
*   **Deadline Calculation:** Every instance step should have a calculated `targetDate` derived from: `ProcessStartDate + StepDurationDays`.

---

## 4. API Endpoints (Contract)

### Templates
*   **GET `/api/onboarding/templates`**: List all available onboarding templates.
*   **POST `/api/onboarding/templates`**: Create a new template with a nested list of steps.
*   **PATCH `/api/onboarding/templates/{id}`**: Update the template structure or step definitions.
*   **DELETE `/api/onboarding/templates/{id}`**: Remove a template.

### Instances (Active Processes)
*   **GET `/api/onboarding/instances`**: List all active and completed onboarding processes.
*   **GET `/api/onboarding/instances/{id}`**: Detailed status of a specific employee's progress.
*   **POST `/api/onboarding/start`**: Initiate onboarding for an existing employee.
*   **POST `/api/onboarding/hire`**: Complete the hire from the Recruitment module and trigger the onboarding plan.

---

## 5. UI States

### Visual Template Constructor
*   **Ordering:** Drag-and-drop or index-based interface for organizing the sequence of onboarding steps.
*   **Step Editors:** Modal or inline forms for defining activity types and durations.

### Progress Visualization
*   **Completion Rate:** Circular or linear progress bars showing the percentage of steps completed within a plan.
*   **Status Indicators:** Visual markers for `Pending`, `In Progress`, `Completed`, and `Overdue` steps.

### Role-Specific Task Views
*   **Contextual Lists:** Separate views for HR, Managers, and Employees, highlighting only the steps they are responsible for.

### Step Detail Cards
*   **Information Hub:** Expanded views for steps containing instructions, links to internal resources, or document upload requirements.
