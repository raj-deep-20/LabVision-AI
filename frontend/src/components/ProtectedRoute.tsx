import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { loading, user } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-300 font-mono text-sm">Restoring session...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
