import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import { AuthProvider }  from "@/Context/AuthContext";
import { ThemeProvider } from "@/Context/ThemeContext";
import AppLayout         from "@/layout/AppLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Pages
import Login         from "@/pages/Login";
import Dashboard     from "@/pages/Dashboard";
import Tenants       from "@/pages/Tenants";
import TenantDetail  from "@/pages/TenantDetail";
import Users         from "@/pages/Users";
import Plans         from "@/pages/Plans";
import Subscriptions from "@/pages/Subscriptions";
import Invoices      from "@/pages/Invoices";
import Modules       from "@/pages/Modules";
import Announcements from "@/pages/Announcements";
import Support       from "@/pages/Support";
import AuditLog      from "@/pages/AuditLog";
import Notifications from "@/pages/Notifications";
import Settings      from "@/pages/Settings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 15_000, retry: 1, refetchOnWindowFocus: true },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              {/* Public */}
              <Route path="/login" element={<Login />} />

              {/* Protected — all inside the shell layout */}
              <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                  <Route index            element={<Dashboard />} />
                  <Route path="tenants"   element={<Tenants />} />
                  <Route path="tenants/:id" element={<TenantDetail />} />
                  <Route path="users"     element={<Users />} />
                  <Route path="plans"     element={<Plans />} />
                  <Route path="subscriptions" element={<Subscriptions />} />
                  <Route path="invoices"  element={<Invoices />} />
                  <Route path="modules"   element={<Modules />} />
                  <Route path="announcements" element={<Announcements />} />
                  <Route path="support"   element={<Support />} />
                  <Route path="audit"     element={<AuditLog />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="settings"  element={<Settings />} />
                  {/* Catch-all */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
          <Toaster position="bottom-right" toastOptions={{ style: { fontSize: 14 } }} />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
