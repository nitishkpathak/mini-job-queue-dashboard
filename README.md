# Mini Job Queue Dashboard

A full-stack Job Queue Management Dashboard built with **React.js** for the frontend and **NestJS** for the backend, using **SQLite (TypeORM)** for persistence, strict state machine validation, and atomic concurrency handling.

---

## 📌 Submission Links

- **GitHub Public Repository**: [https://github.com/nitishkpathak/mini-job-queue-dashboard](https://github.com/nitishkpathak/mini-job-queue-dashboard)
- **Live Frontend URL**: [https://mini-job-queue-dashboard-gules.vercel.app](https://mini-job-queue-dashboard-gules.vercel.app)
- **Live Backend API URL**: [https://mini-job-queue-dashboard-wfos.onrender.com](https://mini-job-queue-dashboard-wfos.onrender.com)
- **Live Swagger API Documentation**: [https://mini-job-queue-dashboard-wfos.onrender.com/api/docs](https://mini-job-queue-dashboard-wfos.onrender.com/api/docs)

---

## 📖 Overview

The **Mini Job Queue Dashboard** allows engineering teams to create, monitor, filter, update, and delete asynchronous background jobs. 

It is designed to demonstrate real-world full-stack development practices, including:
1. **API Design & DTO Validation**: Sanitized RESTful endpoints built with NestJS and Class Validator.
2. **Strict State Machine**: Enforced status transition flow (`pending` → `running` → `completed` | `failed`).
3. **Atomic Concurrency Control**: Prevents race conditions when multiple users or browser tabs attempt to update the same job simultaneously.
4. **Clean Restrained UI**: A dense, responsive developer tool interface built with React.js and Tailwind CSS.

---

## 🏗 System Architecture Flow

```text
┌─────────────────────────────────────────────────────────────────┐
│                      React.js Frontend                          │
│                                                                 │
│  • Dashboard Page               • Status Summary Pills          │
│  • Search & Filter Bar          • Responsive Jobs Table         │
│  • Create Job Modal             • Toast Notifications           │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                            Axios HTTP
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      NestJS Backend API                         │
│                                                                 │
│  • JobsController (REST Endpoints & Swagger Annotations)        │
│  • ValidationPipe (Payload sanitization & DTO validation)       │
│  • HttpExceptionFilter (Standardized JSON error envelope)      │
│  • JobsService (State Machine & Concurrency logic)              │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                           TypeORM Queries
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SQLite Database                            │
│                                                                 │
│  • `jobs` Table (UUID id, title, type, status, createdAt)       │
└─────────────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features

- **Job Queue Management**: Create, view, list, filter by status or type, update status, and delete background jobs.
- **Strict State Machine**: Backend-enforced valid transitions (`pending` → `running` → `completed` | `failed`). Terminal states (`completed` and `failed`) cannot be modified.
- **Concurrency & Race Condition Safety**: Atomic conditional SQL queries (`UPDATE jobs SET status = :target WHERE id = :id AND status = :expected`) prevent concurrent state corruption across parallel requests.
- **Real-Time Status Summary**: Live status counts for `Total`, `Pending`, `Running`, `Completed`, and `Failed` jobs.
- **Context-Aware Action Buttons**: UI displays valid actions per state (`Run` for pending, `Complete`/`Fail` for running, disabled text for terminal states).
- **Interactive Swagger Documentation**: Live OpenAPI documentation UI at `/api/docs`.
- **Global Error Handling**: Standardized JSON error response envelope (`statusCode`, `timestamp`, `path`, `method`, `message`).

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React.js (v18) with Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Backend
- **Framework**: NestJS (v10) with TypeScript
- **Database ORM**: TypeORM with SQLite3
- **Validation**: `class-validator` & `class-transformer`
- **Documentation**: Swagger OpenAPI (`@nestjs/swagger`)

### Database
- **SQLite**: Local zero-configuration file database (`backend/data/jobs.sqlite`).

---

## 📂 Project Structure

```text
mini-job-queue-dashboard/
│
├── backend/
│   ├── src/
│   │   ├── jobs/
│   │   │   ├── dto/
│   │   │   │   ├── create-job.dto.ts
│   │   │   │   └── update-job-status.dto.ts
│   │   │   ├── entities/
│   │   │   │   └── job.entity.ts
│   │   │   ├── jobs.controller.ts
│   │   │   ├── jobs.service.ts
│   │   │   ├── jobs.module.ts
│   │   │   └── jobs.constants.ts
│   │   ├── common/
│   │   │   ├── enums/
│   │   │   │   └── job-status.enum.ts
│   │   │   ├── filters/
│   │   │   │   └── http-exception.filter.ts
│   │   │   └── exceptions/
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── StatusSummary.jsx
│   │   │   ├── StatusFilter.jsx
│   │   │   ├── JobTable.jsx
│   │   │   ├── JobRow.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   ├── JobForm.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   └── NotificationToast.jsx
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── jobApi.js
│   │   ├── hooks/
│   │   │   └── useJobs.js
│   │   ├── utils/
│   │   │   └── jobUtils.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
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

## 🔄 Status Transition Rules

Job statuses follow a strict state machine:

```text
             ┌──→ completed
pending → running
             └──→ failed
```

### Transition Rules
1. `pending` $\rightarrow$ `running`: Allowed.
2. `running` $\rightarrow$ `completed`: Allowed.
3. `running` $\rightarrow$ `failed`: Allowed.
4. `completed` $\rightarrow$ Anything else: **Forbidden** (Terminal State).
5. `failed` $\rightarrow$ Anything else: **Forbidden** (Terminal State).
6. Direct transition from `pending` to `completed` or `failed` is **Forbidden** (must pass through `running`).

---

## ⚡ Concurrency & Race Condition Handling

### Scenario
Two browser tabs are open simultaneously. Both display a job in `pending` status. Both users click **Run** (`pending` $\rightarrow$ `running`) at almost the exact same millisecond.

### Key Questions & Engineering Solutions

#### 1. Where should this rule be enforced?
Enforced **at the NestJS Backend Service and Database layer**. The backend acts as the authoritative single source of truth. While the React frontend hides invalid action buttons for usability, security and data integrity rely 100% on backend validation.

#### 2. What happens if someone bypasses the React application and calls the API directly?
All requests pass through NestJS `ValidationPipe` and `JobsService.validateStatusTransition()`. If someone sends a direct HTTP request (via Postman or Curl) attempting an invalid transition (e.g. `completed` $\rightarrow$ `running`), the backend rejects it with `400 Bad Request`.

#### 3. What happens when two requests arrive at nearly the same time?
Both requests compete to transition the same `pending` job to `running`. Without concurrency protection, both requests might pass in-memory checks and cause duplicate task processing or corrupted state.

#### 4. How would you prevent an invalid or inconsistent state?
We prevent race conditions using an **Atomic Conditional SQL Update**:

```sql
UPDATE jobs 
SET status = 'running' 
WHERE id = :id AND status = 'pending';
```

- **Request 1**: Executes the query. The row is modified (`affected === 1`). Transition succeeds (`200 OK`).
- **Request 2**: Executes the query milliseconds later. Because status is now `'running'`, the condition `status = 'pending'` matches 0 rows (`affected === 0`).
- The NestJS service detects `affected === 0` and throws a `409 Conflict` exception (`"Concurrent update detected"`). This guarantees database state consistency without needing complex distributed locking mechanisms.

---

## 📑 API Documentation

Interactive Swagger OpenAPI documentation is available at **`http://localhost:3001/api/docs`** (Local) and **`https://mini-job-queue-dashboard-wfos.onrender.com/api/docs`** (Live).

### 1. POST /jobs
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
    "createdAt": "2026-09-17T09:00:00.000Z"
  }
  ```

### 2. GET /jobs
Retrieves all jobs ordered by newest first.

- **Query Parameters**: `status` (optional: `pending`, `running`, `completed`, `failed`)
- **Response (200 OK)**:
  ```json
  [
    {
      "id": "c9dd0f54-75a5-4460-b933-ca6224cb509e",
      "title": "Process Monthly PDF Invoices",
      "type": "DOCUMENT_PROCESSING",
      "status": "pending",
      "createdAt": "2026-09-17T09:00:00.000Z"
    }
  ]
  ```

### 3. GET /jobs/counts
Retrieves aggregated status counts summary.

- **Response (200 OK)**:
  ```json
  {
    "total": 4,
    "pending": 1,
    "running": 1,
    "completed": 1,
    "failed": 1
  }
  ```

### 4. PATCH /jobs/:id/status
Updates job status following state transition rules.

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
    "title": "Process Monthly PDF Invoices",
    "type": "DOCUMENT_PROCESSING",
    "status": "running",
    "createdAt": "2026-09-17T09:00:00.000Z"
  }
  ```
- **Error Response (400 Bad Request)**:
  ```json
  {
    "statusCode": 400,
    "timestamp": "2026-09-17T09:05:00.000Z",
    "path": "/jobs/c9dd0f54-75a5-4460-b933-ca6224cb509e/status",
    "method": "PATCH",
    "message": "Invalid status transition from 'completed' to 'running'. Allowed transitions from 'completed': []"
  }
  ```

### 5. DELETE /jobs/:id
Deletes a job by ID.

- **Response (200 OK)**:
  ```json
  {
    "message": "Job \"Process Monthly PDF Invoices\" deleted successfully"
  }
  ```

---

## 🗄 Database Schema

### `jobs` Table
| Column | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | Primary Key, Auto-Generated | Unique job identifier |
| `title` | `VARCHAR(100)` | NOT NULL | Title of the job task |
| `type` | `VARCHAR(50)` | NOT NULL | Category / type of job |
| `status` | `TEXT` | Default `'pending'` | Enum: `pending`, `running`, `completed`, `failed` |
| `createdAt` | `TIMESTAMP` | Auto-Generated | Creation timestamp |

---

## 🔍 Validation & Error Handling

- **Class Validator**: Payload attributes are validated via decorators (`@IsNotEmpty`, `@IsString`, `@IsEnum`, `@MaxLength`).
- **Sanitization**: NestJS global `ValidationPipe` with `whitelist: true` and `forbidNonWhitelisted: true` rejects unexpected fields (e.g. `name`, `email`, `password`).
- **Exception Filter**: Global `HttpExceptionFilter` formats errors into standard JSON structures (`statusCode`, `timestamp`, `path`, `method`, `message`), preventing raw stack traces from leaking to clients.

---

## ⚙️ Environment Variables

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

## 🚀 Local Setup Instructions

### Prerequisites
- **Node.js**: v18+
- **npm**: v9+

### 1. Backend Setup
```bash
cd backend
npm install
npm run build
npm run start
```
- Backend REST API: **`http://localhost:3001`**
- Swagger API Docs: **`http://localhost:3001/api/docs`**

### 2. Frontend Setup
In a separate terminal tab:
```bash
cd frontend
npm install
npm run dev
```
- Dashboard UI: **`http://localhost:3000`**

---

## 💡 Assumptions & Trade-offs

1. **SQLite for Local Persistence**: SQLite is chosen for zero-config file persistence during local evaluation. On free cloud deployment containers (like Render Free Tier), containers spin down after inactivity, resetting local temporary disk files on container restart.
2. **Short Polling**: Client state auto-refreshes periodically (every 10s) and after mutations. WebSockets would be added for push updates in high-volume production.
3. **No Auth Requirements**: Per assignment scope, endpoints are unauthenticated for easy evaluator testing.

---

## 🚀 Production Improvements

1. **WebSockets (Socket.IO)**: Broadcast status changes to all open browser tabs in real-time with zero latency.
2. **Background Worker Queues (BullMQ + Redis)**: Process asynchronous worker tasks in background queues with automatic retries, exponential backoff, and rate limiting.
3. **Database Migration Scripts**: TypeORM migration files for production schema versioning and safe database deployments.

---

## 📜 License

MIT License - free to use for evaluation and education.
