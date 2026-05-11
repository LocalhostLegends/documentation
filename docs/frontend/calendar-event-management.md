# Company Calendar & Event Management

## 1. Business Goal
The Company Calendar module is designed to organize working time and facilitate joint activities. It allows users to plan meetings, company events, and personal tasks within a calendar grid, manage participant lists, and track their attendance statuses to ensure efficient collaboration across the organization.

---

## 2. Functional Blocks (User Flows)

### Calendar Views (Grid)
*   **Perspective:** Display events in multiple formats, including Month, Week, Day, and Agenda (list) views.
*   **Navigation:** Ability to jump between dates and return to the "Today" view.

### Event Lifecycle Management
*   **Creation/Editing:** Users can create new events by specifying titles, descriptions, and types (Meeting, Holiday, Birthday, etc.).
*   **Event Types:** Categorization of events using predefined types to allow for better filtering and visual distinction.
*   **Deletion:** Authorized users can remove events, triggering notifications to invited participants.

### Participation & Attendance
*   **Invitations:** Adding colleagues to an event as participants.
*   **Response Workflow:** Each invitee can respond with a status: `Accepted`, `Declined`, or `Tentative`.
*   **Tracking:** The organizer can see a real-time summary of who has responded and their respective statuses.

### Time & Interval Logic
*   **Scheduling:** Precise selection of Start/End dates and times.
*   **Constraint Control:** Logic to prevent invalid states, such as an event ending before it starts or overlapping with restricted global holidays.

---

## 3. Technical Requirements (Logic)

### Date-Range Filtering (Viewport Optimization)
*   **Efficiency:** To minimize data transfer, the frontend should only fetch events for the currently visible range (e.g., the current month plus a buffer for the previous/next month's overlapping days).
*   **Refetching:** Automatically trigger a fetch when the user navigates to a new date range.

### Validation Schema
*   **Data Integrity:** Use strict validation (e.g., Zod) for event forms. Required fields include Title, Event Type, Start Date/Time, and End Date/Time.
*   **Form Logic:** Separation of Date (`startDate`) and Time (`startClock`) in the UI to facilitate easier selection, while combining them for API transmission.

### Timezone Handling
*   **Standardization:** All date-time data must be transmitted in **ISO 8601** format.
*   **Display:** Ensure that users in different timezones see the event at the correct local time relative to the UTC timestamp.

### Reactive Status Updates
*   **Interactivity:** When a user responds to an invitation, the UI should update the `ParticipantStatusType` locally or refetch the specific event data without forcing a full calendar reload.

---

## 4. API Endpoints (Contract)

### GET `/api/calendar/events`
*   **Params:** `startDate`, `endDate`.
*   **Response:** A list of events falling within the specified period.

### POST `/api/calendar/events`
*   **Payload:** `CreateCalendarEventDto` (Title, Description, Type, Start/End DateTime, Participants).
*   **Success Response (201):** The newly created event object.

### PATCH `/api/calendar/events/{id}`
*   **Payload:** Partial event data for updates.

### DELETE `/api/calendar/events/{id}`
*   **Action:** Removes the event and notifies participants.

### POST `/api/calendar/events/{id}/respond`
*   **Payload:** `{ "status": ParticipantStatusType }` (e.g., `ACCEPTED`, `DECLINED`).

---

## 5. UI States

### Visual Categorization
*   **Color Coding:** Use distinct colors or icons based on the `CALENDAR_EVENT_TYPE` (e.g., blue for Meetings, green for Holidays).

### Event Detail Modals
*   **Quick View:** Clicking an event opens a modal or side drawer with full details, descriptions, and the list of invited colleagues with their status indicators.

### Participation Indicators
*   **Status Icons:** Visual markers next to participant names (e.g., checkmark for Accepted, cross for Declined).

### Drag-and-Drop (UX Recommendation)
*   **Flexibility:** Allow users to reschedule events by dragging them across the calendar grid, triggering a `PATCH` request with the updated date/time.
