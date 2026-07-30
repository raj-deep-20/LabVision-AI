import { useState } from "react";
import { FiFileText, FiDownload, FiSearch, FiActivity, FiUsers, FiCpu } from "react-icons/fi";
import api from "../services/api";

export default function Reports() {
  const [predictionId, setPredictionId] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");

  async function handleDownloadReport(e: React.FormEvent) {
    e.preventDefault();
    if (!predictionId) return;

    setDownloading(true);
    setError("");

    try {
      const response = await api.get(`/reports/${predictionId}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `LabVision_Report_${predictionId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      setError("Report download failed. Please verify that a prediction with this ID exists.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <FiFileText size={26} />
          </div>
          <div>
            <div className="text-xs font-mono text-purple-400 uppercase tracking-widest">
              Diagnostic Reports
            </div>
            <h2 className="text-xl font-bold text-white">Clinical PDF Export Center</h2>
          </div>
        </div>
      </div>

      {/* Interactive PDF Download Card */}
      <div className="rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-purple-500/30 p-8 shadow-2xl space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">Download Specific Diagnostic Report</h3>
          <p className="text-xs text-slate-400">
            Enter the Prediction ID generated during AI cell classification to download the official PDF clinical summary.
          </p>
        </div>

        <form onSubmit={handleDownloadReport} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3.5 top-3.5 text-slate-500" size={16} />
              <input
                type="number"
                value={predictionId}
                onChange={(e) => setPredictionId(e.target.value)}
                placeholder="Enter Prediction ID (e.g. 1)"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/60 font-mono text-sm transition-all"
                required
              />
            </div>
            <button
              type="submit"
              disabled={downloading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-purple-600/20 transition-all duration-200 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <FiDownload size={18} />
              <span>{downloading ? "Generating PDF..." : "Generate & Download PDF"}</span>
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono font-medium">
              {error}
            </div>
          )}
        </form>
      </div>

      {/* Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 shadow-xl space-y-3">
          <div className="flex items-center justify-between text-indigo-400">
            <span className="text-xs font-mono uppercase tracking-wider">Patients Audited</span>
            <FiUsers size={20} />
          </div>
          <p className="text-2xl font-black font-mono text-white">12 Records</p>
          <p className="text-xs text-slate-400">Clinical files logged across active laboratory workflows.</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 shadow-xl space-y-3">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-xs font-mono uppercase tracking-wider">Samples Processed</span>
            <FiActivity size={20} />
          </div>
          <p className="text-2xl font-black font-mono text-white">7 Specimens</p>
          <p className="text-xs text-slate-400">Collection, microscopic analysis, and status logged.</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 shadow-xl space-y-3">
          <div className="flex items-center justify-between text-cyan-400">
            <span className="text-xs font-mono uppercase tracking-wider">AI Classifications</span>
            <FiCpu size={20} />
          </div>
          <p className="text-2xl font-black font-mono text-white">4 Predictions</p>
          <p className="text-xs text-slate-400">Neural model outputs finalized and ready for PDF export.</p>
        </div>
      </div>
    </div>
  );
}
