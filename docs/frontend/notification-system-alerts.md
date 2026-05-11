# Notification System & User Alerts

## 1. Business Goal
The Notification System ensures timely communication between the platform and its users. It is responsible for delivering critical updates (e.g., task status changes, leave approvals, company news), managing the notification queue, and providing users with granular control over how and where they receive alerts.

---

## 2. Functional Blocks (User Flows)

### Notification Center
*   **Inbox:** A centralized list of all received notifications with support for pagination to handle high volumes of alerts.
*   **Archiving/Deletion:** Ability to remove specific notifications from the list to keep the inbox organized.

### Read State Management
*   **Individual Read:** Users can mark specific notifications as "Read" upon interaction.
*   **Bulk Action:** A "Mark All as Read" feature to quickly clear the unread backlog.

### Real-time Indicators (Badges)
*   **Visual Cues:** A dynamic badge (e.g., a red dot or number on a bell icon) that indicates the current count of unread notifications.
*   **Immediate Feedback:** The counter must decrement immediately when a notification is marked as read.

### Notification Preferences (Settings)
*   **Channel Mapping:** A configuration matrix allowing users to toggle specific delivery channels (Email, Push, In-app) for different event categories.
*   **Granularity:** Control over which types of events trigger alerts (e.g., "Only notify me of high-priority task changes").

---

## 3. Technical Requirements (Logic)

### State Synchronization
*   **Counter Logic:** The frontend must maintain a synchronized unread count. Actions like `markAsRead` or `readAll` should trigger a local state update or an immediate refetch of the unread count from the API.

### Delivery Strategy (Real-time)
*   **Mechanism:** To ensure a "live" feel, the system should implement a strategy for receiving new alerts without a page refresh:
    *   **WebSockets/SSE:** Preferred for instant delivery.
    *   **Short/Long Polling:** Fallback mechanism if persistent connections are not available.

### Content Typing & Parsing
*   **Templates:** The frontend must handle different notification types, parsing metadata to render:
    *   Clickable links to entities (e.g., clicking a task notification opens the task).
    *   Sender avatars and names for social context.
    *   Rich text or localized message strings.

### Preferences Persistence
*   **Update Logic:** Support for both atomic (one toggle at a time) and batch (saving all changes at once) updates to the user's notification settings.

---

## 4. API Endpoints (Contract)

### GET `/api/notifications`
*   **Params:** `page`, `limit`.
*   **Response:** Paginated list of notifications.

### GET `/api/notifications/unread-count`
*   **Response:** `{ "count": number }`

### PATCH `/api/notifications/{id}/read`
*   **Action:** Marks a single notification as read.

### PATCH `/api/notifications/read-all`
*   **Action:** Marks all unread notifications for the current user as read.

### DELETE `/api/notifications/{id}`
*   **Action:** Permanently removes a notification from the user's list.

### Settings Endpoints
*   **GET `/api/notifications/settings`:** Retrieves the current notification rules and channel preferences.
*   **PATCH `/api/notifications/settings`:** Updates the user's notification configuration.

---

## 5. UI States

### Interactive Feed
*   **Visual Distinction:** Use background shading or markers (e.g., a blue dot) to differentiate between Read and Unread states.
*   **Empty States:** Clear messaging when the inbox is empty (e.g., "You're all caught up!").

### Toast Notifications (In-app Alerts)
*   **Pop-ups:** Temporary, non-intrusive overlays for critical events that appear while the user is active in the system.

### Configuration Matrix
*   **Settings UI:** A clear grid or list of switches/checkboxes organized by category and channel for easy management of notification preferences.
