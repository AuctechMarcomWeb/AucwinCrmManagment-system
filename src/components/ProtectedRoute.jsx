import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";
import { LoadingScreen } from "./Loading";

/**
 * Redirects to /login if not authenticated.
 * Shows a full-screen spinner while auth state is loading.
 */
export function ProtectedRoute() {
  const { session, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!session) return <Navigate to="/login" replace />;
  return <Outlet />;
}
