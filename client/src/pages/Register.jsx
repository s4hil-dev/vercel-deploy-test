import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/authSlice";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(state => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "user"
  });

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await dispatch(registerUser(form));
      navigate("/login");
    } catch {
      // Error is already shown from Redux state.
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-5xl overflow-hidden border border-stone-300/80 bg-stone-50/80 shadow-2xl shadow-stone-300/40 backdrop-blur">
        <div className="grid min-h-155 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="relative hidden overflow-hidden border-r border-stone-300/70 bg-stone-900 p-10 text-stone-50 lg:block">
            <div className="absolute inset-0 opacity-70">
              <div className="h-full w-full bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(35deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size[42px_42px]" />
            </div>
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.34em] text-stone-400">
                  Private notebook
                </p>
                <h1 className="mt-8 max-w-md text-5xl font-semibold leading-tight">
                  Create your quiet workspace.
                </h1>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="border border-stone-600/70 bg-stone-800/50 p-5">
                  <p className="text-sm text-stone-400">Onboarding</p>
                  <p className="mt-2 text-2xl font-semibold">Fast</p>
                </div>
                <div className="border border-stone-600/70 bg-stone-800/50 p-5">
                  <p className="text-sm text-stone-400">Account</p>
                  <p className="mt-2 text-2xl font-semibold">Secure</p>
                </div>
              </div>
            </div>
          </section>

          <section className="flex items-center justify-center px-6 py-10 sm:px-12">
            <div className="w-full max-w-sm">
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-stone-500">
                New here
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-stone-950">
                Create account
              </h2>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                Register with your email and password to start writing notes.
              </p>

              <div className="mt-8 space-y-4">
                <input
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  className="w-full border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-700 focus:ring-4 focus:ring-stone-300/40"
                />

                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="w-full border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-700 focus:ring-4 focus:ring-stone-300/40"
                />

                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-700 focus:ring-4 focus:ring-stone-300/40"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-stone-950 px-4 py-3 font-medium text-stone-50 shadow-lg shadow-stone-300/60 transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-400"
                >
                  {loading ? "Creating account..." : "Register"}
                </button>
              </div>

              {error && (
                <p className="mt-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              )}

              <p className="mt-6 text-sm text-stone-600">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-stone-900 underline underline-offset-4">
                  Sign in
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
