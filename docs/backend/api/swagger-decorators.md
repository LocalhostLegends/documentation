# Swagger Decorator Organization

## 1. Overview
In the **Hirely** project, we use a centralized pattern for managing Swagger (OpenAPI) documentation metadata. Instead of cluttering controllers with dozens of `@ApiResponse`, `@ApiOperation`, and `@ApiProperty` decorators, we move them into a dedicated `swagger/` folder within each module.

This approach keeps our controllers clean, focused purely on request handling and business logic, and makes our API documentation highly reusable and easier to maintain.

## 2. Folder Structure
Each module should follow this structure for Swagger documentation:

```text
src/modules/invites/
├── invite.controller.ts
├── invite.service.ts
├── dto/
└── swagger/
    ├── invite.fields.ts      # Shared examples and field definitions
    ├── invite.decorators.ts  # Composed decorators using applyDecorators
    └── index.ts              # Aggregator and single point of export
```

*   **`*.fields.ts`**: Contains constants for example values, descriptions, and complex response schemas.
*   **`*.decorators.ts`**: Contains the actual composed decorators for each controller method.
*   **`index.ts`**: Bundles everything into a single `swagger` object for clean imports.

## 3. Fields File (`*.fields.ts`)
This file stores reusable data. By centralizing examples here, we ensure that the same example value used in a DTO is also used in the Swagger documentation without duplication.

```typescript
export const InviteFields = {
  id: { 
    example: '123e4567-e89b-12d3-a456-426614174000', 
    description: 'Unique identifier of the invite' 
  },
  validateResponse: { 
    id: '123e4567-e89b-12d3-a456-426614174000', 
    email: 'user@example.com', 
    status: 'PENDING' 
  },
  acceptBodyExample: { 
    token: 'abc123token', 
    password: 'Password123!', 
    firstName: 'John', 
    lastName: 'Doe' 
  }
};
```

## 4. Decorators File (`*.decorators.ts`)
We use `applyDecorators` from `@nestjs/common` to group multiple Swagger decorators into a single, semantic function.

```typescript
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { InviteFields } from './invite.fields';

export const ApiInviteTags = () => ApiTags('Invites');

export const ApiValidateInvite = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Validate invite token before acceptance' }),
    ApiQuery({ name: 'token', type: 'string', description: 'The unique invite token' }),
    ApiResponse({ 
      status: HttpStatus.OK, 
      description: 'Token is valid',
      schema: { example: InviteFields.validateResponse } 
    }),
    ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Invite not found or invalid' }),
  );
};
```

## 5. Index File (`index.ts`)
The `index.ts` file acts as a namespace. It aggregates all decorators into a single `swagger` constant.

```typescript
import * as inviteDecorators from './invite.decorators';
import { InviteFields } from './invite.fields';

export const swagger = {
  ApiTags: inviteDecorators.ApiInviteTags,
  ApiValidateInvite: inviteDecorators.ApiValidateInvite,
  ApiCreateInvite: inviteDecorators.ApiCreateInvite,
  ApiAcceptInvite: inviteDecorators.ApiAcceptInvite,
};

export { InviteFields };
```

## 6. Controller Usage
In the controller, you only need to import the `swagger` object. This results in a very clean class definition.

```typescript
import { Controller, Get, Query } from '@nestjs/common';
import { swagger } from './swagger';

@swagger.ApiTags() // Composed @ApiTags('Invites')
@Controller('invites')
export class InviteController {
  
  @Get('validate')
  @swagger.ApiValidateInvite() // All Swagger metadata applied here
  async validate(@Query('token') token: string) {
    return this.inviteService.validate(token);
  }
}
```

:::note
Notice that we don't import anything from `@nestjs/swagger` in the controller itself. Everything is encapsulated within the `swagger` object.
:::

## 7. Step-by-Step: Adding Swagger for a New Module

1.  **Create folder:** Create a `swagger/` directory inside your module folder.
2.  **Define Fields:** Create `{module}.fields.ts` and populate it with example objects for requests and responses.
3.  **Create Decorators:** Create `{module}.decorators.ts`. For every method in your controller, create a corresponding `Api{MethodName}` function using `applyDecorators`.
4.  **Export:** Create `index.ts` and map your decorators to the `swagger` object.
5.  **Apply:** Import `swagger` in your controller and replace inline decorators.

### Example for a simple GET endpoint:
**In `swagger/user.decorators.ts`:**
```typescript
export const ApiGetProfile = () => applyDecorators(
  ApiBearerAuth('JWT-auth'),
  ApiOperation({ summary: 'Get current user profile' }),
  ApiResponse({ status: 200, description: 'Profile retrieved' })
);
```

## 8. Benefits Recap
*   **Clean Controllers:** Only business logic, guards, and high-level routing are visible.
*   **Reusability:** Fields and examples are shared between decorators and DTOs.
*   **Type Safety:** IDEs provide full autocompletion for the `swagger.` object.
*   **DRY Principle:** Avoid repeating common responses (like 401 Unauthorized or 403 Forbidden) by including them in the composed decorators.
*   **Maintenance:** Changing the documentation for an endpoint doesn't require touching the controller file.

## 9. Caveats and Best Practices
*   **Naming:** Keys in the `swagger` object should match the controller method name for clarity (e.g., `ApiCreateUser` for `createUser` method).
*   **Security:** Always include `@ApiBearerAuth()` inside the composed decorator if the endpoint is protected by JWT.
*   **Keep it Pure:** Do not put validation logic (like `IsString`) in the `swagger/` folder; that belongs in DTOs.
*   **Descriptions:** Always provide a `summary` in `@ApiOperation` and meaningful descriptions for status codes.

## Conclusion
This pattern scales perfectly with large projects. It ensures that as the API grows, the controllers remain readable, and the documentation remains consistent and easy to manage.
