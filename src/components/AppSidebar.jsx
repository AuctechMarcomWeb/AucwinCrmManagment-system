import { Link, useNavigate } from "react-router-dom";
import { LogOut, X } from "lucide-react";
import { useAuth } from "@/Context/AuthContext";
import { PLATFORM_NAV, NAV_SECTIONS } from "@/layout/navConfig";
import { AppSidebarNav } from "./AppSidebarNav";
import { Avatar } from "./ui";

function SectionLabel({ children }) {
  return (
    <p className="mb-0.5 mt-3 shrink-0 px-2.5 text-[10.5px] font-bold uppercase tracking-[.14em] text-[#9FB3CC]">
      {children}
    </p>
  );
}

/**
 * AppSidebar — the left navigation drawer.
 * @param {{ onClose: () => void }} props
 */
export function AppSidebar({ onClose }) {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col bg-ink">
      {/* ── Logo row ── */}
      <div className="flex items-center justify-between px-6 pb-3 pt-5">
        <Link to="/" aria-label="AucWin home" onClick={onClose}>
          <div className="flex items-center gap-2.5">
            <img src="/brand/aucwin-mark-white.png" alt="" className="h-7 w-auto select-none" draggable={false} />
            <img src="/brand/aucwin-name-white.png" alt="AucWin" className="h-[22px] w-auto select-none" draggable={false} />
          </div>
        </Link>
        <button
          className="rounded-lg p-1 text-white/60 hover:text-white lg:hidden"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      {/* ── Platform badge ── */}
      <div className="mx-4 mb-2 rounded-xl bg-teal-600/20 px-3 py-1.5 ring-1 ring-teal-500/25">
        <p className="text-[10.5px] font-extrabold uppercase tracking-widest text-teal-300">
          Platform Management
        </p>
      </div>

      {/* ── Nav ── */}
      <nav className="flex flex-1 flex-col gap-px overflow-y-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title}>
            <SectionLabel>{section.title}</SectionLabel>
            {section.keys.map((key) => {
              const m = PLATFORM_NAV.find((n) => n.key === key);
              if (!m) return null;
              return (
                <AppSidebarNav key={m.key} m={m} onClick={onClose} />
              );
            })}
          </div>
        ))}
      </nav>

      {/* ── User card ── */}
      <div className="m-3 mt-1 flex items-center gap-3 rounded-2xl bg-white/[.08] p-2.5 ring-1 ring-white/10">
        <Avatar name={profile?.full_name} size={36} />
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-bold text-white">{profile?.full_name ?? "Admin"}</div>
          <div className="truncate text-[11.5px] text-[#B8C7DA]">Platform Admin</div>
        </div>
        <button
          title="Sign out"
          aria-label="Sign out"
          className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
          onClick={async () => { await signOut(); navigate("/login"); }}
        >
          <LogOut size={15} />
        </button>
      </div>
    </div>
  );
}
