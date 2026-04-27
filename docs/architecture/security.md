# Security Architecture

The platform employs a multi-layered security strategy to protect user data and ensure system integrity.

## 1. Authentication (Auth)

The system uses **JWT (JSON Web Tokens)** for stateless authentication.
*   **Access Tokens**: Short-lived tokens used for API authorization.
*   **Storage**: On the client side, tokens are stored in `secure` and `httpOnly` cookies to prevent XSS (Cross-Site Scripting) attacks.
*   **Validation**: Every request is validated via a NestJS `AuthGuard` before reaching the controllers.

## 2. Password Hashing

We follow industry standards for credential storage:
*   **Algorithm**: **Bcrypt**.
*   **Salting**: Bcrypt automatically handles salting to protect against rainbow table attacks.
*   **Cost Factor**: The hashing process includes a configurable "cost factor" to ensure it remains resistant to brute-force attacks even as hardware becomes faster.

## 3. Data Isolation (Multi-Tenancy)

The system is designed for B2B multi-tenancy. Data isolation is enforced at the database level:
*   **Company ID**: Almost every entity (Employees, Departments, etc.) is linked to a `companyId`.
*   **Global Filters**: Every database query automatically includes a `WHERE companyId = :id` filter based on the authenticated user's context.
*   **Zero-Cross Access**: It is architecturally impossible for a user from Company A to access or even discover data from Company B.

## 4. Access Control (RBAC)

Beyond authentication, the system uses a granular **Role-Based Access Control** model.
*   **Permission Service**: A centralized `can()` method evaluates actions based on Role, Scope, and Hierarchy.
*   **Detailed Docs**: For a deep dive into roles and permissions, see the **[RBAC Documentation](./rbac/roles-overview)**.

## 5. Environment & Infrastructure

*   **Secrets**: All sensitive keys (JWT secret, DB credentials) are managed via encrypted environment variables.
*   **CORS**: Strict Cross-Origin Resource Sharing policies are configured to allow requests only from verified domains.
