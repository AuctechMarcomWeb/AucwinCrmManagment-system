import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { PLATFORM_NAV } from "@/layout/navConfig";

/**
 * Breadcrumb — auto-builds from the current URL path.
 * /tenants/42  →  Home › Tenants › Detail
 */
export function Breadcrumb() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-[13px] text-slate-500">
      <Link to="/" className="flex items-center gap-1 hover:text-ink">
        <Home size={13} />
        <span className="hidden sm:inline">Home</span>
      </Link>
      {segments.map((seg, i) => {
        const href  = "/" + segments.slice(0, i + 1).join("/");
        const nav   = PLATFORM_NAV.find((n) => n.to === "/" + seg);
        const crumb = nav ? nav.label : decodeURIComponent(seg);
        const last  = i === segments.length - 1;
        return (
          <span key={href} className="flex items-center gap-1">
            <ChevronRight size={13} className="text-slate-300" />
            {last ? (
              <span className="font-semibold text-ink">{crumb}</span>
            ) : (
              <Link to={href} className="hover:text-ink hover:underline">{crumb}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
