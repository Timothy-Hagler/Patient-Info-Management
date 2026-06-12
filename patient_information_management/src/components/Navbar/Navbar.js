import { Link, useLocation } from "react-router-dom";
import logo from "../images/PIMS_emblem.png";

const ROLE_CONFIG = {
  doctor:    { label: "Doctor",        color: "bg-blue-100 text-blue-700" },
  nurse:     { label: "Nurse",         color: "bg-green-100 text-green-700" },
  staff:     { label: "Office Staff",  color: "bg-purple-100 text-purple-700" },
  volunteer: { label: "Volunteer",     color: "bg-amber-100 text-amber-700" },
  admin:     { label: "Administrator", color: "bg-red-100 text-red-700" },
};

export default function Navbar() {
  const location = useLocation();
  const accountType = sessionStorage.getItem("accountType") || "";
  const role = ROLE_CONFIG[accountType] || { label: accountType, color: "bg-gray-100 text-gray-700" };

  const links = [
    { to: "/patients", label: "Patients" },
    { to: "/help",     label: "Help & Info" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <img src={logo} alt="PIMS" className="w-7 h-7" />
              <span className="font-semibold text-gray-900 text-sm">PIMS</span>
            </div>
            <div className="flex items-center gap-0.5">
              {links.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === to
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${role.color}`}>
              {role.label}
            </span>
            <Link
              to="/"
              onClick={() => {
                sessionStorage.setItem("isLoggedIn", JSON.stringify(false));
                sessionStorage.setItem("accountType", "");
              }}
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Sign out
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
