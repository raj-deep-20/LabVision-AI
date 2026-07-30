import { useEffect, useState } from "react";
import { FiActivity, FiRefreshCw, FiAlertCircle, FiTag } from "react-icons/fi";
import api from "../services/api";

type Sample = {
  id: number;
  sample_id: string;
  patient_id: number;
  sample_type: string;
  status: string;
  collection_date: string;
  remarks?: string | null;
};

export default function Samples() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [loading, setLoading] = useState(true);

  function fetchSamples() {
    setLoading(true);
    api
      .get<Sample[]>("/samples/")
      .then((res) => setSamples(res.data))
      .catch(() => setSamples([]))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchSamples();
  }, []);

  function getStatusBadge(status: string) {
    const s = status.toLowerCase();
    if (s.includes("completed") || s.includes("analyzed") || s.includes("ready")) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {status}
        </span>
      );
    }
    if (s.includes("pending") || s.includes("processing") || s.includes("in progress")) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
          {status}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs font-semibold">
        <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
        {status}
      </span>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <FiActivity size={24} />
          </div>
          <div>
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
              Specimen Tracker
            </div>
            <h2 className="text-xl font-bold text-white">Sample Lifecycle</h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 font-mono text-xs font-semibold">
            {samples.length} Active Specimens
          </span>
          <button
            onClick={fetchSamples}
            title="Refresh list"
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-all active:scale-95 border border-slate-700/60"
          >
            <FiRefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 shadow-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <FiRefreshCw size={28} className="animate-spin mx-auto text-emerald-400" />
            <p className="text-sm font-mono">Loading specimen lifecycle data...</p>
          </div>
        ) : samples.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <FiAlertCircle size={32} className="mx-auto text-amber-400" />
            <h3 className="text-base font-semibold text-slate-200">No Samples Available</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              No lab specimens have been uploaded or cataloged yet. Use the upload module to ingest new microscopy samples.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/60 border-b border-slate-800 text-xs font-mono uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 px-5">Sample ID</th>
                  <th className="py-3.5 px-5">Specimen Type</th>
                  <th className="py-3.5 px-5">Processing Status</th>
                  <th className="py-3.5 px-5">Collection Timestamp</th>
                  <th className="py-3.5 px-5">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {samples.map((sample) => (
                  <tr
                    key={sample.id}
                    className="hover:bg-slate-800/40 transition-colors duration-150 group"
                  >
                    <td className="py-4 px-5 font-mono text-cyan-400 font-bold text-xs flex items-center gap-2">
                      <FiTag className="text-slate-500" />
                      <span>{sample.sample_id}</span>
                    </td>
                    <td className="py-4 px-5 font-medium text-slate-200">
                      {sample.sample_type}
                    </td>
                    <td className="py-4 px-5">
                      {getStatusBadge(sample.status)}
                    </td>
                    <td className="py-4 px-5 font-mono text-slate-400 text-xs">
                      {sample.collection_date}
                    </td>
                    <td className="py-4 px-5 text-slate-400 text-xs italic">
                      {sample.remarks || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
