import { useState, useEffect } from "react";
import { FiCheckCircle } from "react-icons/fi";

export default function LabHeroIllustration() {
  const [telemetry, setTelemetry] = useState({
    rbc: 4820000,
    wbc: 7400,
    platelets: 248000,
    confidence: 99.4,
  });

  // Simulated live cell count updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        ...prev,
        rbc: prev.rbc + Math.floor((Math.random() - 0.5) * 2000),
        wbc: prev.wbc + Math.floor((Math.random() - 0.5) * 50),
        confidence: Number((99.2 + Math.random() * 0.5).toFixed(1)),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Outer Glowing Field Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full border border-[#8CED00]/40 animate-pulse pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[270px] h-[270px] sm:w-[330px] sm:h-[330px] rounded-full border border-[#00E5D1]/40 pointer-events-none" />

      {/* Main Card Container */}
      <div className="relative rounded-[2rem] bg-white dark:bg-[#161324] backdrop-blur-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xl space-y-4">
        {/* Header Telemetry Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#8CED00] animate-ping" />
            <span className="text-xs font-mono font-extrabold text-[#1A132B] dark:text-white uppercase tracking-wider">
              NEURAL SMEAR TELEMETRY
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-md bg-[#8CED00]/20 text-[#2D5400] dark:text-[#8CED00] border border-[#8CED00]/40 font-mono text-[10px] font-extrabold">
            ResNet v2.4 Active
          </span>
        </div>

        {/* 3D Flask & Microscope Vector SVG Graphic */}
        <div className="relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-gradient-to-b dark:from-[#0F0C1B] dark:via-[#161328] dark:to-[#0B0914] p-4 border border-slate-200 dark:border-slate-800">
          <div className="animate-scanline" />
          <svg
            viewBox="0 0 400 240"
            fill="none"
            className="w-full h-[220px] sm:h-[250px]"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Laboratory Platform Base */}
            <ellipse cx="200" cy="200" rx="160" ry="30" fill="#E2E8F0" className="dark:fill-[#1E1935]" stroke="#CBD5E1" strokeWidth="1.5" />
            <ellipse cx="200" cy="195" rx="130" ry="22" fill="#CBD5E1" className="dark:fill-[#251F42]" stroke="#8CED00" strokeWidth="1.5" strokeDasharray="4,4" />

            {/* Glowing Central Flask / Beaker Chamber */}
            <path
              d="M170 80 L150 160 A40 40 0 0 0 200 190 A40 40 0 0 0 250 160 L230 80 Z"
              fill="url(#flaskFluid)"
              stroke="#00E5D1"
              strokeWidth="2.5"
            />
            {/* Flask Neck */}
            <rect x="175" y="45" width="50" height="35" rx="4" fill="#E2E8F0" className="dark:fill-[#1E1935]" stroke="#00E5D1" strokeWidth="1.5" />
            <line x1="170" y1="45" x2="230" y2="45" stroke="#00E5D1" strokeWidth="3" />

            {/* Liquid Level & Bubbles */}
            <ellipse cx="200" cy="140" rx="35" ry="8" fill="#8CED00" opacity="0.75" />
            <circle cx="190" cy="120" r="4" fill="#8CED00" />
            <circle cx="215" cy="105" r="3" fill="#00E5D1" />
            <circle cx="198" cy="90" r="2.5" fill="#8CED00" />

            {/* Orbital Atom Rings */}
            <ellipse cx="200" cy="130" rx="90" ry="30" fill="none" stroke="#8CED00" strokeWidth="1.5" strokeDasharray="6,4" transform="rotate(-20 200 130)" />
            <ellipse cx="200" cy="130" rx="90" ry="30" fill="none" stroke="#00E5D1" strokeWidth="1.5" strokeDasharray="6,4" transform="rotate(20 200 130)" />
            <circle cx="280" cy="100" r="6" fill="#8CED00" className="animate-pulse" />
            <circle cx="120" cy="150" r="5" fill="#00E5D1" className="animate-pulse" />

            {/* Workstations */}
            <rect x="50" y="140" width="70" height="45" rx="6" fill="#E2E8F0" className="dark:fill-[#1E1935]" stroke="#CBD5E1" />
            <rect x="55" y="145" width="60" height="35" fill="#FFFFFF" className="dark:fill-[#0B0914]" rx="4" />
            <path d="M60 165 L80 155 L100 170" stroke="#386600" className="dark:stroke-[#8CED00]" strokeWidth="2" fill="none" />

            <rect x="280" y="140" width="70" height="45" rx="6" fill="#E2E8F0" className="dark:fill-[#1E1935]" stroke="#CBD5E1" />
            <rect x="285" y="145" width="60" height="35" fill="#FFFFFF" className="dark:fill-[#0B0914]" rx="4" />
            <circle cx="315" cy="162" r="10" fill="none" stroke="#007D71" className="dark:stroke-[#00E5D1]" strokeWidth="1.5" />

            <defs>
              <linearGradient id="flaskFluid" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00E5D1" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#8CED00" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Live Telemetry Cards */}
        <div className="grid grid-cols-3 gap-2.5 pt-1">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
            <span className="text-[9px] font-mono text-slate-600 dark:text-slate-400 uppercase font-extrabold">RBC COUNT</span>
            <p className="text-xs font-mono font-black text-[#1A132B] dark:text-slate-100 mt-0.5">
              {(telemetry.rbc / 1000000).toFixed(2)}M /µL
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
            <span className="text-[9px] font-mono text-slate-600 dark:text-slate-400 uppercase font-extrabold">WBC COUNT</span>
            <p className="text-xs font-mono font-black text-[#1A132B] dark:text-slate-100 mt-0.5">
              {(telemetry.wbc / 1000).toFixed(1)}K /µL
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
            <span className="text-[9px] font-mono text-slate-600 dark:text-slate-400 uppercase font-extrabold">AI CONFIDENCE</span>
            <p className="text-xs font-mono font-black text-[#386600] dark:text-[#8CED00] mt-0.5 flex items-center gap-1">
              <FiCheckCircle size={10} /> {telemetry.confidence}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
