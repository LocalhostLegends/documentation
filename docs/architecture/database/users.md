# Users Table

## Schema

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR(100) | Full name |
| email | VARCHAR(255) | Unique email |
| password | VARCHAR(255) | Hashed password |
| role | ENUM('admin','hr','employee','manager') | User role |
| status | ENUM('active','inactive','pending') | Account status |
| created_at | TIMESTAMP | Creation date |
| updated_at | TIMESTAMP | Last update |

## Relationships

- One-to-Many with `employees` (if user is employee)
- One-to-Many with `vacancies` (if user is hr)
- One-to-Many with `candidates` (if user applied)

## Indexes

- `email` (unique)
- `role`
- `status`