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
      <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <FiCpu size={26} />
          </div>
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              Neural Diagnostic Engine
            </div>
            <h2 className="text-xl font-bold text-white">AI Cell Classification</h2>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold">
          Model: ResNet-TensorFlow v2.4
        </span>
      </div>

      {/* Input Form Card */}
      <div className="relative rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-8 shadow-2xl overflow-hidden">
        {loading && <div className="animate-scanline" />}

        <form onSubmit={handlePredict} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Sample Code
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={sampleCode}
                onChange={(e) => setSampleCode(e.target.value)}
                placeholder="e.g. SMP000001"
                list="prediction-samples"
                className="flex-1 px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 font-mono text-sm transition-all"
                required
              />
              <button
                type="button"
                onClick={fetchSamples}
                className="px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 flex items-center gap-2"
              >
                <FiRefreshCw className={refreshing ? "animate-spin" : ""} />
                Refresh
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200 active:scale-95 disabled:opacity-50 flex items-center gap-2"
              >
                <FiCpu size={18} />
                <span>{loading ? "Analyzing Microscopic Features..." : "Execute AI Prediction"}</span>
              </button>
            </div>
            <datalist id="prediction-samples">
              {samples.map((sample) => (
                <option key={sample.sample_code} value={sample.sample_code} />
              ))}
            </datalist>
            <div className="mt-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Sample Registry</p>
              <div className="max-h-40 overflow-auto space-y-2 pr-1">
                {samples.map((sample) => {
                  const code = sample.sample_code;
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setSampleCode(code)}
                      className="w-full flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-left text-sm text-slate-200 hover:border-cyan-500/40 hover:bg-slate-800/70"
                    >
                      <span className="flex items-center gap-2 font-mono">
                        <FiTag className="text-slate-500" />
                        {code}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{sample.status}</span>
                    </button>
                  );
                })}
                {!samples.length && <p className="text-sm text-slate-400">No samples available yet.</p>}
              </div>
            </div>
          </div>

          {message && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono font-medium">
              {message}
            </div>
          )}
        </form>
      </div>

      {/* Prediction Output Results Display */}
      {result && (
        <div className="rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-cyan-500/30 p-8 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Top Status Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                Diagnostic Prediction Outcome
              </span>
              <div className="flex items-center gap-3 mt-1">
                <h3 className="text-2xl font-black text-white tracking-tight">
                  {result.disease}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full font-mono text-xs font-bold border ${
                    isPositive
                      ? "bg-rose-500/15 border-rose-500/40 text-rose-400"
                      : "bg-emerald-500/15 border-emerald-500/40 text-emerald-400"
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
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 self-start sm:self-auto"
            >
              <FiDownload size={16} />
              <span>{downloading ? "Generating PDF..." : "Download PDF Clinical Report"}</span>
            </button>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Confidence Metric Card */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Confidence</span>
              <p className="text-xl font-bold font-mono text-cyan-400">
                {(result.confidence * 100).toFixed(1)}%
              </p>
            </div>

            {/* RBC Count Metric */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase">RBC Count</span>
              <p className="text-xl font-bold font-mono text-slate-100">
                {result.rbc_count.toLocaleString()} <span className="text-xs font-normal text-slate-500">/µL</span>
              </p>
            </div>

            {/* WBC Count Metric */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase">WBC Count</span>
              <p className="text-xl font-bold font-mono text-slate-100">
                {result.wbc_count.toLocaleString()} <span className="text-xs font-normal text-slate-500">/µL</span>
              </p>
            </div>

            {/* Platelets Metric */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Platelets</span>
              <p className="text-xl font-bold font-mono text-slate-100">
                {result.platelet_count.toLocaleString()} <span className="text-xs font-normal text-slate-500">/µL</span>
              </p>
            </div>
          </div>

          {/* Metadata Footer Details */}
          <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800/80 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-2">
            <div className="flex items-center gap-2">
              <FiLayers className="text-indigo-400" />
              <span>Image Quality Rating: <strong className="text-slate-200">{result.image_quality}</strong></span>
            </div>
            <div>
              <span>Sample Code: <strong className="text-cyan-400">{result.sample_code}</strong></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
