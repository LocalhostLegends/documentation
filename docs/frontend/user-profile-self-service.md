# User Profile & Self-Service

## 1. Business Goal
The User Profile & Self-Service module empowers individual users to manage their digital identity within the organization. It serves as the primary gateway for updating personal information, managing account security, and customizing the system interface to meet individual preferences.

---

## 2. Functional Blocks (User Flows)

### My Info (Self-Management)
*   **Overview:** View and edit personal data such as contact numbers, residential address, and profile biography.
*   **Permission Logic:** Distinction between fields the user can edit directly (e.g., "About Me") and fields requiring HR intervention or approval (e.g., "Legal Name").

### Security & Access
*   **Authentication:** Password management, including secure change workflows.
*   **Session Management:** Ability to view and revoke active sessions/devices to ensure account integrity.
*   **Multi-Factor Authentication (MFA):** Setup and management of additional security layers (if applicable).

### Individual Preferences
*   **Localization:** On-the-fly switching of interface language, timezone, and date formats.
*   **Theming:** Toggle between Light, Dark, or System themes.
*   **Persistence:** Preferences are saved to the user's account to ensure a consistent experience across different devices.

### Notification Settings
*   **Channel Management:** Granular control over Email, Push, and In-app notifications for various event types (e.g., task assignments, mentions, company news).

### Public Profile (Public View)
*   **Colleague View:** A "Business Card" view visible to other employees, displaying non-sensitive info: Job Title, Department, Work Contact Info, and "About Me" section.

---

## 3. Technical Requirements (Logic)

### State Synchronization (State Sync)
*   **Global Updates:** Changes to the profile (e.g., new avatar or name) must reflect instantly in the application header and other modules without requiring a full page reload.
*   **Implementation:** Use a global state management pattern (e.g., Store or Context) to propagate user metadata updates.

### Internationalization (i18n) Logic
*   The system must support dynamic locale switching.
*   The chosen locale should be persisted in both the backend (user settings) and local storage (for immediate application during the next boot sequence before the API response).

### Secure Password Change
*   **Validation:** Implementation of a "Confirm Current Password" step before allowing the setting of a new password.
*   **Feedback:** Real-time feedback on password complexity requirements.

### Media Upload & Optimization
*   **Avatar Handling:** Logic for client-side image validation (size, MIME type) and optional cropping/resizing before upload to optimize storage and loading times.

---

## 4. API Endpoints (Contract)

### GET `/api/users/me`
*   Retrieves the profile and settings of the currently authenticated user.

### PATCH `/api/users/me`
*   Updates personal information and metadata.

### POST `/api/auth/change-password`
*   Secure endpoint requiring current and new password fields.

### GET/PATCH `/api/users/me/preferences`
*   Retrieves or updates UI-specific settings like theme, language, and notification triggers.

### POST `/api/users/me/avatar`
*   Uploads a new profile picture using `multipart/form-data`.

### DELETE `/api/users/me/avatar`
*   Removes the current profile picture.

---

## 5. UI States

### Preview Mode
*   Toggle to allow the user to see how their profile appears to their colleagues.

### Profile Completion Progress
*   Visual cues or progress bars indicating which sections of the profile remain incomplete (e.g., "Add a photo to help colleagues recognize you").

### Instant Feedback
*   Toast notifications or inline success indicators for every preference change or data update.

### Data Skeletons
*   Smooth loading experience using skeleton placeholders for profile sections during initial data fetching.
