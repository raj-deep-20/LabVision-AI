import { useEffect, useState } from "react";
import { FiCpu, FiDownload, FiCheckCircle, FiAlertTriangle, FiLayers, FiTag, FiRefreshCw } from "react-icons/fi";
import api from "../services/api";
import type { PredictionRecord, SampleRecord } from "../services/contracts";

export default function Prediction() {
  const [sampleCode, setSampleCode] = useState("");
  const [result, setResult] = useState<PredictionRecord | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [samples, setSamples] = useState<SampleRecord[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchSamples() {
    setRefreshing(true);
    try {
      const response = await api.get<SampleRecord[]>("/samples/");
      setSamples(response.data);
    } catch {
      setSamples([]);
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchSamples();
  }, []);

  async function handlePredict(e: React.FormEvent) {
    e.preventDefault();
    if (!sampleCode) return;

    setLoading(true);
    setMessage("");
    setResult(null);

    try {
      const res = await api.post<PredictionRecord>(`/predictions/${sampleCode}`);
      setResult(res.data);
    } catch (err: any) {
      const detail = err?.response?.data?.detail;
      setMessage(detail || "AI prediction failed. Please ensure the sample code exists and an image has been uploaded.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDownloadReport(code: string) {
    setDownloading(true);
    try {
      const response = await api.get(`/reports/${code}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `LabVision_Report_${code}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      const detail = err?.response?.data?.detail;
      alert(detail || "Failed to download report. Please check server logs.");
    } finally {
      setDownloading(false);
    }
  }

  const isPositive = result?.disease.toLowerCase().includes("+ve") || result?.disease.toLowerCase().includes("positive");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Card */}
      <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#161324]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#8CED00]/15 border border-[#8CED00]/30 text-[#6AB800] dark:text-[#8CED00]">
            <FiCpu size={24} />
          </div>
          <div>
            <div className="text-xs font-mono text-[#6AB800] dark:text-[#8CED00] uppercase tracking-widest font-bold">
              Neural Diagnostic Engine
            </div>
            <h2 className="text-xl font-extrabold text-[#2D2342] dark:text-white">AI Cell Classification</h2>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-[#8CED00]/15 border border-[#8CED00]/30 text-[#6AB800] dark:text-[#8CED00] font-mono text-xs font-bold self-start sm:self-auto">
          Model: ResNet-TensorFlow v2.4
        </span>
      </div>

      {/* Input Form Card */}
      <div className="relative rounded-3xl bg-white/80 dark:bg-[#161324]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-xl overflow-hidden">
        {loading && <div className="animate-scanline" />}

        <form onSubmit={handlePredict} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Sample Code
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={sampleCode}
                onChange={(e) => setSampleCode(e.target.value)}
                placeholder="e.g. SMP000001"
                list="prediction-samples"
                className="flex-1 w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#8CED00] font-mono text-sm"
                required
              />
              <button
                type="button"
                onClick={fetchSamples}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 w-full sm:w-auto shrink-0 font-semibold text-xs"
              >
                <FiRefreshCw className={refreshing ? "animate-spin" : ""} />
                <span>Refresh</span>
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-theme-lime px-6 py-2.5 text-slate-900 font-extrabold text-sm shadow-md transition-all duration-200 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl"
              >
                <FiCpu size={16} />
                <span>{loading ? "Analyzing..." : "Execute AI Prediction"}</span>
              </button>
            </div>
            <datalist id="prediction-samples">
              {samples.map((sample) => (
                <option key={sample.sample_code} value={sample.sample_code} />
              ))}
            </datalist>

            <div className="mt-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Sample Registry</p>
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
          </div>

          {message && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 dark:text-rose-300 text-xs font-mono font-medium">
              {message}
            </div>
          )}
        </form>
      </div>

      {/* Prediction Output Results */}
      {result && (
        <div className="rounded-3xl bg-white/90 dark:bg-[#161324]/90 backdrop-blur-xl border border-[#8CED00]/40 p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
          {/* Status Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">
                Diagnostic Prediction Outcome
              </span>
              <div className="flex items-center gap-3 mt-1">
                <h3 className="text-2xl font-extrabold text-[#2D2342] dark:text-white tracking-tight">
                  {result.disease}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full font-mono text-xs font-bold border ${
                    isPositive
                      ? "bg-rose-500/15 border-rose-500/40 text-rose-500 dark:text-rose-400"
                      : "bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
                  }`}
                >
                  {isPositive ? (
                    <span className="flex items-center gap-1">
                      <FiAlertTriangle /> Clinical Action Advised
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <FiCheckCircle /> Smear Unaffected
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* PDF Report Download Button */}
            <button
              onClick={() => handleDownloadReport(sampleCode)}
              disabled={downloading}
              className="btn-theme-cyan px-5 py-2.5 text-slate-900 font-extrabold text-sm shadow-md transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 self-start sm:self-auto rounded-xl"
            >
              <FiDownload size={16} />
              <span>{downloading ? "Generating PDF..." : "Download PDF Report"}</span>
            </button>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Confidence</span>
              <p className="text-xl font-extrabold font-mono text-[#6AB800] dark:text-[#8CED00]">
                {(result.confidence * 100).toFixed(1)}%
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">RBC Count</span>
              <p className="text-xl font-extrabold font-mono text-[#2D2342] dark:text-slate-100">
                {result.rbc_count.toLocaleString()} <span className="text-xs font-normal text-slate-400">/µL</span>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">WBC Count</span>
              <p className="text-xl font-extrabold font-mono text-[#2D2342] dark:text-slate-100">
                {result.wbc_count.toLocaleString()} <span className="text-xs font-normal text-slate-400">/µL</span>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Platelets</span>
              <p className="text-xl font-extrabold font-mono text-[#2D2342] dark:text-slate-100">
                {result.platelet_count.toLocaleString()} <span className="text-xs font-normal text-slate-400">/µL</span>
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 gap-2">
            <div className="flex items-center gap-2">
              <FiLayers className="text-[#00D8C9]" />
              <span>Image Quality Rating: <strong className="text-slate-800 dark:text-slate-200">{result.image_quality}</strong></span>
            </div>
            <div>
              <span>Sample Code: <strong className="text-[#6AB800] dark:text-[#8CED00]">{result.sample_code}</strong></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
