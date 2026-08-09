import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FiBarChart2,
  FiFileText,
  FiMenu,
  FiLogOut,
  FiActivity,
  FiUploadCloud,
  FiUsers,
  FiCpu,
  FiShield,
  FiX,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

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
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleLogout() {
    signOut();
    setMobileMenuOpen(false);
    navigate("/");
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  function navLinkClass(isActive: boolean) {
    return `group relative flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 hover:border hover:border-slate-700/50"
    }`;
  }

  function renderNavItems(isMobile = false) {
    return navItems.map(({ to, label, icon: Icon }) => (
      <NavLink
        key={to}
        to={to}
        title={label}
        onClick={isMobile ? closeMobileMenu : undefined}
        className={({ isActive }) =>
          isMobile
            ? `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                  : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
              }`
            : navLinkClass(isActive)
        }
      >
        {({ isActive }) => (
          <>
            <Icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
            {!isMobile && (
              <>
                <span className="absolute left-16 px-3 py-1.5 rounded-lg bg-slate-900 text-slate-200 text-xs font-semibold whitespace-nowrap shadow-xl border border-slate-700/60 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50">
                  {label}
                </span>
                {isActive && (
                  <span className="absolute -left-2 w-1 h-6 bg-cyan-400 rounded-r-full shadow-[0_0_8px_#00f2fe]" />
                )}
              </>
            )}
            {isMobile && <span>{label}</span>}
          </>
        )}
      </NavLink>
    ));
  }

  return (
    <div className="min-h-screen flex bg-[#060A12] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside className="hidden lg:flex w-16 md:w-20 fixed inset-y-0 left-0 z-30 flex-col items-center justify-between py-6 bg-slate-900/60 backdrop-blur-xl border-r border-slate-800/80 shadow-2xl">
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
          {renderNavItems()}
        </nav>

        {/* Bottom Actions */}
        <div className="flex flex-col items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
            className="flex items-center justify-center w-11 h-11 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-slate-800/60 transition-all duration-200"
          >
            {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

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
        </div>
      </aside>

      {/* Mobile Bar */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-30 px-4 pt-4">
        <div className="flex items-center justify-between h-14 px-4 rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 shadow-2xl">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700/70 bg-slate-950/40 text-slate-200"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>

          <div className="flex items-center gap-2">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 text-xs font-black text-white shadow-lg shadow-cyan-500/20">
              LV
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-none">LabVision AI</p>
              <p className="text-[11px] text-slate-400 hidden sm:block">Clinical Microscopy Workspace</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-700/70 bg-slate-950/40 text-slate-300"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-300"
            >
              Logout
            </button>
          </div>
        </div>

        <div
          className={`mt-3 overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/90 backdrop-blur-xl shadow-2xl transition-all duration-300 ${
            mobileMenuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0 border-transparent"
          }`}
        >
          <div className="flex flex-col gap-2 p-3">{renderNavItems(true)}</div>
        </div>
      </div>

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-20">
        {/* Top Header */}
        <header className="sticky top-0 z-20 hidden lg:flex h-16 px-6 bg-[#060A12]/80 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between">
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
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 hover:border-cyan-500/40 transition-colors"
            >
              {theme === "dark" ? (
                <>
                  <FiSun size={14} className="text-amber-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <FiMoon size={14} className="text-indigo-400" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>

            {user && (
              <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow-md">
                  {user.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs font-semibold text-white leading-none">{user.name}</p>
                  <p className="text-[11px] text-slate-400">{user.email}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-400 font-mono">
              <FiShield className="text-indigo-400" />
              <span>HIPAA Compliant</span>
            </div>
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 p-4 pt-24 sm:p-6 sm:pt-24 lg:pt-6 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
