import { Outlet } from "react-router-dom";

/**
 * AppContent — the scrollable main area that hosts all page routes.
 */
export function AppContent() {
  return (
    <main className="w-full min-w-0 flex-1 p-4 sm:p-5 lg:px-7 lg:py-6">
      <Outlet />
    </main>
  );
}
