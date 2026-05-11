# Recruitment & Applicant Tracking System (ATS)

## 1. Business Goal
The Recruitment & ATS module is designed to automate and streamline the hiring process. It enables the organization to manage job vacancies, build a comprehensive candidate pool, and track the progress of applicants through a customizable hiring pipeline, ensuring transparency and efficiency in talent acquisition.

---

## 2. Functional Blocks (User Flows)

### Job Management
*   **Vacancy Lifecycle:** Creation and editing of job postings, including titles, descriptions, requirements, and benefits.
*   **Classification:** Setting job attributes such as `JobType` (Full-time, Part-time, Contract) and `JobStatus` (Draft, Open, Closed).
*   **Organization Context:** Linking vacancies to specific departments to track hiring needs per business unit.

### Candidate Pool
*   **Talent Database:** A central repository for storing candidate profiles, contact information, and resumes.
*   **Search & Discovery:** Ability to browse and search the candidate database independently of specific job applications.

### Application Pipeline
*   **Hiring Funnel:** Managing the link between a candidate and a specific job through the `Application` entity.
*   **Stage Transitions:** Moving applicants through various hiring phases (e.g., Screening, Technical Interview, Cultural Fit, Offer).
*   **History:** Tracking the progression and time-to-hire metrics for each application.

### Custom Fields Integration
*   **Extensibility:** Support for `customFields` within job postings to capture industry-specific or role-specific data points without altering the core database schema.

---

## 3. Technical Requirements (Logic)

### Pipeline & Stage Management
*   **Workflow Logic:** Implementation of the `updateApplicationStage` mechanism to handle transitions between recruitment steps.
*   **History Logging:** Automatically recording timestamped logs of every stage change for audit and analytical purposes.

### Data Validation & Integrity
*   **Schema Enforcement:** Using Zod schemas to validate candidate data (e.g., email formats, mandatory fields) and job parameters.
*   **Constraint Checking:** Ensuring that an application cannot be created for a "Closed" job or with a "Deactivated" candidate.

### Enum & Type Strictness
*   **Consistency:** Rigorous usage of `JobStatus` and `JobType` enums for UI filtering and backend processing to prevent data corruption and ensure reliable reporting.

### Entity Relationships
*   **Logic:** The system must handle the many-to-many relationship between candidates and jobs, facilitated by the `Application` join entity, ensuring data integrity when candidates are removed or jobs are closed.

---

## 4. API Endpoints (Contract)

### Jobs (Vacancies)
*   **GET `/api/jobs`**: Retrieves a filterable list of all vacancies.
*   **POST `/api/jobs`**: Creates a new vacancy based on `JobFormValues`.
*   **PATCH `/api/jobs/{id}`**: Updates vacancy details and status.
*   **DELETE `/api/jobs/{id}`**: Removes or archives a vacancy.

### Candidates
*   **GET `/api/candidates`**: Retrieves the global pool of job seekers.
*   **POST `/api/candidates`**: Adds a new candidate profile to the database.
*   **PATCH `/api/candidates/{id}`**: Updates candidate contact or profile data.

### Applications (Hiring Process)
*   **POST `/api/applications`**: Initiates a new application (links a candidate to a job).
*   **GET `/api/applications/by-job/{jobId}`**: Retrieves all applicants currently in the funnel for a specific vacancy.
*   **PATCH `/api/applications/{id}/stage`**: Updates the recruitment stage for a specific application.

---

## 5. UI States

### Recruitment Kanban
*   **Visualization:** A dedicated board for each job vacancy where candidates are displayed as cards moving between vertical columns representing pipeline stages.

### Status Indicators
*   **Visual Cues:** Distinct styling (badges/colors) for `Open`, `Closed`, and `Draft` job statuses to allow for quick scanning of the recruitment board.

### Dynamic Job Forms
*   **Rich Text Support:** Integration of Markdown or WYSIWYG editors for vacancy descriptions (Requirements, Responsibilities, Benefits).
*   **Custom Field Injector:** Dynamically rendering additional inputs based on the custom field definitions.

### Filtered Lists & Search
*   **Advanced Searching:** High-performance search for candidates and the ability to filter vacancies by department, location, or hiring manager.
