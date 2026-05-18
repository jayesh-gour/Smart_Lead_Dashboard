# Smart Leads Dashboard

A full-stack lead management dashboard built with the MERN stack. Track prospects, filter and search in real time, paginate results, and export filtered data to CSV — with JWT auth and role-based access for Admin and Sales users.

## Tech stack

| Layer    | Stack                                      |
|----------|--------------------------------------------|
| Frontend | React 18, TypeScript, Vite, TailwindCSS  |
| Backend  | Node.js, Express, TypeScript, Mongoose   |
| Database | MongoDB                                    |
| Auth     | JWT + bcrypt                               |
| State    | Zustand (persisted auth)                   |
| Forms    | React Hook Form + Zod                      |
| API      | Axios                                      |

## Features

- Register / login with JWT
- Roles: **Admin** (all leads) and **Sales** (own leads only)
- Leads CRUD with validation
- Combined filters: status, source, search (name/email), sort (latest/oldest)
- Server-side pagination (10 per page)
- CSV export respecting active filters
- Swagger UI at `/api/docs`
- Dark mode toggle
- Docker Compose for local full-stack run

## Project structure

```
Smart-Leads/
├── backend/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── services/
│       ├── utils/
│       ├── validators/
│       └── scripts/seed.ts
├── frontend/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── features/
│       ├── hooks/
│       ├── layouts/
│       ├── pages/
│       └── routes/
├── docs/API.md
├── docker-compose.yml
└── README.md
```

## Environment variables

Copy root `.env.example` to `backend/.env` and `frontend/.env`:

**backend/.env**
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-leads
JWT_SECRET=your-long-secret-here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

**frontend/.env**
```
VITE_API_URL=http://localhost:5000/api
```

## Local setup

### Prerequisites

- Node.js 20+
- MongoDB running locally (or use Docker for Mongo only)

### 1. Backend

```bash
cd backend
cp .env.example .env
# edit JWT_SECRET and MONGODB_URI
npm install
npm run seed    # optional sample data
npm run dev
```

API: http://localhost:5000  
Swagger: http://localhost:5000/api/docs

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

App: http://localhost:5173

## Docker

From project root:

```bash
# set JWT_SECRET in .env or export it
docker compose up --build
```

| Service  | URL                    |
|----------|------------------------|
| Frontend | http://localhost:5173  |
| API      | http://localhost:5000  |
| MongoDB  | localhost:27017        |

Seed inside backend container:

```bash
docker compose exec backend sh -c "npm run seed"
```

(Requires dev deps in container — for production seed, run locally against the Docker Mongo URI.)

## Demo credentials (after seed)

| Role  | Email                   | Password   |
|-------|-------------------------|------------|
| Admin | admin@smartleads.com    | Admin@123  |
| Sales | sales@smartleads.com    | Sales@123  |

## API endpoints

| Method | Endpoint              | Auth | Notes                    |
|--------|-----------------------|------|--------------------------|
| POST   | /api/auth/register    | No   | Creates Sales user       |
| POST   | /api/auth/login       | No   |                          |
| GET    | /api/auth/me          | Yes  |                          |
| GET    | /api/leads/stats      | Yes  | Status counts + total    |
| GET    | /api/leads            | Yes  | Filters + pagination     |
| POST   | /api/leads            | Yes  |                          |
| GET    | /api/leads/:id        | Yes  |                          |
| PATCH  | /api/leads/:id        | Yes  |                          |
| DELETE | /api/leads/:id        | Yes  |                          |
| GET    | /api/leads/export/csv | Yes  | Filtered export          |

Full reference: [docs/API.md](docs/API.md)

## RBAC

- **Admin** — list, view, edit, delete, and export **all** leads.
- **Sales** — same operations, but only on leads where `createdBy` matches their user id.

Backend enforces this in `lead.service.ts`. The UI shows a short note on the leads page based on role.

## Pagination, filter & search

- Pagination uses MongoDB `skip` / `limit` (10 items per page).
- Filters build a single Mongoose query — status, source, and `$or` regex on name/email can be combined.
- Sort uses `createdAt` ascending (`oldest`) or descending (`latest`, default).
- Frontend debounces search input (400ms) before hitting the API.

Example:
```
GET /api/leads?status=Qualified&source=Instagram&search=Rahul&sort=latest&page=1
```

## CSV export

`GET /api/leads/export/csv` accepts the same query params as the list endpoint. The backend generates CSV with headers: Name, Email, Status, Source, Created At. The frontend downloads the blob as `leads-YYYY-MM-DD.csv`.

## Deployment notes

- Set strong `JWT_SECRET` and production `MONGODB_URI`.
- Point `CLIENT_URL` to your frontend origin for CORS.
- Build backend: `npm run build` → `npm start`.
- Build frontend: `npm run build` → serve `dist/` (nginx sample included).
- Use HTTPS in production; consider stricter rate limits and MongoDB Atlas.

## Scripts

| Location | Command        | Description        |
|----------|----------------|--------------------|
| backend  | `npm run dev`  | Dev server (tsx)   |
| backend  | `npm run seed` | Sample users/leads |
| frontend | `npm run dev`  | Vite dev server    |
| frontend | `npm run build`| Production build   |
