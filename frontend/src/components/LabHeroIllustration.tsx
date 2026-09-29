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
            <span className="text-xs font-mono font-extrabold text-[#1A132B] dark:text-[#8CED00] uppercase tracking-wider">
              NEURAL SMEAR TELEMETRY
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-md bg-[#8CED00]/20 text-[#2D5400] dark:text-[#8CED00] border border-[#8CED00]/40 font-mono text-[10px] font-extrabold">
            MobileNet v2.4 Active
          </span>
        </div>

        {/* Professional Imaging Microscope Graphic */}
        <div className="relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-gradient-to-b dark:from-[#0F0C1B] dark:via-[#161328] dark:to-[#0B0914] p-4 border border-slate-200 dark:border-slate-800">
          <div className="animate-scanline" />
          <svg
            viewBox="0 0 400 240"
            fill="none"
            className="w-full h-[220px] sm:h-[250px]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00E5D1" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8CED00" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="stageGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8CED00" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#00E5D1" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Base & Platform */}
            <path d="M110 205 C110 190, 290 190, 290 205 L280 215 L120 215 Z" fill="#E2E8F0" className="dark:fill-[#1E1935]" stroke="#CBD5E1" strokeWidth="1.5" />
            <rect x="130" y="200" width="140" height="10" rx="3" fill="url(#metalGradient)" opacity="0.3" />

            {/* Heavy Cast-Metal Microscope Stand / Curved Arm */}
            <path d="M220 200 C220 160, 250 120, 235 80 C225 55, 195 50, 180 65 L190 85 C198 75, 215 75, 220 95 C228 125, 205 160, 205 200 Z" fill="url(#metalGradient)" stroke="#00E5D1" strokeWidth="1.5" />

            {/* Coarse & Fine Focus Adjustment Knobs */}
            <circle cx="218" cy="170" r="14" fill="#CBD5E1" className="dark:fill-[#251F42]" stroke="#00E5D1" strokeWidth="2" />
            <circle cx="218" cy="170" r="8" fill="#E2E8F0" className="dark:fill-[#1E1935]" stroke="#8CED00" strokeWidth="1.5" />

            {/* Transmitted Light Base Illuminator */}
            <rect x="175" y="190" width="30" height="10" rx="2" fill="#E2E8F0" className="dark:fill-[#1E1935]" stroke="#00E5D1" strokeWidth="1.5" />
            <ellipse cx="190" cy="190" rx="10" ry="3" fill="#8CED00" className="animate-pulse" />

            {/* Vertical Light Beam */}
            <polygon points="182,190 198,190 205,145 175,145" fill="url(#stageGlow)" opacity="0.8" />

            {/* Mechanical Stage & Substage Condenser */}
            <rect x="150" y="145" width="80" height="8" rx="2" fill="#1E293B" className="dark:fill-[#0B0914]" stroke="#00E5D1" strokeWidth="2" />
            <path d="M180 153 L200 153 L195 165 L185 165 Z" fill="#CBD5E1" className="dark:fill-[#251F42]" stroke="#8CED00" strokeWidth="1" />

            {/* Glass Slide & Clips */}
            <rect x="165" y="142" width="50" height="3" rx="1" fill="#DFFBFF" stroke="#00E5D1" strokeWidth="1" />
            <circle cx="190" cy="143.5" r="2" fill="#8CED00" className="animate-ping" />
            <path d="M168 141 L173 141 L173 145" stroke="#8CED00" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M212 141 L207 141 L207 145" stroke="#8CED00" strokeWidth="1.5" strokeLinecap="round" />

            {/* Revolving Objective Nosepiece & Objective Lenses */}
            <circle cx="190" cy="110" r="12" fill="#CBD5E1" className="dark:fill-[#251F42]" stroke="#00E5D1" strokeWidth="1.5" />
            {/* Active Objective (pointing down) */}
            <rect x="186" y="118" width="8" height="20" rx="1.5" fill="url(#metalGradient)" stroke="#8CED00" strokeWidth="1.5" />
            {/* Secondary Objectives (angled) */}
            <rect x="172" y="112" width="7" height="15" rx="1" fill="#CBD5E1" className="dark:fill-[#251F42]" stroke="#00E5D1" strokeWidth="1" transform="rotate(35 172 112)" />
            <rect x="201" y="112" width="7" height="15" rx="1" fill="#CBD5E1" className="dark:fill-[#251F42]" stroke="#00E5D1" strokeWidth="1" transform="rotate(-35 201 112)" />

            {/* Microscope Head Assembly */}
            <path d="M165 75 L200 75 L205 102 L170 102 Z" fill="#E2E8F0" className="dark:fill-[#1E1935]" stroke="#00E5D1" strokeWidth="2" />

            {/* Binocular Eyepiece Tubes & Rubber Cups */}
            <path d="M172 75 L155 48" stroke="#00E5D1" strokeWidth="5" strokeLinecap="round" />
            <path d="M188 75 L171 48" stroke="#00E5D1" strokeWidth="5" strokeLinecap="round" />

            <rect x="148" y="40" width="12" height="10" rx="2" fill="#1E293B" className="dark:fill-[#0B0914]" stroke="#8CED00" strokeWidth="1.5" />
            <rect x="164" y="40" width="12" height="10" rx="2" fill="#1E293B" className="dark:fill-[#0B0914]" stroke="#8CED00" strokeWidth="1.5" />

            {/* Side Workstation Monitors / Data Cards */}
            <g opacity="0.85">
              <rect x="40" y="130" width="75" height="50" rx="8" fill="#E2E8F0" className="dark:fill-[#1E1935]" stroke="#CBD5E1" strokeWidth="1.5" />
              <rect x="45" y="135" width="65" height="40" rx="5" fill="#FFFFFF" className="dark:fill-[#0B0914]" stroke="#00E5D1" strokeWidth="1" />
              <path d="M52 160 L65 148 L78 155 L95 142" stroke="#8CED00" strokeWidth="2" fill="none" strokeLinecap="round" />
            </g>

            <g opacity="0.85">
              <rect x="285" y="130" width="75" height="50" rx="8" fill="#E2E8F0" className="dark:fill-[#1E1935]" stroke="#CBD5E1" strokeWidth="1.5" />
              <rect x="290" y="135" width="65" height="40" rx="5" fill="#FFFFFF" className="dark:fill-[#0B0914]" stroke="#00E5D1" strokeWidth="1" />
              <circle cx="322" cy="155" r="12" fill="none" stroke="#00E5D1" strokeWidth="2" strokeDasharray="4,2" />
              <circle cx="322" cy="155" r="4" fill="#8CED00" />
            </g>
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