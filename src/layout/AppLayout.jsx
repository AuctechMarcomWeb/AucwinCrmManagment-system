import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppHeader }  from "@/components/AppHeader";
import { AppSidebar } from "@/components/AppSidebar";
import { AppContent } from "@/components/AppContent";
import { AppFooter }  from "@/components/AppFooter";
import { ScrollToTop } from "@/components/ScrollToTop";

/**
 * AppLayout — the main shell:
 *   ┌──────────┬──────────────────────────┐
 *   │ Sidebar  │ Header                   │
 *   │          ├──────────────────────────┤
 *   │          │ <Outlet />  (AppContent) │
 *   │          ├──────────────────────────┤
 *   │          │ Footer                   │
 *   └──────────┴──────────────────────────┘
 */
export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const loc = useLocation();

  // Close mobile sidebar on route change
  useEffect(() => { setSidebarOpen(false); }, [loc.pathname]);

  return (
    <div className="flex min-h-screen bg-mist">
      <ScrollToTop />

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-[264px] shrink-0 lg:block">
        <AppSidebar onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-ink-950/60 backdrop-blur-[2px]"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-[290px] shadow-pop">
            <AppSidebar onClose={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Right panel */}
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader onMenuClick={() => setSidebarOpen(true)} />
        <AppContent />
        <AppFooter />
      </div>
    </div>
  );
}
