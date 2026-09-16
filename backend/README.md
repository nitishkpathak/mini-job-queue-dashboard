# Mini Job Queue - NestJS Backend

NestJS backend REST API for managing a mini job queue with strict state machine validation and concurrency protection.

## Endpoints

- `POST /jobs` — Create a job
- `GET /jobs` — Get all jobs (supports `?status=pending` query)
- `GET /jobs/counts` — Get counts per status
- `GET /jobs/:id` — Get single job details
- `PATCH /jobs/:id/status` — Update job status
- `DELETE /jobs/:id` — Delete a job

## State Machine Rules

- `pending` -> `running`
- `running` -> `completed` | `failed`
- `completed` and `failed` are terminal states.

## Setup

```bash
npm install
npm run build
npm run start
```
Swagger UI available at `http://localhost:3001/api/docs`.
