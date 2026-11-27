// ─── API ──────────────────────────────────────────────────────────────────────
export const API_URL =
  (import.meta.env.VITE_API_URL || "").replace(/\/$/, "") ||
  (typeof window !== "undefined" ? window.location.origin : "");

export const TOKEN_KEY = "aucwin.mgmt.token";

// ─── Tenant ───────────────────────────────────────────────────────────────────
export const TENANT_STATUSES = ["active", "trial", "suspended", "expired"];

export const PLANS = ["Starter", "Growth", "Pro", "Enterprise"];

export const PLAN_COLORS = {
  Starter:    { bg: "#F1F4F8", color: "#64748B" },
  Growth:     { bg: "#E8F7F6", color: "#0B857D" },
  Pro:        { bg: "#E0E7FF", color: "#4F46E5" },
  Enterprise: { bg: "#F3E8FF", color: "#7C3AED" },
};

// ─── Billing ──────────────────────────────────────────────────────────────────
export const INVOICE_STATUSES   = ["draft", "sent", "paid", "overdue", "void"];
export const PLAN_INTERVALS     = ["monthly", "quarterly", "yearly"];

// ─── Support ──────────────────────────────────────────────────────────────────
export const TICKET_STATUSES    = ["open", "in_progress", "resolved", "closed"];
export const TICKET_PRIORITIES  = ["low", "medium", "high", "urgent"];

// ─── Users ────────────────────────────────────────────────────────────────────
export const USER_ROLES         = ["super_admin", "admin", "employee"];

// ─── Announcements ────────────────────────────────────────────────────────────
export const ANNOUNCEMENT_TYPES = ["info", "warning", "maintenance", "feature"];

// ─── Status color maps ────────────────────────────────────────────────────────
export const STATUS_COLORS = {
  // tenant
  active:     { bg: "#DCFCE7", color: "#16A34A" },
  trial:      { bg: "#DBEAFE", color: "#2563EB" },
  suspended:  { bg: "#FEF3C7", color: "#D97706" },
  expired:    { bg: "#FFE4E6", color: "#E11D48" },
  // invoice
  draft:      { bg: "#F1F4F8", color: "#64748B" },
  sent:       { bg: "#DBEAFE", color: "#2563EB" },
  paid:       { bg: "#DCFCE7", color: "#16A34A" },
  overdue:    { bg: "#FFE4E6", color: "#E11D48" },
  void:       { bg: "#F1F4F8", color: "#94A3B8" },
  // ticket
  open:       { bg: "#DBEAFE", color: "#2563EB" },
  in_progress:{ bg: "#E0F2FE", color: "#0284C7" },
  resolved:   { bg: "#DCFCE7", color: "#16A34A" },
  closed:     { bg: "#F1F4F8", color: "#64748B" },
  // priority
  low:        { bg: "#F1F4F8", color: "#94A3B8" },
  medium:     { bg: "#FEF3C7", color: "#D97706" },
  high:       { bg: "#FFE4E6", color: "#E11D48" },
  urgent:     { bg: "#450A0A", color: "#FCA5A5" },
};

// ─── Nav sections ─────────────────────────────────────────────────────────────
export const NAV_SECTIONS = {
  OVERVIEW:  "Overview",
  TENANTS:   "Tenants",
  BILLING:   "Billing",
  PLATFORM:  "Platform",
};
