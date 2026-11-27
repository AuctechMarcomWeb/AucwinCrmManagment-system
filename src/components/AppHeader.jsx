import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, ChevronDown, KeyRound, LogOut, Menu, Search, Settings, UserRound } from "lucide-react";
import clsx from "clsx";
import { useAuth } from "@/Context/AuthContext";
import { useOutsideClick } from "@/Hooks/useOutsideClick";
import { Avatar } from "./ui";
import { label } from "@/Helpers/formatters";

/** Top notification bell with a red dot. */
function NotificationBell() {
  return (
    <Link
      to="/notifications"
      className="relative flex h-9 w-9 items-center justify-center rounded-xl text-white/70 transition hover:bg-white/10 hover:text-white"
      aria-label="Notifications"
    >
      <Bell size={18} />
      <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-ink" />
    </Link>
  );
}

/** Global search bar — Ctrl+K shortcut. */
function GlobalSearch() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const ref = useRef(null);

  return (
    <form
      role="search"
      className="relative hidden w-full max-w-sm md:block"
      onSubmit={(e) => {
        e.preventDefault();
        if (!q.trim()) return;
        navigate(`/tenants?q=${encodeURIComponent(q.trim())}`);
        setQ("");
        ref.current?.blur();
      }}
    >
      <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9FB3CC]" />
      <input
        ref={ref}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search tenants, users…"
        className="w-full rounded-xl border border-white/10 bg-white/[.08] py-2 pl-9 pr-14 text-sm text-white placeholder:text-[#9FB3CC] transition hover:bg-white/[.12] focus:border-teal-400 focus:bg-white/[.14] focus:outline-none focus:ring-4 focus:ring-teal-500/20"
      />
      <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-white/15 bg-white/10 px-1.5 py-0.5 text-[10px] font-bold text-[#B8C7DA]">
        Ctrl K
      </kbd>
    </form>
  );
}

/** Avatar + name dropdown menu. */
function UserMenu() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOutsideClick(ref, () => setOpen(false));

  const go = (to) => { setOpen(false); navigate(to); };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 rounded-xl py-1 pl-1 pr-2 transition hover:bg-white/10"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Avatar name={profile?.full_name} size={34} />
        <span className="hidden text-left sm:block">
          <span className="block max-w-[150px] truncate text-[13px] font-bold text-white leading-tight">
            {profile?.full_name ?? "Admin"}
          </span>
          <span className="block text-[11px] text-[#B8C7DA] leading-tight">
            {label(profile?.role ?? "")}
          </span>
        </span>
        <ChevronDown size={14} className={clsx("text-[#B8C7DA] transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-60 overflow-hidden rounded-2xl border border-mist-2 bg-white shadow-pop"
        >
          <div className="border-b border-mist-2 px-4 py-3">
            <p className="truncate text-sm font-bold text-ink">{profile?.full_name}</p>
            <p className="truncate text-xs text-slate-500">{profile?.email}</p>
            <span className="mt-1 inline-flex rounded-full bg-teal-50 px-2 py-0.5 text-[11px] font-bold text-teal-700">
              Platform Admin
            </span>
          </div>
          <div className="p-1.5">
            {[
              { icon: UserRound, label: "My profile",       to: "/settings?tab=profile"   },
              { icon: KeyRound,  label: "Change password",  to: "/settings?tab=security"  },
              { icon: Settings,  label: "Settings",         to: "/settings"               },
            ].map((item) => (
              <button
                key={item.label}
                role="menuitem"
                onClick={() => go(item.to)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-mist hover:text-ink"
              >
                <item.icon size={15} className="text-slate-400" />
                {item.label}
              </button>
            ))}
          </div>
          <div className="border-t border-mist-2 p-1.5">
            <button
              role="menuitem"
              onClick={async () => { setOpen(false); await signOut(); navigate("/login"); }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-50"
            >
              <LogOut size={15} />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * AppHeader — sticky top bar.
 * @param {{ onMenuClick: () => void }} props
 */
export function AppHeader({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-white/10 bg-ink px-4 shadow-[0_6px_20px_-12px_rgba(15,47,88,.6)] sm:px-5 lg:px-7">
      {/* Mobile hamburger */}
      <button
        className="rounded-lg p-2 text-white/80 hover:bg-white/10 hover:text-white lg:hidden"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Logo (mobile only — desktop shows it in sidebar) */}
      <Link to="/" className="lg:hidden" aria-label="Home">
        <img src="/brand/aucwin-mark-white.png" alt="AucWin" className="h-7 w-auto" draggable={false} />
      </Link>

      <GlobalSearch />

      <div className="ml-auto flex items-center gap-2">
        <NotificationBell />
        <span className="hidden h-7 w-px bg-white/15 sm:block" />
        <UserMenu />
      </div>
    </header>
  );
}
