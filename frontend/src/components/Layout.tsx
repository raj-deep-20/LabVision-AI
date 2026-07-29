import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FiBarChart2,
  FiFileText,
  FiLogOut,
  FiActivity,
  FiUploadCloud,
  FiUsers,
} from "react-icons/fi";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: FiBarChart2 },
  { to: "/patients", label: "Patients", icon: FiUsers },
  { to: "/samples", label: "Samples", icon: FiActivity },
  { to: "/upload", label: "Upload", icon: FiUploadCloud },
  { to: "/prediction", label: "Prediction", icon: FiFileText },
  { to: "/reports", label: "Reports", icon: FiFileText },
];

export default function Layout() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <h2 className="brand">LabVision AI</h2>
          <p className="brand-subtitle">Clinical imaging workspace</p>
        </div>

        <nav className="nav-links">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link-active" : ""}`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut size={16} />
          Logout
        </button>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">Operational intelligence</p>
            <h1 className="page-title">Streamline your lab workflow</h1>
          </div>
        </header>

        <section className="content-area">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
