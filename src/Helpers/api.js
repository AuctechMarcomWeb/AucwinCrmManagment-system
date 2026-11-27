import { http } from "./http";

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const login  = (email, password) => http.post("/api/auth/login", { email, password });
export const getMe  = ()                 => http.get("/api/auth/me");

// ─── Platform ─────────────────────────────────────────────────────────────────
export const getPlatformStats = () => http.get("/api/platform/stats");

// ─── Tenants ──────────────────────────────────────────────────────────────────
export const getTenants      = (q)        => http.get("/api/tenants", q);
export const getTenant       = (id)       => http.get(`/api/tenants/${id}`);
export const createTenant    = (body)     => http.post("/api/tenants", body);
export const updateTenant    = (id, body) => http.patch(`/api/tenants/${id}`, body);
export const deleteTenant    = (id)       => http.del(`/api/tenants/${id}`);
export const suspendTenant   = (id)       => http.post(`/api/tenants/${id}/suspend`);
export const activateTenant  = (id)       => http.post(`/api/tenants/${id}/activate`);

// ─── Tenant Users ─────────────────────────────────────────────────────────────
export const getTenantUsers         = (tid, q)       => http.get(`/api/tenants/${tid}/users`, q);
export const createTenantUser       = (tid, body)    => http.post(`/api/tenants/${tid}/users`, body);
export const updateTenantUser       = (tid, uid, b)  => http.patch(`/api/tenants/${tid}/users/${uid}`, b);
export const deleteTenantUser       = (tid, uid)     => http.del(`/api/tenants/${tid}/users/${uid}`);
export const resetTenantUserPass    = (tid, uid, b)  => http.post(`/api/tenants/${tid}/users/${uid}/reset-password`, b);

// ─── Plans ────────────────────────────────────────────────────────────────────
export const getPlans    = ()        => http.get("/api/plans");
export const createPlan  = (body)    => http.post("/api/plans", body);
export const updatePlan  = (id, b)   => http.patch(`/api/plans/${id}`, b);
export const deletePlan  = (id)      => http.del(`/api/plans/${id}`);

// ─── Subscriptions ────────────────────────────────────────────────────────────
export const getSubscriptions   = (q)        => http.get("/api/subscriptions", q);
export const updateSubscription = (tid, b)   => http.patch(`/api/tenants/${tid}/subscription`, b);

// ─── Invoices ─────────────────────────────────────────────────────────────────
export const getInvoices       = (q)        => http.get("/api/invoices", q);
export const getTenantInvoices = (tid)      => http.get(`/api/tenants/${tid}/invoices`);
export const createInvoice     = (body)     => http.post("/api/invoices", body);
export const updateInvoice     = (id, b)    => http.patch(`/api/invoices/${id}`, b);

// ─── Module / Feature Flags ───────────────────────────────────────────────────
export const getTenantModules    = (tid)     => http.get(`/api/tenants/${tid}/modules`);
export const updateTenantModules = (tid, b)  => http.patch(`/api/tenants/${tid}/modules`, b);

// ─── Announcements ────────────────────────────────────────────────────────────
export const getAnnouncements    = (q)       => http.get("/api/announcements", q);
export const createAnnouncement  = (body)    => http.post("/api/announcements", body);
export const updateAnnouncement  = (id, b)   => http.patch(`/api/announcements/${id}`, b);
export const deleteAnnouncement  = (id)      => http.del(`/api/announcements/${id}`);

// ─── Audit Logs ───────────────────────────────────────────────────────────────
export const getAuditLogs = (q) => http.get("/api/audit-logs", q);

// ─── Support Tickets ──────────────────────────────────────────────────────────
export const getSupportTickets  = (q)       => http.get("/api/support/tickets", q);
export const getSupportTicket   = (id)      => http.get(`/api/support/tickets/${id}`);
export const updateSupportTicket= (id, b)   => http.patch(`/api/support/tickets/${id}`, b);
export const replySupportTicket = (id, b)   => http.post(`/api/support/tickets/${id}/reply`, b);

// ─── Platform Settings ────────────────────────────────────────────────────────
export const getPlatformSettings    = ()     => http.get("/api/platform/settings");
export const updatePlatformSettings = (b)    => http.patch("/api/platform/settings", b);
