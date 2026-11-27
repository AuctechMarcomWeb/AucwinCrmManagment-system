import { TOKEN_KEY, API_URL } from "@/constants";

export class ApiError extends Error {
  constructor(message, status, code) {
    super(message);
    this.status = status;
    this.code   = code;
  }
}

function getToken() {
  try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
}

export async function request(method, path, { query, body, form } = {}) {
  let url = API_URL + path;

  if (query) {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== null && v !== "") qs.set(k, String(v));
    }
    const s = qs.toString();
    if (s) url += (url.includes("?") ? "&" : "?") + s;
  }

  const headers = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined && !form) headers["Content-Type"] = "application/json";

  let res;
  try {
    res = await fetch(url, {
      method,
      headers,
      body: form
        ? form
        : body !== undefined
          ? JSON.stringify(body)
          : undefined,
    });
  } catch {
    throw new ApiError(
      "Cannot reach the server. Check your internet connection.",
      0,
      "network",
    );
  }

  let data = null;
  const text = await res.text();
  if (text) {
    try { data = JSON.parse(text); } catch { data = text; }
  }

  if (!res.ok) {
    const msg = (data && data.error) || `Request failed (${res.status})`;
    throw new ApiError(msg, res.status, data?.code);
  }
  return data;
}

export const http = {
  get:    (path, query) => request("GET",    path, { query }),
  post:   (path, body)  => request("POST",   path, { body: body ?? {} }),
  patch:  (path, body)  => request("PATCH",  path, { body: body ?? {} }),
  del:    (path, body)  => request("DELETE", path, body !== undefined ? { body } : {}),
  upload: (path, form, query) => request("POST", path, { form, query }),
};

export const errMsg = (e) => {
  if (!e) return "Unknown error";
  if (typeof e === "string") return e;
  if (e.status === 403 && !e.message) return "You do not have permission to do that.";
  return e.message || "Something went wrong";
};
