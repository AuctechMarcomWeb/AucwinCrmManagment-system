/**
 * header/index.jsx
 *
 * A generic section-level header used inside pages
 * (not the sticky AppHeader — that's AppHeader.jsx).
 *
 * Usage:
 *   <SectionHeader
 *     title="Recent Invoices"
 *     subtitle="Last 30 days"
 *     action={<button>See all</button>}
 *   />
 */
export function SectionHeader({ title, subtitle, action, border = false }) {
  return (
    <div
      className={
        "flex items-start justify-between gap-3 " +
        (border ? "border-b border-mist-2 pb-3 mb-4" : "mb-4")
      }
    >
      <div>
        <h2 className="text-[16px] font-bold text-ink">{title}</h2>
        {subtitle && <p className="mt-0.5 text-[13px] text-slate-500">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
