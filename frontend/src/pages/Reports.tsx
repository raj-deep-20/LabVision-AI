import { useEffect, useState } from "react";
import { FiFileText, FiDownload, FiSearch, FiActivity, FiUsers, FiCpu, FiTag, FiRefreshCw } from "react-icons/fi";
import api from "../services/api";
import type { PatientRecord, SampleRecord } from "../services/contracts";

export default function Reports() {
  const [sampleCode, setSampleCode] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [samples, setSamples] = useState<SampleRecord[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchSummary() {
    setRefreshing(true);

    try {
      const [patientResponse, sampleResponse] = await Promise.all([
        api.get<PatientRecord[]>("/patients/"),
        api.get<SampleRecord[]>("/samples/"),
      ]);

      setPatients(patientResponse.data);
      setSamples(sampleResponse.data);
    } catch {
      setPatients([]);
      setSamples([]);
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchSummary();
  }, []);

  async function handleDownloadReport(e: React.FormEvent) {
    e.preventDefault();
    if (!sampleCode) return;

    setDownloading(true);
    setError("");

    try {
      const response = await api.get(`/reports/${sampleCode}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `LabVision_Report_${sampleCode}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      const detail = err?.response?.data?.detail;
      setError(detail || "Report download failed. Please verify that the sample code exists and an image prediction has been executed.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#161324]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#8CED00]/15 border border-[#8CED00]/30 text-[#6AB800] dark:text-[#8CED00]">
            <FiFileText size={24} />
          </div>
          <div>
            <div className="text-xs font-mono text-[#6AB800] dark:text-[#8CED00] uppercase tracking-widest font-bold">
              Diagnostic Reports
            </div>
            <h2 className="text-xl font-extrabold text-[#2D2342] dark:text-white">Clinical PDF Export Center</h2>
          </div>
        </div>

        <button
          type="button"
          onClick={fetchSummary}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all active:scale-95 border border-slate-200 dark:border-slate-700"
        >
          <FiRefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
        </button>
      </div>

      {/* PDF Download Form Card */}
      <div className="rounded-3xl bg-white/80 dark:bg-[#161324]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <h3 className="text-lg font-bold text-[#2D2342] dark:text-white mb-1">Download Diagnostic Report</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Enter the sample code (e.g. SMP000001) to download the official PDF clinical summary.
          </p>
        </div>

        <form onSubmit={handleDownloadReport} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
              <input
                type="text"
                value={sampleCode}
                onChange={(e) => setSampleCode(e.target.value)}
                placeholder="Enter Sample Code (e.g. SMP000001)"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#8CED00] font-mono text-sm"
                required
              />
            </div>
            <button
              type="submit"
              disabled={downloading}
              className="btn-theme-lime px-6 py-2.5 text-slate-900 font-extrabold text-sm shadow-md transition-all duration-200 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 rounded-xl"
            >
              <FiDownload size={16} />
              <span>{downloading ? "Generating PDF..." : "Generate & Download PDF"}</span>
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Available Samples</p>
            <div className="max-h-36 overflow-auto space-y-1.5 pr-1">
              {samples.map((sample) => {
                const code = sample.sample_code;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setSampleCode(code)}
                    className="w-full flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 px-3 py-2 text-left text-sm text-slate-700 dark:text-slate-200 hover:border-[#8CED00]"
                  >
                    <span className="flex items-center gap-2 font-mono text-xs text-[#6AB800] dark:text-[#8CED00] font-bold">
                      <FiTag className="text-slate-400" />
                      {code}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{sample.status}</span>
                  </button>
                );
              })}
              {!samples.length && <p className="text-xs text-slate-400">No samples available yet.</p>}
            </div>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 dark:text-rose-300 text-xs font-mono font-medium">
              {error}
            </div>
          )}
        </form>
      </div>

      {/* Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#161324]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg space-y-3">
          <div className="flex items-center justify-between text-[#6AB800] dark:text-[#8CED00]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider">Patients Audited</span>
            <FiUsers size={20} />
          </div>
          <p className="text-2xl font-extrabold font-mono text-[#2D2342] dark:text-white">{patients.length} Records</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Clinical files logged across active laboratory workflows.</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#161324]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg space-y-3">
          <div className="flex items-center justify-between text-[#00D8C9]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider">Samples Processed</span>
            <FiActivity size={20} />
          </div>
          <p className="text-2xl font-extrabold font-mono text-[#2D2342] dark:text-white">{samples.length} Specimens</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Collection, microscopic analysis, and status logged.</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#161324]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg space-y-3">
          <div className="flex items-center justify-between text-indigo-500">
            <span className="text-xs font-mono font-bold uppercase tracking-wider">AI Classifications</span>
            <FiCpu size={20} />
          </div>
          <p className="text-2xl font-extrabold font-mono text-[#2D2342] dark:text-white">Seamless Pipeline</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Select a sample code, execute prediction, and export PDF report.</p>
        </div>
      </div>
    </div>
  );
}
