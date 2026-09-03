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
import LabLogo from "./LabLogo";

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
        ? "bg-[#8CED00]/20 text-[#366300] dark:text-[#8CED00] border border-[#8CED00]/50 shadow-[0_0_15px_rgba(140,237,0,0.25)] font-bold"
        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:border hover:border-slate-300 dark:hover:border-slate-700/50"
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
                  ? "bg-[#8CED00]/20 text-[#366300] dark:text-[#8CED00] border border-[#8CED00]/40 font-bold"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
              }`
            : navLinkClass(isActive)
        }
      >
        {({ isActive }) => (
          <>
            <Icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
            {!isMobile && (
              <>
                <span className="absolute left-16 px-3 py-1.5 rounded-lg bg-slate-900 text-slate-100 text-xs font-semibold whitespace-nowrap shadow-xl border border-slate-700 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50">
                  {label}
                </span>
                {isActive && (
                  <span className="absolute -left-2 w-1.5 h-6 bg-[#8CED00] rounded-r-full shadow-[0_0_8px_#8CED00]" />
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
    <div className="min-h-screen flex bg-white dark:bg-[#0B0A14] text-slate-900 dark:text-slate-100 selection:bg-[#8CED00]/30 selection:text-[#366300]">
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-16 md:w-20 fixed inset-y-0 left-0 z-30 flex-col items-center justify-between py-6 bg-white/95 dark:bg-[#161324]/85 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800/80 shadow-lg">
        {/* Brand Logo */}
        <div className="flex flex-col items-center gap-2">
          <LabLogo showText={false} size="sm" />
          <span className="text-[9px] font-extrabold tracking-widest text-[#366300] dark:text-[#8CED00] uppercase hidden md:block mt-1">
            LABVISION
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
            className="theme-toggle-btn flex items-center justify-center w-11 h-11 rounded-xl text-slate-600 dark:text-slate-400 hover:text-[#366300] dark:hover:text-[#8CED00] hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all duration-200"
          >
            {theme === "dark" ? <FiSun size={18} className="text-amber-400" /> : <FiMoon size={18} className="text-indigo-600" />}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            title="Logout"
            className="group relative flex items-center justify-center w-11 h-11 rounded-xl text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-500/10 hover:border hover:border-rose-500/30 transition-all duration-300 active:scale-95"
          >
            <FiLogOut size={18} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
            <span className="absolute left-16 px-3 py-1.5 rounded-lg bg-slate-900 text-rose-300 text-xs font-semibold whitespace-nowrap shadow-xl border border-slate-700 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50">
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Mobile Bar */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-30 px-4 pt-4">
        <div className="flex items-center justify-between h-14 px-4 rounded-2xl bg-white/95 dark:bg-[#161324]/85 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 shadow-lg">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((value) => !value)}
            className="menu-toggle-btn inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-950/40 text-slate-800 dark:text-slate-200"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>

          <LabLogo size="sm" />

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle-btn p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-950/40 text-slate-800 dark:text-slate-300"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FiSun size={16} className="text-amber-400" /> : <FiMoon size={16} className="text-indigo-600" />}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-xs font-bold text-rose-600 dark:text-rose-300"
            >
              Logout
            </button>
          </div>
        </div>

        <div
          className={`mobile-menu-panel mt-3 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/98 dark:bg-[#161324]/95 backdrop-blur-xl shadow-2xl transition-all duration-300 ${
            mobileMenuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0 border-transparent"
          }`}
        >
          <div className="flex flex-col gap-2 p-3">{renderNavItems(true)}</div>
        </div>
      </div>

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-20">
        {/* Top Header */}
        <header className="sticky top-0 z-20 hidden lg:flex h-16 px-6 bg-white/90 dark:bg-[#0B0A14]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#8CED00]/15 border border-[#8CED00]/30 text-[#366300] dark:text-[#8CED00] text-xs font-bold font-mono">
              <span className="h-2 w-2 rounded-full bg-[#8CED00] animate-pulse" />
              <span>Diagnostic Intelligence</span>
            </div>
            <h1 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 hidden sm:block">
              Clinical Microscopy Workspace
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-[#8CED00] transition-colors"
            >
              {theme === "dark" ? (
                <>
                  <FiSun size={14} className="text-amber-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <FiMoon size={14} className="text-indigo-600" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>

            {user && (
              <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#8CED00] to-[#00E5D1] flex items-center justify-center text-xs font-black text-[#120E24] shadow-sm">
                  {user.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-none">{user.name}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{user.email}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 font-mono font-semibold">
              <FiShield className="text-[#007D71] dark:text-[#00E5D1]" />
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
