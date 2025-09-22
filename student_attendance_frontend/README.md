# Student Attendance Frontend (React)

Modern, responsive dashboard for teachers and administrators to mark attendance, view records, and generate reports.

## Run locally

1. Set backend URL (or use relative paths if served from the same origin):
   - Create `.env` file in this folder and set:
     ```
     REACT_APP_BACKEND_URL=https://vscode-internal-25004-beta.beta01.cloud.kavia.ai:3001
     ```
   If omitted, the app will call relative paths like `/login`, `/students`, etc.

2. Install and start:
   ```
   npm install
   npm start
   ```

## Features

- Ocean Professional theme (blue/amber accents, minimalist, rounded corners, subtle gradients)
- Auth: login with backend `/login` (demo: admin@example.com / admin123)
- Sidebar navigation: Mark Attendance, Records, Reports
- Mark Attendance: selectable status per student and Save All
- Records: filter by student, date, status
- Reports: summary counts and attendance rate with date range
- API integration with backend REST (OpenAPI-driven)

## Environment variables

- REACT_APP_BACKEND_URL: Base URL of backend (e.g., https://your-backend-host)

## Notes

- JWT token stored in localStorage as `auth_token`. Email stored as `auth_email` for display.
- No external UI library; small, custom components for performance.

