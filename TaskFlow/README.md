# TaskFlow

**Plan better. Work smarter.**

TaskFlow is a full-stack task management application built as an internship capstone project. Users can register, log in, and manage their own tasks through a clean, modern dashboard. Every user can only see and modify their own tasks — the backend enforces this on every request.

---

## Features

- Register / Login / Logout with JWT authentication
- Passwords hashed with bcrypt, never stored or returned in plain text
- Protected routes on both frontend (route guards) and backend (auth middleware)
- Full task CRUD: create, list, view details, edit, delete
- Ownership enforcement — a user cannot read/edit/delete another user's task, even by guessing an ID
- Search by title, filter by status and priority
- Dashboard with live stats (total / pending / in progress / completed), recent tasks, and high-priority tasks
- Loading, empty, and error states throughout
- Responsive design for desktop, tablet, and mobile
- Centralized backend error handling with consistent JSON responses
- Automated backend tests (Jest + Supertest) covering auth and task happy/error paths

---

## Tech Stack

**Frontend:** Angular 18 (standalone components), TypeScript, Angular Router, Reactive Forms, Signals, RxJS, HttpClient, Route Guards, HTTP Interceptor, Angular Material

**Backend:** Node.js, Express.js, JWT, bcrypt, express-validator, centralized error handling, CORS, dotenv

**Database:** MongoDB (MongoDB Atlas compatible) with Mongoose

**Testing:** Jest + Supertest

**Deployment target:** Render (frontend static site + backend web service) + MongoDB Atlas

---

## Project Structure

```
TaskFlow/
├── frontend/                     Angular app
│   └── src/app/
│       ├── core/
│       │   ├── guards/            authGuard, guestGuard
│       │   ├── interceptors/      authInterceptor (attaches JWT, handles 401)
│       │   ├── services/          AuthService, TaskService
│       │   └── models/            TypeScript interfaces
│       ├── shared/components/     navbar, badge, confirm-dialog
│       └── features/
│           ├── auth/              login, register
│           ├── dashboard/
│           └── tasks/             task-list, task-form, task-details
│
├── backend/                      Express API
│   ├── src/
│   │   ├── config/db.js           MongoDB connection
│   │   ├── controllers/           authController, taskController
│   │   ├── middleware/            auth (JWT check), errorHandler
│   │   ├── models/                User, Task
│   │   ├── routes/                authRoutes, taskRoutes
│   │   ├── validators/            express-validator rules
│   │   ├── seed.js                creates demo account + sample tasks
│   │   ├── app.js                 Express app (exported for tests)
│   │   └── server.js              starts the server
│   ├── tests/                     auth.test.js, task.test.js
│   └── .env.example
│
└── README.md
```

---

## Architecture, in plain language

The **frontend** talks to the **backend** only through HTTP calls to a REST API — it never touches the database directly. When a user logs in, the backend hands back a JWT (a signed token). The frontend stores that token and an interceptor automatically attaches it to every future request as an `Authorization: Bearer <token>` header. On the backend, a middleware function checks that token on every protected route, and only lets the request through if it's valid — it also stamps the request with the logged-in user's ID, so controllers always know who's asking. That's how the "you can only see your own tasks" rule is enforced: every task query and update is scoped to `req.user.id`, not just filtered on the frontend.

---

## Prerequisites

- Node.js 18+ and npm
- A MongoDB Atlas account (free tier is enough) — or a local MongoDB instance
- Git

---

## Installation & Local Setup

### 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Open `backend/.env` and fill in:

```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:4200
```

Then start the backend:

```bash
npm run dev
```

Backend runs at **http://localhost:5000**. Verify it's alive:

```bash
curl http://localhost:5000/api/health
```

### 2. Frontend setup

```bash
cd frontend
npm install
ng serve
```

Frontend runs at **http://localhost:4200**.

---

## MongoDB Atlas Setup

1. Go to https://cloud.mongodb.com and create a free account/project.
2. Create a free (M0) cluster.
3. Under **Database Access**, create a database user with a username/password.
4. Under **Network Access**, add your IP (or `0.0.0.0/0` for quick local testing — restrict this for production).
5. Click **Connect → Drivers**, copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/taskflow?retryWrites=true&w=majority
   ```
6. Paste that into `MONGODB_URI` in `backend/.env` (replace `<username>` and `<password>` with your real values, and make sure a database name like `taskflow` is included in the path).

---

## Environment Variables Reference

**backend/.env**
| Variable | Description |
|---|---|
| `PORT` | Port the API listens on (default 5000) |
| `MONGODB_URI` | Your MongoDB Atlas (or local) connection string |
| `JWT_SECRET` | Any long random string used to sign JWTs — keep it secret |
| `JWT_EXPIRES_IN` | Token lifetime, e.g. `7d` |
| `CLIENT_URL` | Frontend origin, used for CORS |

**frontend/src/environments/environment.prod.ts**
| Variable | Description |
|---|---|
| `apiUrl` | Your deployed backend's API URL, e.g. `https://taskflow-api.onrender.com/api` |

`environment.ts` (dev) already points at `http://localhost:5000/api` and needs no changes for local development.

---

## Running Tests

```bash
cd backend
npm test
```

This runs 12 tests covering: successful/duplicate registration, password mismatch, successful/invalid login, unauthenticated access blocked, task creation, task listing, 404 for missing tasks, 403 when accessing another user's task, and task deletion.

---

## Demo Data

To populate a demo account with sample tasks (useful for showing the dashboard):

```bash
cd backend
npm run seed
```

This creates (or reuses) an account and prints the credentials:

```
Email: demo@taskflow.com
Password: Demo@123
```

Requires `MONGODB_URI` in `.env` to be pointed at a real database first.

---

## API Endpoints

**Auth**
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in, returns a JWT |
| GET | `/api/auth/me` | Get the current logged-in user (requires token) |

**Tasks** (all require `Authorization: Bearer <token>`)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | List your tasks. Supports `?status=`, `?priority=`, `?search=` |
| GET | `/api/tasks/:id` | Get one task (must be yours) |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task (must be yours) |
| DELETE | `/api/tasks/:id` | Delete a task (must be yours) |

**Health**
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Returns `{ success: true, message: "TaskFlow API is running" }` |

All responses follow the shape `{ success, message, data }` on success, or `{ success: false, message }` on error.

---

## Deployment

### Backend → Render (Web Service)

1. Push this repo to GitHub.
2. In Render, click **New → Web Service**, connect your repo.
3. Set **Root Directory** to `backend`.
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables (same as your `.env`): `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CLIENT_URL` (set this to your deployed frontend URL once you have it), and leave `PORT` unset — Render sets it automatically and the app already reads `process.env.PORT`.
7. Deploy. Confirm `https://your-service.onrender.com/api/health` responds.

### Frontend → Render (Static Site)

1. In Render, click **New → Static Site**, connect the same repo.
2. Set **Root Directory** to `frontend`.
3. Build command: `npm install && npm run build`
4. Publish directory: `dist/frontend/browser`
5. Before deploying, update `frontend/src/environments/environment.prod.ts` with your actual Render backend URL, commit, and push.
6. **Rewrite rule** (required for Angular routing to work on refresh/deep links): add a rewrite rule of `/*` → `/index.html` in Render's Static Site "Redirects/Rewrites" settings.
7. Deploy, then update the backend's `CLIENT_URL` env var to this frontend's URL and redeploy the backend so CORS allows it.

---

## Git Commands to Push

```bash
git init
git add .
git commit -m "TaskFlow: full-stack task management app"
git branch -M main
git remote add origin https://github.com/<your-username>/taskflow.git
git push -u origin main
```

---

## Troubleshooting

- **CORS error in browser console**: Make sure `CLIENT_URL` in the backend's env matches your frontend's exact URL (no trailing slash).
- **401 on every request**: Token missing or expired — log out and log back in. Check that `JWT_SECRET` is set in the backend.
- **Angular routes 404 on refresh (after deploy)**: You're missing the `/*` → `/index.html` rewrite rule on Render's static site.
- **MongoDB connection fails**: Double-check the username/password in `MONGODB_URI` and that your IP (or `0.0.0.0/0`) is allowed in Atlas Network Access.
- **npm install fails on Angular Material peer deps**: Make sure Node.js is 18+.

---

## Future Improvements

- Pagination for large task lists
- Task categories/tags
- Email verification and password reset
- Dark mode
- Drag-and-drop status updates (kanban view)

---

## Screenshots

_(Add screenshots here after running the app locally)_
