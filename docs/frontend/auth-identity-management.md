# Authentication & Identity Management

## 1. Business Goal
The primary objective of this module is to provide a secure and seamless entry point for all users. It handles identity verification, access control, and onboarding processes (such as invitations and password recovery) to ensure that only authorized personnel can access the platform's resources.

---

## 2. Functional Blocks (User Flows)

### Login (Authorization)
*   **Scenario:** User logs in using their email and password.
*   **Logic:**
    1. Collect user credentials via a secure form.
    2. Submit credentials to the backend.
    3. Upon success, receive and store the authentication token (e.g., JWT).
    4. Store non-sensitive user metadata (role, name) in the application state.
    5. Redirect the user to the intended destination or the dashboard.

### Registration
*   **Scenario:** A new organization or administrator creates a primary account.
*   **Logic:**
    1. Collect organization details, admin email, and password.
    2. Validate inputs client-side (email format, password strength).
    3. Submit data to the registration endpoint.
    4. Automatically log in the user or redirect to the login page with a success message.

### Password Recovery
*   **Scenario:** User has forgotten their password.
*   **Logic:**
    1. **Request:** User enters their email; the system sends a reset link with a unique token.
    2. **Reset:** User clicks the link, enters a new password, and submits it along with the token.
    3. **Success:** User is redirected to login with a confirmation message.

### Accept Invitation
*   **Scenario:** A new employee activates their account after receiving an invite from an HR/Admin.
*   **Logic:**
    1. User arrives via a link containing an invitation token.
    2. System validates the token immediately (on page load).
    3. User completes their profile (e.g., sets a password).
    4. System activates the account and logs the user in.

---

## 3. Technical Requirements (Logic)

### Session Management
*   **Token Storage:** Store the authentication token securely. While framework-agnostic, the recommendation is to use `HttpOnly` cookies (set by the server) or, if using local storage, ensure protection against XSS.
*   **Initialization:** On application startup, check for the presence and validity of the token. If valid, fetch the current user profile; otherwise, clear the session.

### Error Interception (Interceptors)
*   **401 Unauthorized:** Automatically clear the local session and redirect the user to the Login page.
*   **403 Forbidden:** Display a "Access Denied" notification or a dedicated error page without logging the user out.

### Data Validation
*   **Email:** Must follow a standard RFC-compliant regex.
*   **Password:** Minimum 8 characters, including at least one uppercase letter, one lowercase letter, and one number.
*   **Fields:** Mandatory fields must be checked before the network request is initiated.

### Guard Logic (Route Protection)
*   Implement a wrapper or middleware for routes to check the `isAuthenticated` flag.
*   Redirect unauthenticated users attempting to access protected routes to `/login`, preserving the original URL for post-login redirect (Deep Linking).

---

## 4. API Endpoints (Contract)

### POST `/api/auth/login`
*   **Request:** `{ "email": "string", "password": "string" }`
*   **Success Response (200):** `{ "token": "string", "user": { "id": "uuid", "role": "string" } }`

### POST `/api/auth/refresh`
*   **Request:** `{ "refreshToken": "string" }`
*   **Success Response (200):** `{ "token": "string", "refreshToken": "string" }`

### POST `/api/auth/logout`
*   **Request:** `{}`
*   **Success Response (204):** No Content

### POST `/api/auth/register-company`
*   **Request:** `{ "email": "string", "password": "string", "organizationName": "string" }`
*   **Success Response (201):** `{ "message": "Account created successfully" }`

### POST `/api/auth/forgot-password`
*   **Request:** `{ "email": "string" }`
*   **Success Response (200):** `{ "message": "Reset link sent" }`

### POST `/api/auth/reset-password`
*   **Request:** `{ "token": "string", "newPassword": "string" }`
*   **Success Response (200):** `{ "message": "Password updated" }`

### GET `/api/invites/validate?token=...`
*   **Query Params:** `token`
*   **Success Response (200):** `{ "email": "string", "organizationName": "string", "isValid": true }`

### POST `/api/invites/accept`
*   **Request:** `{ "token": "string", "password": "string", "fullName": "string" }`
*   **Success Response (200):** `{ "token": "string", "user": { ... } }`

---

## 5. UI States (UX Requirements)

### Loading States
*   Buttons should show a spinner or "Processing..." state during API calls.
*   The entire page or specific sections should show a skeleton/loader during initial auth checks or token validation.

### Error Handling
*   Display clear, user-friendly messages for server errors (e.g., "Invalid credentials", "This link has expired").
*   Highlight specific form fields that failed validation.

### Redirection & Deep Linking
*   After a successful login, the application must redirect the user to the page they were trying to access before being prompted to log in (e.g., `/login?redirect=/reports/monthly`).
