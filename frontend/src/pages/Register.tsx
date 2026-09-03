import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLock, FiMail, FiUser, FiArrowRight, FiShield } from "react-icons/fi";
import api from "../services/api";
import LabLogo from "../components/LabLogo";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post("/auth/register", { name, email, password });
      setMessage("Account created successfully. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      setMessage(err?.response?.data?.detail || "Registration failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#0B0A14] light-mode:bg-[#F8FAF9] text-slate-100 relative overflow-hidden">
      {/* Background Lighting Orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#00E5D1]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#8CED00]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl grid md:grid-cols-2 rounded-3xl bg-white/90 dark:bg-[#161324]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 shadow-2xl overflow-hidden relative z-10">
        {/* Hero Branding Section */}
        <div className="p-6 sm:p-8 md:p-12 bg-gradient-to-br from-[#161324] via-slate-900 to-[#0F1A24] flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800/80 force-light-text">
          <div>
            <div className="mb-6">
              <LabLogo size="lg" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5D1]/15 border border-[#00E5D1]/30 text-[#00E5D1] text-xs font-bold uppercase tracking-wider mb-4 font-mono">
              <FiShield /> Clinician Onboarding
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight mb-3">
              Start your <span className="text-[#8CED00]">LabVision AI</span> journey
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Register your practitioner profile to manage patient registries, sample lifecycles, and automated blood smear predictions.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/60 flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span className="h-2 w-2 rounded-full bg-[#00E5D1] animate-pulse" />
            <span>Encrypted Practitioner Portal</span>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-xl font-extrabold text-[#2D2342] dark:text-white mb-1">Create practitioner account</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Fill in your profile details to gain access</p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. Jane Doe"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#8CED00] text-sm font-sans"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@labvision.ai"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#8CED00] font-mono text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#8CED00] font-mono text-sm"
                  required
                />
              </div>
            </div>

            {message && (
              <div className={`p-3 rounded-xl border text-xs font-medium ${
                message.includes("Redirecting")
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500 dark:text-emerald-300"
                  : "bg-rose-500/10 border-rose-500/30 text-rose-500 dark:text-rose-300"
              }`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 btn-theme-lime text-slate-900 font-extrabold text-sm shadow-md transition-all duration-200 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 group mt-2 rounded-xl"
            >
              <span>{loading ? "Creating account..." : "Register Account"}</span>
              {!loading && <FiArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="text-[#6AB800] dark:text-[#8CED00] hover:underline font-bold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
