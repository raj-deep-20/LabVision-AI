import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiBarChart2,
  FiCpu,
  FiZoomIn,
  FiShield,
  FiZap,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiMail,
  FiUploadCloud,
  FiUsers,
} from "react-icons/fi";

import heroImage from "../assets/hero.png";

const highlights = [
  {
    icon: FiUsers,
    title: "Patient workflow",
    text: "Keep patient records, intake data, and clinical references connected in one place.",
  },
  {
    icon: FiUploadCloud,
    title: "Image ingestion",
    text: "Upload microscopy images quickly and keep the lab pipeline moving without friction.",
  },
  {
    icon: FiCpu,
    title: "AI diagnosis",
    text: "Run model-assisted prediction for blood smear analysis and report generation.",
  },
];

const steps = [
  "Sign in or register to access the secured workspace.",
  "Upload microscopy images and attach patient context.",
  "Review predictions, reports, and follow-up actions.",
];

const metrics = [
  { label: "Smart modules", value: "06" },
  { label: "Workflows covered", value: "End-to-end" },
  { label: "Design system", value: "Dark glass" },
];

export default function Home() {
  return (
    <div className="space-y-8 sm:space-y-12 pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <header className="sticky top-4 z-20 rounded-2xl border border-slate-800/70 bg-slate-900/60 backdrop-blur-xl shadow-2xl px-4 sm:px-6 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 text-sm font-black text-white shadow-lg shadow-cyan-500/20">
            LV
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-cyan-400 ring-2 ring-slate-900" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">LabVision AI</p>
            <p className="text-xs text-slate-400">Clinical imaging workspace</p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-300">
          <a className="rounded-full border border-slate-700/70 px-3 py-2 hover:border-cyan-500/40 hover:text-cyan-300" href="#about">
            About
          </a>
          <a className="rounded-full border border-slate-700/70 px-3 py-2 hover:border-cyan-500/40 hover:text-cyan-300" href="#features">
            Features
          </a>
          <a className="rounded-full border border-slate-700/70 px-3 py-2 hover:border-cyan-500/40 hover:text-cyan-300" href="#workflow">
            Workflow
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-full border border-slate-700/70 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-cyan-500/40 hover:text-cyan-200"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition-transform hover:-translate-y-0.5"
          >
            Register
            <FiArrowRight size={16} />
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden rounded-[2rem] border border-slate-800/80 bg-slate-900/55 backdrop-blur-xl shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.16),_transparent_30%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] p-6 sm:p-10 lg:p-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              <FiShield />
              Secure lab intelligence
            </div>

            <div className="space-y-4 max-w-2xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.02]">
                A clinical imaging workspace built for
                <span className="block bg-gradient-to-r from-cyan-300 via-white to-indigo-300 bg-clip-text text-transparent">
                  faster diagnosis.
                </span>
              </h1>
              <p className="max-w-xl text-sm sm:text-base text-slate-300 leading-7">
                LabVision AI keeps patient records, smear uploads, AI prediction, and reporting in one focused workspace.
                The interface stays dark, clean, and information-dense without losing readability on smaller screens.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition-transform hover:-translate-y-0.5"
              >
                Sign in to workspace
                <FiArrowRight size={16} />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700/80 bg-slate-950/40 px-5 py-3 text-sm font-semibold text-slate-100 transition-colors hover:border-cyan-500/40 hover:text-cyan-200"
              >
                Register account
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-slate-800/80 bg-slate-950/50 px-4 py-3 shadow-lg"
                >
                  <div className="text-2xl font-black text-white">{metric.value}</div>
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-cyan-500/15 via-transparent to-indigo-500/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-800/80 bg-slate-950/55 p-4 shadow-2xl">
              <img
                src={heroImage}
                alt="LabVision AI clinical imaging preview"
                className="h-[320px] sm:h-[420px] w-full rounded-[1.25rem] object-cover object-center"
              />

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4">
                  <div className="flex items-center gap-2 text-cyan-300 text-sm font-semibold">
                    <FiZap />
                    AI assisted output
                  </div>
                  <p className="mt-2 text-xs leading-6 text-slate-300">
                    Diagnostic suggestions, prediction summaries, and reporting in a single flow.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-4">
                  <div className="flex items-center gap-2 text-slate-100 text-sm font-semibold">
                    <FiBarChart2 className="text-cyan-300" />
                    Live operations view
                  </div>
                  <p className="mt-2 text-xs leading-6 text-slate-400">
                    Monitor samples, patients, uploads, and reports from a compact dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] items-stretch">
        <div className="rounded-[1.75rem] border border-slate-800/80 bg-slate-900/55 backdrop-blur-xl p-6 sm:p-8 shadow-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-950/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
            <FiZoomIn className="text-cyan-300" />
            About the platform
          </div>
          <h2 className="mt-4 text-2xl sm:text-3xl font-black text-white tracking-tight">
            Designed for laboratory teams that need speed and clarity.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            The homepage introduces the platform without changing the underlying palette. It keeps the same dark glass
            styling used in the app, while giving new visitors a clear path into the authenticated workspace.
          </p>

          <div className="mt-6 space-y-3">
            {steps.map((step, index) => (
              <div key={step} className="flex items-start gap-3 rounded-2xl border border-slate-800/70 bg-slate-950/40 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500/15 text-sm font-bold text-cyan-300">
                  {index + 1}
                </div>
                <p className="text-sm text-slate-200 leading-6">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div id="features" className="grid gap-4 sm:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-[1.5rem] border border-slate-800/80 bg-slate-900/55 backdrop-blur-xl p-5 shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="workflow" className="rounded-[1.75rem] border border-slate-800/80 bg-slate-900/55 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-950/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
              <FiZap className="text-cyan-300" />
              Workflow overview
            </div>
            <h2 className="mt-4 text-2xl sm:text-3xl font-black text-white">A simple flow from login to report.</h2>
          </div>
          <div className="text-sm text-slate-400 max-w-xl">
            The nav buttons take users directly to login and registration, while the rest of the page introduces the
            product in a way that matches the existing design system.
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {[
            {
              title: "1. Secure access",
              text: "Start with sign in or registration from the homepage CTA.",
            },
            {
              title: "2. Clinical input",
              text: "Use the dashboard to manage patients, samples, and uploads.",
            },
            {
              title: "3. AI output",
              text: "Review predictions and reports in the protected workspace.",
            },
          ].map((card) => (
            <div key={card.title} className="rounded-2xl border border-slate-800/80 bg-slate-950/50 p-5">
              <h3 className="text-base font-bold text-white">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{card.text}</p>
            </div>
          ))}
        </div>
      </section>
      <footer className="rounded-[1.75rem] border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-2xl space-y-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Description Column */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 text-xs font-black text-white shadow-lg shadow-cyan-500/20">
                LV
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-cyan-400 ring-2 ring-slate-900" />
              </div>
              <span className="text-lg font-bold text-white tracking-wide">LabVision AI</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Accelerating pathology workflows through deep learning diagnostic assistance and streamlined smear ingestion.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-950/50 text-slate-400 transition-colors hover:border-cyan-500/40 hover:text-cyan-300"
              >
                <FiGithub size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-950/50 text-slate-400 transition-colors hover:border-cyan-500/40 hover:text-cyan-300"
              >
                <FiTwitter size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-950/50 text-slate-400 transition-colors hover:border-cyan-500/40 hover:text-cyan-300"
              >
                <FiLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-400">Navigation</p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="#about" className="transition-colors hover:text-cyan-300">
                  About Platform
                </a>
              </li>
              <li>
                <a href="#features" className="transition-colors hover:text-cyan-300">
                  Core Features
                </a>
              </li>
              <li>
                <a href="#workflow" className="transition-colors hover:text-cyan-300">
                  Workflow Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Account Links Column */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-400">Workspace</p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link to="/login" className="transition-colors hover:text-cyan-300">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="transition-colors hover:text-cyan-300">
                  Register Account
                </Link>
              </li>
              <li>
                <a href="#about" className="transition-colors hover:text-cyan-300">
                  Security Details
                </a>
              </li>
            </ul>
          </div>

          {/* System Status / Contact Column */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-400">Status & Contact</p>
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/50 p-3 space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                All Systems Operational
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
                <FiMail size={14} className="text-slate-500" /> support@labvision.ai
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} LabVision AI Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-slate-400 transition-colors">
              Terms of Service
            </a>
            <a href="#hipaa" className="hover:text-slate-400 transition-colors">
              HIPAA Compliance
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}