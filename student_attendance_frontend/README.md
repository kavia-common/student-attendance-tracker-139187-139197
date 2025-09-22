# Student Attendance Frontend (React)

Modern, responsive dashboard for teachers and administrators to mark attendance, view records, and generate reports.

## Quick Start

1. Backend URL:
   - Create `.env` file in this directory with:
     ```
     REACT_APP_BACKEND_URL=<YOUR_BACKEND_BASE_URL>
     ```
     Example:
     ```
     REACT_APP_BACKEND_URL=https://vscode-internal-28231-beta.beta01.cloud.kavia.ai:3001
     ```
   - If omitted, the app will call relative paths like `/login`, `/students`, etc.

2. Install dependencies and run:
   ```
   npm install
   npm start
   ```

3. Login (demo credentials from backend):
   - admin@example.com / admin123

## Features

- Ocean Professional theme (blue/amber accents, minimalist, rounded corners, subtle gradients)
- Auth: login with backend `/login` (JWT stored in localStorage)
- Layout: Header with brand and user, Sidebar navigation (Mark Attendance, Records, Reports)
- Mark Attendance: choose a date, set status per student, and Save All
- Records: filter by student, date, status
- Reports: summary counts and attendance rate for a date range and optional student
- REST API integration based on backend OpenAPI

## Environment variables

- REACT_APP_BACKEND_URL: Base URL of backend (e.g., https://your-backend-host)

## Implementation Notes

- JWT token stored in localStorage as `auth_token`. Email stored as `auth_email` for display.
- No external UI library; custom UI components for performance and simplicity.
- Responsive design: Sidebar adapts on smaller screens; content is scrollable and accessible.

