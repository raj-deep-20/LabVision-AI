import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FiBarChart2,
  FiFileText,
  FiLogOut,
  FiActivity,
  FiUploadCloud,
  FiUsers,
  FiCpu,
  FiShield,
} from "react-icons/fi";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: FiBarChart2 },
  { to: "/patients", label: "Patients", icon: FiUsers },
  { to: "/samples", label: "Samples", icon: FiActivity },
  { to: "/upload", label: "Upload", icon: FiUploadCloud },
  { to: "/prediction", label: "AI Diagnostic", icon: FiCpu },
  { to: "/reports", label: "Reports", icon: FiFileText },
];

export default function Layout() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="min-h-screen flex bg-[#060A12] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Ultra-Compact Icon Sidebar */}
      <aside className="w-16 md:w-20 fixed inset-y-0 left-0 z-30 flex flex-col items-center justify-between py-6 bg-slate-900/60 backdrop-blur-xl border-r border-slate-800/80 shadow-2xl">
        {/* Brand Icon */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 shadow-lg shadow-cyan-500/20 text-white font-black text-xl tracking-wider">
            LV
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </div>
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase hidden md:block">
            LabVision
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col items-center gap-3 w-full px-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              title={label}
              className={({ isActive }) =>
                `group relative flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 hover:border hover:border-slate-700/50"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
                  {/* Tooltip on Hover */}
                  <span className="absolute left-16 px-3 py-1.5 rounded-lg bg-slate-900 text-slate-200 text-xs font-semibold whitespace-nowrap shadow-xl border border-slate-700/60 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50">
                    {label}
                  </span>
                  {/* Active Indicator Strip */}
                  {isActive && (
                    <span className="absolute -left-2 w-1 h-6 bg-cyan-400 rounded-r-full shadow-[0_0_8px_#00f2fe]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          title="Logout"
          className="group relative flex items-center justify-center w-11 h-11 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 hover:border hover:border-rose-500/30 transition-all duration-300 active:scale-95"
        >
          <FiLogOut size={18} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
          <span className="absolute left-16 px-3 py-1.5 rounded-lg bg-slate-900 text-rose-300 text-xs font-semibold whitespace-nowrap shadow-xl border border-slate-700/60 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50">
            Logout
          </span>
        </button>
      </aside>

      {/* Main Content Workspace */}
      <div className="flex-1 pl-16 md:pl-20 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-20 h-16 px-6 bg-[#060A12]/80 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Operational Intelligence</span>
            </div>
            <h1 className="text-sm font-semibold text-slate-300 hidden sm:block">
              Clinical Microscopy Workspace
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-400 font-mono">
              <FiShield className="text-indigo-400" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shadow-md">
              DR
            </div>
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
