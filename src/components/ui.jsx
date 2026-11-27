/**
 * ui.jsx — shared primitive components
 * (inputs, modals, badges, avatar, empty state, page header)
 */
import { useEffect, useState } from "react";
import clsx from "clsx";
import { X, Loader2, Inbox, Eye, EyeOff } from "lucide-react";
import { avatarBg, initials, label as humanize } from "@/Helpers/formatters";
import { STATUS_COLORS } from "@/constants";

// ─── Form ─────────────────────────────────────────────────────────────────────
export function Field({ label, children, hint, className }) {
  return (
    <div className={className}>
      <label className="label">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

export function Input(props) {
  return <input {...props} className={clsx("input", props.className)} />;
}

export function PasswordInput({ className, ...props }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        {...props}
        type={show ? "text" : "password"}
        className={clsx("input pr-11", className)}
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-400 hover:text-ink"
        aria-label={show ? "Hide password" : "Show password"}
        tabIndex={-1}
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}

export function Textarea(props) {
  return <textarea rows={3} {...props} className={clsx("input", props.className)} />;
}

export function Select({ options, placeholder, ...props }) {
  return (
    <select {...props} className={clsx("input", props.className)}>
      {placeholder !== undefined && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

export const enumOptions = (values) =>
  values.map((v) => ({ value: v, label: humanize(v) }));

// ─── Modal ────────────────────────────────────────────────────────────────────
export function Modal({ open, onClose, title, children, wide }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
      onMouseDown={onClose}
    >
      <div
        className={clsx(
          "max-h-[95vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-pop sm:rounded-2xl",
          wide ? "sm:max-w-3xl" : "sm:max-w-lg",
        )}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pb-2 pt-5">
          <h2 className="text-lg font-semibold text-ink">{title}</h2>
          <button
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-6 pb-6 pt-2">{children}</div>
      </div>
    </div>
  );
}

export function ConfirmDialog({ open, onClose, onConfirm, title, message, busy }) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-sm text-slate-600">{message}</p>
      <div className="mt-5 flex justify-end gap-2">
        <button className="btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn-danger" onClick={onConfirm} disabled={busy}>
          {busy && <Loader2 size={16} className="animate-spin" />}
          Confirm
        </button>
      </div>
    </Modal>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
export function Badge({ value, className, solid }) {
  const palette = STATUS_COLORS[value] ?? { bg: "#F1F4F8", color: "#64748B" };
  if (solid)
    return (
      <span
        className={clsx("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold text-white", className)}
        style={{ background: palette.color }}
      >
        {humanize(value)}
      </span>
    );
  return (
    <span
      className={clsx("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[12px] font-semibold", className)}
      style={{ background: palette.bg, color: palette.color }}
    >
      {humanize(value)}
    </span>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
export function Avatar({ name, size = 32 }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-bold text-white select-none"
      style={{
        width: size,
        height: size,
        background: avatarBg(name ?? ""),
        fontSize: Math.round(size * 0.36),
      }}
    >
      {initials(name ?? "?")}
    </div>
  );
}

// ─── Misc ─────────────────────────────────────────────────────────────────────
export function Spinner({ className }) {
  return (
    <div className={clsx("flex items-center justify-center py-12 text-teal-600", className)}>
      <Loader2 className="animate-spin" />
    </div>
  );
}

export function Empty({ title, hint, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center">
      <div className="mb-3 rounded-full bg-mist p-3 text-slate-400">
        <Inbox size={22} />
      </div>
      <p className="text-sm font-medium text-slate-700">{title}</p>
      {hint && <p className="mt-1 max-w-sm text-xs text-slate-500">{hint}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-[26px] font-bold tracking-tight text-ink">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}
