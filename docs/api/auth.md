# Authentication API

## Register

**POST** `/api/auth/register`

Register a new user.

### Request
```json
{
  "name": "John Doe",
  "email": "john@company.com",
  "password": "secure123"
}
```

### Response
```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@company.com",
  "status": "pending"
}
```