import { Link } from "react-router-dom";

interface LabLogoProps {
  className?: string;
  showText?: boolean;
  to?: string;
  size?: "sm" | "md" | "lg";
}

export default function LabLogo({
  className = "",
  showText = true,
  to = "/",
  size = "md",
}: LabLogoProps) {
  const iconSizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const content = (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Flask / Beaker Icon matching theme */}
      <div
        className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#8CED00] via-[#00E5D1] to-cyan-600 p-0.5 shadow-md shadow-[#8CED00]/20 shrink-0 ${iconSizeClasses[size]}`}
      >
        <div className="w-full h-full bg-[#161324] rounded-[10px] flex items-center justify-center relative overflow-hidden">
          {/* Flask liquid background glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#8CED00]/30 via-[#00E5D1]/20 to-transparent" />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-3/5 h-3/5 relative z-10 text-white"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Flask body */}
            <path d="M10 2v3.5L4.5 16A4 4 0 0 0 8 22h8a4 4 0 0 0 3.5-6L14 5.5V2" />
            <path d="M8.5 2h7" />
            {/* Liquid level */}
            <path d="M7 15h10" strokeDasharray="1 1" strokeWidth="1.5" />
            <circle cx="10" cy="18" r="1" fill="#8CED00" stroke="none" />
            <circle cx="14" cy="16.5" r="0.8" fill="#00E5D1" stroke="none" />
          </svg>
        </div>
      </div>

      {showText && (
        <div className="flex items-center">
          <span className={`logo-lab-text font-black tracking-tight ${textSizeClasses[size]}`}>
            lab
          </span>
          <span className={`logo-vision-text font-black tracking-tight ${textSizeClasses[size]}`}>
            Vision
          </span>
          <span className="ml-1 text-[10px] font-mono font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-[#8CED00]/20 text-[#2D5400] dark:text-[#8CED00] border border-[#8CED00]/40">
            AI
          </span>
        </div>
      )}
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block transition-transform hover:scale-[1.02] active:scale-95">
        {content}
      </Link>
    );
  }

  return content;
}
