import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";

/**
 * Single nav item with active indicator, icon badge and optional count badge.
 */
export function AppSidebarNav({ m, count, onClick }) {
  const loc   = useLocation();
  const [path, query] = m.to.split("?");
  const queryActive   = query
    ? loc.pathname === path && loc.search.includes(query)
    : true;

  return (
    <NavLink
      to={m.to}
      onClick={onClick}
      end={m.to === "/"}
      className={({ isActive }) =>
        clsx(
          "group relative flex min-h-[38px] max-h-[50px] flex-1 items-center gap-3 rounded-xl px-2.5 py-1 text-[14px] font-semibold transition-colors",
          isActive && queryActive
            ? "bg-white/[.13] text-white"
            : "text-white/85 hover:bg-white/[.07] hover:text-white",
        )
      }
    >
      {({ isActive }) => {
        const on = isActive && queryActive;
        return (
          <>
            {on && (
              <span className="absolute -left-4 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-teal-400" />
            )}
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors"
              style={
                on
                  ? { background: "#12ACA2", color: "#fff" }
                  : { background: m.bg ?? "#EEF2F6", color: m.color ?? "#0F2F58" }
              }
            >
              <m.icon size={16} strokeWidth={2.3} />
            </span>
            <span className="flex-1 truncate">{m.label}</span>
            {!!count && (
              <span
                className={clsx(
                  "min-w-[22px] rounded-full px-1.5 py-0.5 text-center text-[11px] font-bold num",
                  on ? "bg-teal-500 text-white" : "bg-white/15 text-white",
                )}
              >
                {count > 99 ? "99+" : count}
              </span>
            )}
          </>
        );
      }}
    </NavLink>
  );
}
