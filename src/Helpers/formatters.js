import { format, formatDistanceToNow, isPast } from "date-fns";

/** "Nov 27, 2026" */
export const fmtDate = (d) =>
  d ? format(new Date(d), "MMM d, yyyy") : "—";

/** "Nov 27, 2026 · 3:45 PM" */
export const fmtDateTime = (d) =>
  d ? format(new Date(d), "MMM d, yyyy · h:mm a") : "—";

/** "2 days ago" */
export const fmtRelative = (d) =>
  d ? formatDistanceToNow(new Date(d), { addSuffix: true }) : "—";

/** Is date in the past? */
export const isOverdue = (d) => !!d && isPast(new Date(d));

/** "$48,600" */
export const money = (n, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(n ?? 0));

/** "some_key" → "Some Key" */
export const label = (s) =>
  String(s ?? "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

/** "acme corp" → "AC" */
export const initials = (name = "") =>
  name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

/** Deterministic avatar background from a name string */
export const avatarBg = (name = "") => {
  const palette = [
    "#0E7C86", "#16304F", "#6B4A9E",
    "#2F7D4A", "#B7791F", "#2A4466",
  ];
  const idx =
    [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % palette.length;
  return palette[idx];
};
