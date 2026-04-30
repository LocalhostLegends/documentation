# Centralized Exception Handling

## 1. Overview
The centralized exception handling system in **Hirely** provides a robust way to manage errors across the entire application. Instead of throwing generic errors, we use a structured approach that ensures:
*   **Consistency:** Every API error returns the same JSON structure.
*   **Type Safety:** Error codes and messages are strictly typed.
*   **Frontend-Friendly:** Unique error codes (e.g., `USER_1001`) allow the frontend to handle specific logic or translations easily.
*   **Maintainability:** All error logic is decoupled from business services.

## 2. Architecture
The system consists of several interconnected components located in `src/common/exceptions/` and `src/common/filters/`.

### 2.1 Exception Codes
`src/common/exceptions/exception-codes.ts`
A string-based enum that serves as the single source of truth for all error identifiers. Codes are grouped by functional modules.

```typescript
export enum ExceptionCode {
  // Users: 1000-1999
  USER_NOT_FOUND = 'USER_1001',
  EMAIL_ALREADY_EXISTS = 'USER_1002',

  // Departments: 2000-2999
  DEPT_NOT_FOUND = 'DEPT_2001',
  DEPT_NAME_EXISTS = 'DEPT_2002',
  
  // Positions: 3000-3999
  POS_NOT_FOUND = 'POS_3001',
  POS_TITLE_EXISTS = 'POS_3002',

  // Invites: 4000-4999
  INVITE_NOT_FOUND = 'INV_4001',
  INVITE_EXPIRED = 'INV_4002',

  // Auth: 5000-5999
  UNAUTHORIZED = 'AUTH_5001',

  // Companies: 6000-6999
  COMPANY_NOT_FOUND = 'COMP_6001',
}
```

### 2.2 Exception Messages
`src/common/exceptions/exception-messages.ts`
An object mapping each code to a function. This allows for dynamic message generation with parameters.

```typescript
export const ExceptionMessages = {
  [ExceptionCode.USER_NOT_FOUND]: (id: string) => `User with id "${id}" not found`,
  [ExceptionCode.EMAIL_ALREADY_EXISTS]: (email: string) => `Email "${email}" is already taken`,
  [ExceptionCode.DEPT_NOT_FOUND]: (id: string) => `Department with id "${id}" not found`,
  [ExceptionCode.POS_NOT_FOUND]: (id: string) => `Position with id "${id}" not found`,
};
```

### 2.3 Custom Exception Class
`src/common/exceptions/app.exception.ts`
The `AppException` class extends NestJS `HttpException`. It stores the custom code and an optional context object.

### 2.4 Exception Factory
`src/common/exceptions/exception-factory.ts`
A static class used to create exceptions. This is the **only recommended way** to instantiate errors in services.

```typescript
export class ExceptionFactory {
  static departmentNotFound(id: string) {
    return new AppException(
      ExceptionCode.DEPT_NOT_FOUND,
      HttpStatus.NOT_FOUND,
      [id], // Parameters for the message function
      { departmentId: id } // Optional debug context
    );
  }

  static positionTitleExists(title: string) {
    return new AppException(
      ExceptionCode.POS_TITLE_EXISTS,
      HttpStatus.CONFLICT,
      [title]
    );
  }
}
```

### 2.5 Global Exception Filter
`src/common/filters/global-exception.filter.ts`
A filter that catches all unhandled exceptions, formats them into a standard JSON, and logs the error.

## 3. API Response Format
When an error occurs, the API returns a standard JSON object:

```json
{
  "statusCode": 404,
  "code": "POS_3001",
  "message": "Position with id \"123\" not found",
  "timestamp": "2026-04-30T12:34:56.789Z",
  "context": { "positionId": "123" }
}
```

*   **statusCode**: Standard HTTP status code.
*   **code**: Unique internal error identifier for frontend logic.
*   **message**: Human-readable description.
*   **timestamp**: When the error occurred (ISO format).
*   **context**: (Optional) Additional metadata for debugging.

## 4. Error Code Reference

| Code | HTTP Status | Description | Module |
| :--- | :--- | :--- | :--- |
| `USER_1001` | 404 | User not found | Users |
| `USER_1002` | 409 | Email already exists | Users |
| `DEPT_2001` | 404 | Department not found | Departments |
| `DEPT_2002` | 409 | Department name already exists | Departments |
| `POS_3001` | 404 | Position not found | Positions |
| `POS_3002` | 409 | Position title already exists | Positions |
| `INV_4001` | 404 | Invite not found | Invites |
| `INV_4002` | 410 | Invite expired | Invites |
| `AUTH_5001` | 401 | Unauthorized | Authentication |
| `COMP_6001` | 404 | Company not found | Companies |

## 5. How to Add a New Error

1.  **Register Code:** Add a new entry in `exception-codes.ts`. Choose an unused prefix and number.
    ```typescript
    MY_ERROR = 'MY_7001'
    ```
2.  **Define Message:** Add the template in `exception-messages.ts`.
    ```typescript
    [ExceptionCode.MY_ERROR]: (name: string) => `Error regarding ${name}`,
    ```
3.  **Create Factory Method:** Add a method in `exception-factory.ts`.
    ```typescript
    static myError(name: string) {
      return new AppException(
        ExceptionCode.MY_ERROR, 
        HttpStatus.BAD_REQUEST, 
        [name],
        { originalParam: name }
      );
    }
    ```
4.  **Usage:** Throw it in your service.
    ```typescript
    if (invalidCondition) {
      throw ExceptionFactory.myError(someValue);
    }
    ```

:::caution
Always prefer the **ExceptionFactory** over throwing raw `HttpException` or `Error`. This ensures the response format remains consistent.
:::

## 6. Usage Examples in Services

Using the factory ensures that the correct HTTP status and message are always applied automatically.

```typescript
import { ExceptionFactory } from '@common/exceptions/exception-factory';

@Injectable()
export class DepartmentsService {
  async findById(id: string, companyId: string) {
    const department = await this.departmentRepository.findOne({ 
      where: { id, companyId } 
    });
    
    if (!department) {
      throw ExceptionFactory.departmentNotFound(id);
    }
    
    return department;
  }
}
```

## 7. Swagger Integration
To document potential errors for an endpoint, use the `@ApiResponse` decorator:

```typescript
@ApiResponse({ 
  status: HttpStatus.NOT_FOUND, 
  description: 'Department not found', 
  schema: { 
    example: { 
      statusCode: 404,
      code: 'DEPT_2001', 
      message: 'Department with id "123" not found',
      timestamp: '2026-04-30T12:00:00.000Z'
    } 
  } 
})
```

## 8. Logging and Debugging Tips
*   **Context:** Use the `context` parameter in the factory to pass IDs or internal data. It won't change the message but will be visible in the API response and logs.
*   **Global Filter Logging:** The `GlobalExceptionFilter` uses the NestJS `Logger` to record every exception.
*   **Development Mode:** In development environments, you can configure the filter to append the error `stack` trace to the response for faster debugging.

## Conclusion
This system ensures that the **Hirely** project remains easy to debug for developers and predictable for frontend consumers. By strictly following this pattern, we maintain high code quality and a better developer experience.
