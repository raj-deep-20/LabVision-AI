import { Link, useLocation } from "react-router-dom";
import { FiUsers, FiUploadCloud, FiCpu, FiFileText, FiChevronRight, FiCheck } from "react-icons/fi";

const steps = [
  { id: 1, to: "/patients", label: "Patient Intake", icon: FiUsers, code: "PAT" },
  { id: 2, to: "/upload", label: "Ingest Smear", icon: FiUploadCloud, code: "UPLOAD" },
  { id: 3, to: "/prediction", label: "AI Diagnostic", icon: FiCpu, code: "RESNET" },
  { id: 4, to: "/reports", label: "Export Report", icon: FiFileText, code: "PDF" },
];

export default function TechnicianWorkflowStepper() {
  const location = useLocation();

  function getStepStatus(to: string, index: number) {
    const isCurrent = location.pathname === to;
    const currentIndex = steps.findIndex((s) => s.to === location.pathname);
    const isCompleted = currentIndex > index;

    return { isCurrent, isCompleted };
  }

  return (
    <div id="workflow" className="w-full rounded-2xl bg-white/90 dark:bg-[#161324]/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 p-4 shadow-md">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#8CED00] animate-pulse" />
          <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#1A132B] dark:text-slate-200">
            Technician Clinical Pathway
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden sm:inline font-semibold">
          Fast-Track Protocol
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const { isCurrent, isCompleted } = getStepStatus(step.to, index);

          return (
            <Link
              key={step.to}
              to={step.to}
              className={`group flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${
                isCurrent
                  ? "bg-[#8CED00]/20 border-[#8CED00] text-[#1A132B] dark:text-white shadow-sm"
                  : isCompleted
                  ? "bg-slate-100/80 dark:bg-slate-900/60 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                  : "bg-slate-50/60 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-extrabold ${
                    isCurrent
                      ? "bg-[#8CED00] text-[#120E24]"
                      : isCompleted
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {isCompleted ? <FiCheck size={14} /> : `0${step.id}`}
                </div>
                <div>
                  <p className="text-xs font-extrabold leading-tight flex items-center gap-1">
                    <Icon size={12} className="text-[#366300] dark:text-[#8CED00]" />
                    {step.label}
                  </p>
                  <p className="text-[9px] font-mono text-slate-500 dark:text-slate-400 uppercase mt-0.5 font-bold">{step.code}</p>
                </div>
              </div>

              <FiChevronRight
                size={16}
                className={`transition-transform group-hover:translate-x-0.5 ${
                  isCurrent ? "text-[#366300] dark:text-[#8CED00]" : "text-slate-400"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
