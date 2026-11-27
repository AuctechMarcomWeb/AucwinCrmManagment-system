import { useLocation } from "react-router-dom";
import { PLATFORM_NAV } from "@/layout/navConfig";

/**
 * CurrentLocationField — shows the current page name + breadcrumb path
 * in a small styled chip. Useful inside headers or debug toolbars.
 */
export function CurrentLocationField({ className }) {
  const { pathname } = useLocation();
  const matched = PLATFORM_NAV.find((n) => n.to === pathname);
  if (!matched) return null;
  return (
    <div className={className}>
      <span
        className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-[13px] font-semibold"
        style={{ background: matched.bg, color: matched.color }}
      >
        <matched.icon size={14} strokeWidth={2.4} />
        {matched.label}
      </span>
    </div>
  );
}
