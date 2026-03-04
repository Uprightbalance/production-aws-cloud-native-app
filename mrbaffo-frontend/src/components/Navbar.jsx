import { NavLink } from "react-router-dom";

const navLinkBase =
  "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150";
const navLinkActive = "bg-primary text-white";
const navLinkInactive = "text-slate-700 hover:bg-primary-light hover:text-white";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded bg-primary px-2 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              MR. BAFFO
            </span>
            <span className="hidden text-sm text-slate-600 sm:block">
              Dry Cleaning – Toronto
            </span>
          </div>
          <div className="flex space-x-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
              }
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
              }
            >
              Services
            </NavLink>
            <NavLink
              to="/areas"
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
              }
            >
              Service Areas
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/pickup"
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
              }
            >
              Pickup Request
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
