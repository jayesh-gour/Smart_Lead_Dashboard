# Smart Leads API Reference

Base URL: `http://localhost:5000/api`

Interactive docs: `GET /api/docs` (Swagger UI)

## Response format

```json
{
  "success": true,
  "message": "Leads fetched successfully",
  "data": [],
  "meta": {
    "currentPage": 1,
    "totalPages": 3,
    "totalItems": 24,
    "limit": 10
  }
}
```

Errors return `success: false` with `message` and optional `errors[]`.

---

## Auth

### POST `/auth/register`

Body:
```json
{ "name": "Jane", "email": "jane@co.com", "password": "Secret123" }
```

Returns `{ user, token }`. New accounts default to **Sales** role.

### POST `/auth/login`

Body:
```json
{ "email": "admin@smartleads.com", "password": "Admin@123" }
```

### GET `/auth/me`

Headers: `Authorization: Bearer <token>`

---

## Leads (authenticated)

All lead routes require `Authorization: Bearer <token>`.

### GET `/leads/stats`

Returns `{ total, byStatus: { New, Contacted, ... } }` scoped by RBAC (Admin = all, Sales = own).

### GET `/leads`

Query params (combinable):

| Param    | Type   | Description                          |
|----------|--------|--------------------------------------|
| page     | number | Page number (default 1)              |
| status   | enum   | New, Contacted, Qualified, Lost      |
| source   | enum   | Website, Instagram, Referral         |
| search   | string | Matches name or email (case-insensitive) |
| sort     | string | `latest` (default) or `oldest`       |

Example:
```
GET /leads?status=Qualified&source=Instagram&search=Rahul&sort=latest&page=1
```

**RBAC:** Admin sees all leads. Sales sees only leads they created.

### GET `/leads/:id`

### POST `/leads`

Body:
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "status": "New",
  "source": "Instagram"
}
```

### PATCH `/leads/:id`

Partial update — at least one field required.

### DELETE `/leads/:id`

### GET `/leads/export/csv`

Same query params as list (filters apply). Returns `text/csv` file download.

---

## Status codes

| Code | When                    |
|------|-------------------------|
| 200  | Success                 |
| 201  | Created                 |
| 400  | Validation / bad id     |
| 401  | Missing or invalid JWT  |
| 403  | Role / ownership denied |
| 404  | Not found               |
| 409  | Duplicate email         |
| 500  | Server error            |
