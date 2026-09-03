import { Link } from "react-router-dom";
import { FiUsers, FiActivity, FiUploadCloud, FiCpu, FiFileText, FiArrowUpRight, FiZap } from "react-icons/fi";
import TechnicianWorkflowStepper from "../components/TechnicianWorkflowStepper";

const cards = [
  {
    title: "Patient Registry",
    description: "Manage patient intake, demographics, medical history, and clinical records.",
    to: "/patients",
    icon: FiUsers,
    color: "from-[#8CED00]/20 to-lime-500/10",
    borderColor: "hover:border-[#8CED00]/50",
    badge: "Registry",
  },
  {
    title: "Specimen Tracker",
    description: "Track specimen status, collection timestamps, and processing milestones.",
    to: "/samples",
    icon: FiActivity,
    color: "from-[#00E5D1]/20 to-teal-500/10",
    borderColor: "hover:border-[#00E5D1]/50",
    badge: "Live Status",
  },
  {
    title: "Image Upload",
    description: "Upload blood smear microscopic images for AI feature extraction.",
    to: "/upload",
    icon: FiUploadCloud,
    color: "from-cyan-500/20 to-[#8CED00]/10",
    borderColor: "hover:border-cyan-400/50",
    badge: "Ingestion",
  },
  {
    title: "AI Diagnostics",
    description: "Run TensorFlow & OpenCV classification for cell counts and disease status.",
    to: "/prediction",
    icon: FiCpu,
    color: "from-[#8CED00]/25 to-[#00E5D1]/20",
    borderColor: "hover:border-[#8CED00]/60 shadow-[0_0_20px_rgba(140,237,0,0.2)]",
    badge: "Neural Model",
  },
  {
    title: "Clinical Reports",
    description: "DOWNLOAD automated PDF reports and diagnostic files.",
    to: "/reports",
    icon: FiFileText,
    color: "from-purple-500/20 to-[#00E5D1]/10",
    borderColor: "hover:border-purple-500/40",
    badge: "PDF Export",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* 4-Step Technician Pathway Bar */}
      <TechnicianWorkflowStepper />

      {/* Hero Operational Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white/90 dark:bg-[#161324]/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/80 p-6 md:p-8 shadow-lg">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#8CED00]/15 via-[#00E5D1]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8CED00]/15 border border-[#8CED00]/30 text-[#366300] dark:text-[#8CED00] text-xs font-bold uppercase tracking-widest font-mono">
            <FiZap className="animate-pulse text-[#8CED00]" />
            <span>AI Operations Overview</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-black text-[#1A132B] dark:text-white tracking-tight leading-tight">
            Monitor samples with <span className="text-[#366300] dark:text-[#8CED00]">real-time AI precision</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-xs md:text-sm leading-relaxed font-medium">
            Keep patient records, lab samples, automated image processing with neural network predictions seamlessly connected in a unified workspace.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/prediction"
              className="btn-theme-lime px-5 py-2.5 text-[#120E24] font-extrabold text-sm flex items-center gap-2 group rounded-xl"
            >
              <FiCpu size={18} />
              <span>Run AI Diagnostic</span>
              <FiArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              to="/upload"
              className="btn-theme-cyan px-5 py-2.5 text-[#120E24] font-extrabold text-sm flex items-center gap-2 rounded-xl"
            >
              <FiUploadCloud size={18} />
              <span>Upload Smear Image</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              to={card.to}
              className={`group relative rounded-2xl bg-white/90 dark:bg-[#161324]/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/80 p-6 flex flex-col justify-between transition-all duration-300 ${card.borderColor} hover:-translate-y-1 shadow-md`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} border border-slate-200 dark:border-slate-700/50 text-[#366300] dark:text-[#8CED00] group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={22} />
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50">
                    {card.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1A132B] dark:text-white group-hover:text-[#366300] dark:group-hover:text-[#8CED00] transition-colors flex items-center justify-between">
                    {card.title}
                    <FiArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-all text-[#8CED00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs mt-2 leading-relaxed font-medium">
                    {card.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/60 flex items-center text-xs font-extrabold text-[#366300] dark:text-[#8CED00]">
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
