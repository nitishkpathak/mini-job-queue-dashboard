# Mini Job Queue Dashboard

A full-stack Job Queue Management Dashboard built with **React.js** for the frontend and **NestJS** for the backend, utilizing **SQLite (TypeORM)** for persistence, strict state machine validation, and atomic concurrency handling.

---

## Overview

The Mini Job Queue Dashboard allows users to create, filter, monitor, update, and delete asynchronous background jobs. It demonstrates real-world software engineering practices including state transition constraints, DTO payload validation, REST API design, and atomic concurrency controls to prevent race conditions when multiple users or tabs interact with the system simultaneously.

---

## Architecture Flow

```text
                  ┌──────────────────────┐
                  │      React App       │
                  │                      │
                  │  Dashboard           │
                  │  Job Form            │
                  │  Filters             │
                  │  Job Table           │
                  │  Status Cards        │
                  └──────────┬───────────┘
                             │
                          Axios
                             │
                             ▼
                  ┌──────────────────────┐
                  │     NestJS API       │
                  │                      │
                  │ JobsController       │
                  │       ↓              │
                  │ JobsService          │
                  │       ↓              │
                  │ Validation           │
                  │ Status Transition    │
                  │ Concurrency Control  │
                  └──────────┬───────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │ PostgreSQL / SQLite  │
                  │                      │
                  │       Jobs           │
                  └──────────────────────┘
```

---

## Features

- **Real-Time Job Queue Management**: Create, list, filter, update status, and delete jobs.
- **Strict State Machine**: Enforces valid status transitions (`pending` → `running` → `completed` | `failed`).
- **Atomic Concurrency Safety**: Prevents race conditions using conditional SQL updates (`WHERE id = :id AND status = :expectedStatus`).
- **Status Summary Cards**: Dynamic counters for `Total`, `Pending`, `Running`, `Completed`, and `Failed` jobs.
- **Context-Aware Action Buttons**: UI dynamically shows allowed actions (e.g. `Start` for pending, `Complete`/`Fail` for running, disabled for terminal states).
- **Interactive API Documentation**: Built-in Swagger UI at `/api/docs`.
- **Global Error & Exception Handling**: Standardized API error envelopes (`400 Bad Request`, `409 Conflict`, `404 Not Found`).

---

## Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Lucide Icons, Axios.
- **Backend**: NestJS, TypeScript, TypeORM, Class-Validator, Swagger OpenAPI.
- **Database**: SQLite (local zero-config file database) / PostgreSQL compatible.

---

## Project Structure

```text
mini-job-queue-dashboard/
│
├── backend/
│   ├── src/
│   │   ├── jobs/
│   │   │   ├── dto/
│   │   │   │   ├── create-job.dto.ts
│   │   │   │   └── update-job-status.dto.ts
│   │   │   │
│   │   │   ├── entities/
│   │   │   │   └── job.entity.ts
│   │   │   │
│   │   │   ├── jobs.controller.ts
│   │   │   ├── jobs.service.ts
│   │   │   ├── jobs.module.ts
│   │   │   └── jobs.constants.ts
│   │   │
│   │   ├── common/
│   │   │   ├── enums/
│   │   │   │   └── job-status.enum.ts
│   │   │   ├── filters/
│   │   │   │   └── http-exception.filter.ts
│   │   │   └── exceptions/
│   │   │
│   │   ├── app.module.ts
│   │   └── main.ts
│   │
│   ├── test/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── JobForm.jsx
│   │   │   ├── JobTable.jsx
│   │   │   ├── JobRow.jsx
│   │   │   ├── StatusFilter.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   ├── StatusCards.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── ErrorMessage.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── services/
│   │   │   └── jobApi.js
│   │   │
│   │   ├── hooks/
│   │   │   └── useJobs.js
│   │   │
│   │   ├── utils/
│   │   │   └── jobUtils.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── README.md
├── .gitignore
└── LICENSE
```

---

## API Documentation

Interactive Swagger API specs are available at **`http://localhost:3001/api/docs`**.

### POST /jobs
Creates a new job in the queue. Default status is `pending`.

- **Request Body**:
  ```json
  {
    "title": "Process Monthly PDF Invoices",
    "type": "DOCUMENT_PROCESSING"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "id": "c9dd0f54-75a5-4460-b933-ca6224cb509e",
    "title": "Process Monthly PDF Invoices",
    "type": "DOCUMENT_PROCESSING",
    "status": "pending",
    "createdAt": "2026-09-15T16:09:12.000Z"
  }
  ```

### GET /jobs
Retrieves all jobs, with optional filtering by status query parameter.

- **Query Parameters**: `status` (optional: `pending` | `running` | `completed` | `failed`)
- **Response (200 OK)**:
  ```json
  [
    {
      "id": "c9dd0f54-75a5-4460-b933-ca6224cb509e",
      "title": "Process Monthly PDF Invoices",
      "type": "DOCUMENT_PROCESSING",
      "status": "pending",
      "createdAt": "2026-09-15T16:09:12.000Z"
    }
  ]
  ```

### PATCH /jobs/:id/status
Updates the status of a specific job adhering to state transition rules.

- **Request Body**:
  ```json
  {
    "status": "running"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "id": "c9dd0f54-75a5-4460-b933-ca6224cb509e",
    "status": "running"
  }
  ```
- **Error Response (400 Bad Request)**: Returned when attempting forbidden transitions (e.g. `completed` → `running`).

### DELETE /jobs/:id
Deletes a job from the database by ID.

- **Response (200 OK)**:
  ```json
  {
    "message": "Job with ID \"c9dd0f54-75a5-4460-b933-ca6224cb509e\" has been deleted successfully"
  }
  ```

---

## Database Schema

### `jobs` Table
| Column | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | Primary Key, Generated | Unique identifier |
| `title` | `VARCHAR(100)` | NOT NULL | Title of the job |
| `type` | `VARCHAR(50)` | NOT NULL | Type of job processing |
| `status` | `ENUM` | Default `'pending'` | Values: `pending`, `running`, `completed`, `failed` |
| `createdAt` | `TIMESTAMP` | Auto-Generated | Record creation timestamp |

---

## Status Transition Rules

State transitions strictly follow this state machine diagram:

```text
             ┌──→ completed
pending → running
             └──→ failed
```

- `pending` $\rightarrow$ `running`
- `running` $\rightarrow$ `completed`
- `running` $\rightarrow$ `failed`
- `completed` & `failed` are **terminal states** and cannot transition to any other status.
- Direct transition from `pending` to `completed` or `failed` is forbidden.

---

## Concurrency Handling

### Scenario
Two browser tabs are open simultaneously. Both display a job in `pending` state and both users click **Start (Running)** at almost the exact same millisecond.

### Solution & Mechanism
1. **NestJS Service Logic (`validateStatusTransition`)**: Checks valid state transition rule in-memory before executing queries.
2. **Atomic Conditional Update**:
   ```sql
   UPDATE jobs 
   SET status = 'running' 
   WHERE id = :id AND status = 'pending';
   ```
3. **Outcome**:
   - **Request 1**: Executes SQL query. Rows affected = 1. Returns `200 OK`.
   - **Request 2**: Executes SQL query. Because Request 1 changed status to `'running'`, WHERE condition `status = 'pending'` matches 0 rows. Rows affected = 0.
   - `JobsService` detects `affected === 0` and throws a `409 Conflict` exception ("Concurrent update detected").

---

## Validation & Error Handling

- **DTO Validation**: `CreateJobDto` and `UpdateJobStatusDto` validate inputs using `class-validator` (`@IsNotEmpty`, `@IsString`, `@IsEnum`).
- **Global Exception Filter**: `HttpExceptionFilter` intercepts exceptions and standardizes responses:
  ```json
  {
    "statusCode": 400,
    "timestamp": "2026-09-15T16:15:00.000Z",
    "path": "/jobs/123/status",
    "method": "PATCH",
    "message": "Invalid status transition from 'completed' to 'running'."
  }
  ```

---

## Environment Variables

### Backend (`backend/.env`)
```env
PORT=3001
DATABASE_PATH=data/jobs.sqlite
NODE_ENV=development
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:3001
```

---

## Local Setup

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Backend
```bash
cd backend
npm install
npm run build
npm run start
```
Runs at: **`http://localhost:3001`**

### Frontend
In a new terminal tab:
```bash
cd frontend
npm install
npm run dev
```
Runs at: **`http://localhost:3000`**

---

## Deployment

- **Backend**: Can be deployed to Render, Railway, or Fly.io using Node.js runtime.
- **Frontend**: Can be deployed to Vercel, Netlify, or Cloudflare Pages pointing `VITE_API_URL` to the deployed backend URL.

---

## Assumptions

- Jobs are triggered manually or by client actions via REST API.
- SQLite is sufficient for local development and single-node deployment (can swap to PostgreSQL via TypeORM config for distributed production).

---

## Trade-offs

- SQLite database file locks on heavy parallel writes; PostgreSQL would be used for high-concurrency production deployments.
- Short polling / periodic refresh (10s) used on frontend; WebSockets / SSE could be added for instant push updates across tabs.

---

## Production Improvements

1. **WebSockets (Socket.IO)**: Broadcast status changes to all open browser tabs in real time.
2. **Background Job Queue (BullMQ + Redis)**: Asynchronously process background worker tasks with retry policies and rate limiting.
3. **Database Migration Scripts**: TypeORM migrations for production database schema versioning.

---

## Screenshots

*(Include screenshots of Dashboard, Status Cards, Filters, Job Table, and Create Modal here)*

---

## Live Demo

- **Frontend**: `http://localhost:3000`
- **Backend API Docs**: `http://localhost:3001/api/docs`

---

## GitHub Repository

Public Repository Link: `https://github.com/your-username/mini-job-queue-dashboard`
