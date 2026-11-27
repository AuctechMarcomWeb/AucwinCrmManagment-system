/**
 * SchoolHeader (PlatformHeader) — the branded page-level heading
 * used at the top of every module page.
 *
 * Usage:
 *   <SchoolHeader
 *     moduleKey="tenants"
 *     title="Tenants"
 *     subtitle="128 active organisations"
 *     actions={<button>New tenant</button>}
 *   />
 */
import { PLATFORM_NAV } from "@/layout/navConfig";

export function SchoolHeader({ moduleKey, title, subtitle, actions }) {
  const m = PLATFORM_NAV.find((x) => x.key === moduleKey);
  if (!m) return null;
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-card ring-1 ring-black/[.03]"
          style={{ background: m.bg, color: m.color }}
        >
          <m.icon size={23} strokeWidth={2.2} />
        </span>
        <div className="min-w-0">
          <h1 className="text-[26px] font-extrabold tracking-tight text-ink">
            {title ?? m.label}
          </h1>
          {subtitle && (
            <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>
          )}
        </div>
      </div>
      {actions && (
        <div className="flex flex-wrap gap-2">{actions}</div>
      )}
    </div>
  );
}
