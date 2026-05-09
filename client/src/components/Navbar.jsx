// components/Navbar.jsx
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/authSlice";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <header className="sticky top-0 z-10 border-b border-stone-300/70 bg-stone-100/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-5 py-4 sm:px-8">
        <Link to="/" className="group">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-stone-500">
            Studio
          </p>
          <h1 className="text-lg font-semibold text-stone-950">
            Notes App
          </h1>
        </Link>

        <div className="flex items-center gap-3">
          <nav className="flex items-center rounded-full border border-stone-300/80 bg-stone-50/70 p-1 shadow-sm">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-stone-900 text-stone-50"
                    : "text-stone-600 hover:text-stone-950"
                }`
              }
            >
              Home
            </NavLink>

            {user?.role === "admin" && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-stone-900 text-stone-50"
                      : "text-stone-600 hover:text-stone-950"
                  }`
                }
              >
                Admin
              </NavLink>
            )}
          </nav>

          <div className="hidden border-l border-stone-300 pl-4 text-right sm:block">
            <p className="max-w-44 truncate text-sm font-medium text-stone-800">
              {user?.email}
            </p>
            <p className="text-xs capitalize text-stone-500">
              {user?.role}
            </p>
          </div>

          <button
            onClick={() => {
              dispatch(logoutUser())
              navigate('/')
          }}
            className="rounded-full border border-stone-300 bg-stone-50 px-4 py-2 text-sm font-medium text-stone-700 shadow-sm transition hover:border-stone-400 hover:bg-white hover:text-stone-950"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
