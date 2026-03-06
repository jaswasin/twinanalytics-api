# TwinAnalytics API

A Node.js REST API built with **Express** and **PostgreSQL**. Exposes GET, POST, and PUT endpoints for analytics data.

---

## Quick Start

### 1. Prerequisites

- **Node.js** ≥ 18
- **PostgreSQL** running locally or remotely

### 2. Install

```bash
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env
# Edit .env with your PostgreSQL credentials
```

### 4. Create the Database Table

Connect to your PostgreSQL database and run:

```sql
CREATE TABLE IF NOT EXISTS analytics (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  value       NUMERIC      NOT NULL,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
```

### 5. Run

```bash
# Development (auto-restart on changes)
npm run dev

# Production
npm start
```

The server starts at `http://localhost:3000` (or the `PORT` in your `.env`).

---

## API Endpoints

| Method | Path                  | Description              |
|--------|-----------------------|--------------------------|
| GET    | `/api/health`         | Health check             |
| GET    | `/api/analytics`      | List all records         |
| GET    | `/api/analytics/:id`  | Get a record by ID       |
| POST   | `/api/analytics`      | Create a new record      |
| PUT    | `/api/analytics/:id`  | Update a record by ID    |

### Request / Response Examples

#### POST /api/analytics

```json
// Request body
{ "name": "page_views", "value": 1024 }

// Response — 201 Created
{
  "success": true,
  "message": "Record created successfully.",
  "data": { "id": 1, "name": "page_views", "value": "1024", "created_at": "…", "updated_at": "…" }
}
```

#### PUT /api/analytics/1

```json
// Request body (partial update — only changed fields required)
{ "value": 2048 }

// Response — 200 OK
{
  "success": true,
  "message": "Record updated successfully.",
  "data": { "id": 1, "name": "page_views", "value": "2048", "created_at": "…", "updated_at": "…" }
}
```

#### Error Response

```json
// 400 Bad Request example
{
  "success": false,
  "message": "Validation failed.",
  "errors": [{ "field": "name", "message": "Name is required" }]
}
```

---

## Project Structure

```
twinanalytics-api/
├── server.js                           # Entry point + graceful shutdown
├── src/
│   ├── app.js                          # Express app setup
│   ├── config/
│   │   └── db.js                       # PostgreSQL connection pool
│   ├── controllers/
│   │   └── analyticsController.js      # Request handlers
│   ├── middleware/
│   │   ├── errorHandler.js             # Global error handler
│   │   └── validate.js                 # Validation middleware
│   ├── routes/
│   │   ├── index.js                    # Route aggregator + health check
│   │   └── analyticsRoutes.js          # /api/analytics routes
│   ├── services/
│   │   └── analyticsService.js         # DB queries (business logic)
│   └── utils/
│       ├── AppError.js                 # Custom error class
│       └── asyncHandler.js             # Async route wrapper
├── .env.example
├── .editorconfig
├── .gitignore
├── package.json
└── README.md
```

---

## Best Practices Implemented

| Area            | Detail                                                                 |
|-----------------|------------------------------------------------------------------------|
| Security        | Helmet headers, CORS, rate limiting, parameterised queries (no SQLi)   |
| Error Handling  | Custom `AppError`, async wrapper, centralized error middleware          |
| Validation      | express-validator on all inputs with structured error responses         |
| Shutdown        | SIGTERM/SIGINT graceful shutdown with DB pool cleanup                   |
| Logging         | Morgan request logging (dev / combined formats)                        |
| Code Style      | Layered architecture (routes → controllers → services → DB)            |
| Config          | dotenv + env var validation with fail-fast on missing vars             |

---

## Adding a New Resource

1. **Service** — Create `src/services/newService.js` with SQL queries
2. **Controller** — Create `src/controllers/newController.js` with handlers
3. **Routes** — Create `src/routes/newRoutes.js` with validation & route mapping
4. **Register** — Add `router.use('/new', newRoutes)` in `src/routes/index.js`
