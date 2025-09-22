const DEFAULT_BASE_URL = process.env.REACT_APP_BACKEND_URL || "";

function getBaseUrl() {
  // PUBLIC_INTERFACE
  /** Returns the base URL for the backend API pulled from env. */
  if (!DEFAULT_BASE_URL) {
    console.warn("REACT_APP_BACKEND_URL is not set. API calls will target relative paths.");
  }
  return DEFAULT_BASE_URL;
}

function getHeaders(includeAuth = true) {
  const headers = {
    "Content-Type": "application/json",
  };
  if (includeAuth) {
    const token = localStorage.getItem("auth_token");
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

// PUBLIC_INTERFACE
export async function apiGet(path, params = {}, includeAuth = true) {
  /** Perform a GET request to the backend API with optional query params. */
  const url = new URL(path, getBaseUrl() || window.location.origin);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") url.searchParams.append(k, v);
  });
  const res = await fetch(url.toString(), {
    method: "GET",
    headers: getHeaders(includeAuth),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `GET ${path} failed with ${res.status}`);
  }
  return res.json().catch(() => ({}));
}

// PUBLIC_INTERFACE
export async function apiPost(path, body = {}, includeAuth = true) {
  /** Perform a POST request to the backend API with JSON body. */
  const url = new URL(path, getBaseUrl() || window.location.origin);
  const res = await fetch(url.toString(), {
    method: "POST",
    headers: getHeaders(includeAuth),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `POST ${path} failed with ${res.status}`);
  }
  return res.json().catch(() => ({}));
}

// PUBLIC_INTERFACE
export async function apiPut(path, body = {}) {
  /** Perform a PUT request to the backend API with JSON body. */
  const url = new URL(path, getBaseUrl() || window.location.origin);
  const res = await fetch(url.toString(), {
    method: "PUT",
    headers: getHeaders(true),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `PUT ${path} failed with ${res.status}`);
  }
  return res.json().catch(() => ({}));
}

// PUBLIC_INTERFACE
export async function apiDelete(path) {
  /** Perform a DELETE request to the backend API. */
  const url = new URL(path, getBaseUrl() || window.location.origin);
  const res = await fetch(url.toString(), {
    method: "DELETE",
    headers: getHeaders(true),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `DELETE ${path} failed with ${res.status}`);
  }
  return res.json().catch(() => ({}));
}

// PUBLIC_INTERFACE
export async function login(email, password) {
  /** Call login endpoint to retrieve JWT token. */
  const data = await apiPost("/login", { email, password }, false);
  if (data && (data.token || data.accessToken)) {
    localStorage.setItem("auth_token", data.token || data.accessToken);
  }
  return data;
}

// PUBLIC_INTERFACE
export function logout() {
  /** Clear auth token and session data. */
  localStorage.removeItem("auth_token");
}

// PUBLIC_INTERFACE
export async function listStudents() {
  /** List all students. */
  return apiGet("/students");
}

// PUBLIC_INTERFACE
export async function listAttendance(filters = {}) {
  /** List attendance records with optional filters: studentId, date, status */
  return apiGet("/attendance", filters);
}

// PUBLIC_INTERFACE
export async function markAttendance({ studentId, date, status, notes }) {
  /** Create a new attendance record. */
  return apiPost("/attendance", { studentId, date, status, notes });
}

// PUBLIC_INTERFACE
export async function getSummaryReport(params = {}) {
  /** Get attendance summary for date range and optional studentId */
  return apiGet("/reports/summary", params);
}
