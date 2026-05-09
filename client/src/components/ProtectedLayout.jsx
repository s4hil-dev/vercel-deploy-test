// components/ProtectedLayout.jsx
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

export default function ProtectedLayout() {
  const { user, initialized, loading } = useSelector(state => state.auth);

  if (!initialized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="border border-stone-300/80 bg-stone-50/80 px-6 py-5 shadow-sm">
          <p className="text-sm tracking-wide text-stone-600">Checking session...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen text-stone-900">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 lg:py-12">
        <Outlet />
      </main>
    </div>
  );
}
