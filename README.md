# Kanishk Mallick — Full Stack Personal Portfolio (Assignment 3)

This project is a full-stack web application featuring a **React Single Page Application (SPA)** frontend and a **Node.js/Express REST API** backend.

---

## 1. Setup & Run Instructions

### Prerequisites
- Node.js (v18+)
- npm

### A. Run Backend Express Server
```bash
# 1. Open terminal and navigate to server folder
cd "D:\portfolio website\server"

# 2. Install backend dependencies (if not already installed)
npm install

# 3. Start backend server
npm start
# Alternatively, for auto-reloading dev mode:
npm run dev

# Server will run on: http://localhost:5000
```

### B. Run Frontend React App
```bash
# 1. Open a second terminal and navigate to the project root
cd "D:\portfolio website"

# 2. Install frontend dependencies (if not already installed)
npm install

# 3. Start development server
npm run dev

# Frontend will run on: http://localhost:5173
```

### C. Build Frontend for Production
```bash
cd "D:\portfolio website"
npm run build
```

---

## 2. Architecture & Data Storage

- **Backend Location**: `D:\portfolio website\server\`
- **Frontend Location**: `D:\portfolio website\src\`
- **Data Persistence Strategy**:
  - **Projects Data**: Stored in `server/data/projects.json` and served via `GET /api/projects` and `GET /api/projects/:id`. The frontend no longer imports static project files directly.
  - **Contact Submissions**: Persisted in `server/data/submissions.json` when submitted via `POST /api/contact`. Submissions are verified via `GET /api/contact`.

---

## 3. Environment Variables Configuration

### Backend (`server/.env` and `server/.env.example`)
```env
PORT=5000
CLIENT_URL=http://localhost:5173
```

### Frontend (`.env` and `.env.example`)
```env
VITE_API_BASE_URL=http://localhost:5000
```

---

## 4. API Endpoints Documentation

| Method | Endpoint | Description | Status Code | Sample Response |
|---|---|---|---|---|
| `GET` | `/` | API Health check | `200 OK` | `{"status":"ok","message":"Portfolio API is running"}` |
| `GET` | `/api/projects` | List all projects | `200 OK` | `[{"id":"worksphere","title":"WorkSphere",...}]` |
| `GET` | `/api/projects/:id` | Get single project by ID | `200 OK` / `404 Not Found` | `{"id":"worksphere",...}` or `{"error":"Project not found"}` |
| `POST` | `/api/contact` | Submit contact form | `201 Created` / `400 Bad Request` | `{"success":true,"message":"...","data":{...}}` |
| `GET` | `/api/contact` | List all submissions (Verification) | `200 OK` | `[{"id":"sub_...","name":"Alice",...}]` |
| `*` | Any undefined route | Catch-all 404 error handler | `404 Not Found` | `{"error":"Route not found"}` |

> [!NOTE]
> **Open Endpoint Notice (Task B5)**: `GET /api/contact` is an open endpoint intentionally exposed for evaluation and grading purposes to verify stored submissions without requiring authentication.

---

## 5. cURL Command Reference for Testing

### 1. Health Check (Task B1)
```bash
curl http://localhost:5000/
```

### 2. Get All Projects (Task B2)
```bash
curl http://localhost:5000/api/projects
```

### 3. Get Project by ID — Success (Task B3)
```bash
curl http://localhost:5000/api/projects/worksphere
```

### 4. Get Project by ID — 404 Failure Case (Task B3)
```bash
curl http://localhost:5000/api/projects/doesnotexist
```

### 5. Submit Contact Form — Valid 201 Created (Task B4)
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Alice Johnson\",\"email\":\"alice@example.com\",\"message\":\"Hello Kanishk! Interested in collaboration.\"}"
```

### 6. Submit Contact Form — Validation Failure 400: Missing Name (Task B4)
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"\",\"email\":\"alice@example.com\",\"message\":\"Hello Kanishk! Missing name.\"}"
```

### 7. Submit Contact Form — Validation Failure 400: Invalid Email (Task B4)
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Bob\",\"email\":\"invalid-email-format\",\"message\":\"Hello Kanishk! Invalid email.\"}"
```

### 8. List All Submissions for Verification (Task B5)
```bash
curl http://localhost:5000/api/contact
```

### 9. Catch-All 404 Handler (Task B6)
```bash
curl http://localhost:5000/api/unsupported-endpoint
```

---

## 6. Frontend Integration Features

1. **Dynamic Projects Loading (`src/pages/Projects.jsx`)**:
   - `fetch` inside `useEffect` with dedicated `loading` spinner and `error` state with a retry button.
2. **Deep-Linked Project Details (`src/pages/ProjectDetail.jsx`)**:
   - Direct visits / refreshes on `/projects/:projectId` fetch individual project data from `GET /api/projects/:projectId` using `useParams()`.
   - Handles missing projects with an inline 404 message and link back to projects.
3. **Interactive Contact Form (`src/components/ContactForm.jsx`)**:
   - Sends payload via `POST /api/contact`.
   - Disables submit and displays sending state during request.
   - Surfaces server-side validation error messages in red banner upon HTTP 400.
   - Shows confirmation with submission ID and resets form upon HTTP 201.
4. **Theme & Routing Continuity**:
   - Dark/Light theme toggle with `localStorage` persistence (`ThemeContext.jsx`).
   - Shared responsive `Navbar` and `Footer` across routes.
