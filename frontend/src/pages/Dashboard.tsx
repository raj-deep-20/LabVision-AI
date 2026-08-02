import { Link } from "react-router-dom";
import { FiUsers, FiActivity, FiUploadCloud, FiCpu, FiFileText, FiArrowUpRight, FiZap } from "react-icons/fi";

const cards = [
  {
    title: "Patient Registry",
    description: "Manage patient intake, demographics, medical history, and clinical records.",
    to: "/patients",
    icon: FiUsers,
    color: "from-indigo-500/20 to-cyan-500/10",
    borderColor: "hover:border-indigo-500/40",
    badge: "Registry",
  },
  {
    title: "Specimen Tracker",
    description: "Track specimen status, collection timestamps, and processing milestones.",
    to: "/samples",
    icon: FiActivity,
    color: "from-emerald-500/20 to-teal-500/10",
    borderColor: "hover:border-emerald-500/40",
    badge: "Live Status",
  },
  {
    title: "Image Upload",
    description: "Upload blood smear microscopic images for AI feature extraction.",
    to: "/upload",
    icon: FiUploadCloud,
    color: "from-cyan-500/20 to-blue-500/10",
    borderColor: "hover:border-cyan-500/40",
    badge: "Ingestion",
  },
  {
    title: "AI Diagnostics",
    description: "Run TensorFlow & OpenCV classification for cell counts and disease status.",
    to: "/prediction",
    icon: FiCpu,
    color: "from-cyan-500/25 to-indigo-500/20",
    borderColor: "hover:border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.15)]",
    badge: "Neural Model",
  },
  {
    title: "Clinical Reports",
    description: "DOWNLOAD automated PDF reports and diagnostic files.",
    to: "/reports",
    icon: FiFileText,
    color: "from-purple-500/20 to-indigo-500/10",
    borderColor: "hover:border-purple-500/40",
    badge: "PDF Export",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-8 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/15 via-indigo-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-widest font-mono">
            <FiZap className="animate-pulse text-cyan-400" />
            <span>AI Operations Overview</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Monitor samples with <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-indigo-500 bg-clip-text text-transparent">real-time AI precision</span>
          </h2>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Keep patient records, lab samples, automated image processing with neural network predictions seamlessly connected in a unified workspace.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              to="/prediction"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200 active:scale-95 flex items-center gap-2 group"
            >
              <FiCpu size={18} />
              <span>Run AI Diagnostic</span>
              <FiArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              to="/upload"
              className="px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-200 font-semibold text-sm transition-all duration-200 active:scale-95 flex items-center gap-2"
            >
              <FiUploadCloud size={18} />
              <span>Upload Smear Image</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              to={card.to}
              className={`group relative rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-6 flex flex-col justify-between transition-all duration-300 ${card.borderColor} hover:-translate-y-1 shadow-xl`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} border border-slate-700/50 text-cyan-400 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={22} />
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700/50">
                    {card.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                    {card.title}
                    <FiArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-all text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center text-xs font-semibold text-cyan-400/80 group-hover:text-cyan-300">
                <span>Access module</span>
                <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
