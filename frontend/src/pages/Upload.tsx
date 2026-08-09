import { useEffect, useState } from "react";
import { FiUploadCloud, FiFile, FiCheckCircle, FiAlertCircle, FiTag, FiRefreshCw } from "react-icons/fi";
import api from "../services/api";
import type { SampleRecord, ImageRecord } from "../services/contracts";

export default function Upload() {
  const [sampleCode, setSampleCode] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
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

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a blood smear image to upload.");
      return;
    }

    if (!sampleCode) {
      setMessage("Please specify a sample code (e.g. SMP000001).");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setMessage("");

    try {
      const response = await api.post<ImageRecord>(`/images/upload/${sampleCode}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(`Smear image ${response.data.image_name} uploaded successfully for sample ${response.data.sample_code}.`);
    } catch (err: any) {
      const detail = err?.response?.data?.detail;
      setMessage(detail || "Image upload failed. Please verify the sample code exists.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Card */}
      <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 shadow-xl flex items-center gap-4">
        <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
          <FiUploadCloud size={26} />
        </div>
        <div>
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
            Microscopy Ingestion
          </div>
          <h2 className="text-xl font-bold text-white">Upload Smear Image</h2>
        </div>
      </div>

      {/* Main Upload Form Card */}
      <div className="relative rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-8 shadow-2xl overflow-hidden">
        {loading && <div className="animate-scanline" />}

        <form onSubmit={handleUpload} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Sample Code
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={sampleCode}
                onChange={(e) => setSampleCode(e.target.value)}
                placeholder="e.g. SMP000001"
                className="flex-1 w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 font-mono text-sm transition-all"
                list="sample-codes"
                required
              />
              <button
                type="button"
                onClick={fetchSamples}
                className="px-4 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 flex items-center justify-center gap-2 w-full sm:w-auto shrink-0"
              >
                <FiRefreshCw className={refreshing ? "animate-spin" : ""} />
                <span>Refresh</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 font-mono">
              Use the backend sample code (e.g. SMP000001). The list below shows current active samples.
            </p>
            <datalist id="sample-codes">
              {samples.map((sample) => (
                <option key={sample.sample_code} value={sample.sample_code} />
              ))}
            </datalist>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Available Samples</p>
              <span className="text-xs text-cyan-400 font-mono">{samples.length} loaded</span>
            </div>
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

          {/* File Drag and Drop / Picker Box */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Blood Smear Microscopic Image
            </label>

            <label className="relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl border-2 border-dashed border-slate-700/80 hover:border-cyan-500/50 bg-slate-950/50 hover:bg-slate-950/80 transition-all cursor-pointer group">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
                required
              />

              <div className="p-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform mb-3">
                <FiUploadCloud size={32} />
              </div>

              {file ? (
                <div className="flex items-center gap-2 text-cyan-300 font-mono text-sm font-semibold">
                  <FiFile />
                  <span>{file.name}</span>
                  <span className="text-xs text-slate-500">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
              ) : (
                <div className="text-center space-y-1">
                  <p className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                    Click or drag blood smear image file here
                  </p>
                  <p className="text-xs text-slate-500 font-mono">
                    Supports high-resolution PNG, JPG, JPEG microscopy slides
                  </p>
                </div>
              )}
            </label>
          </div>

          {/* Feedback Message */}
          {message && (
            <div
              className={`p-4 rounded-xl border text-xs font-mono font-medium flex items-center gap-2 ${
                message.toLowerCase().includes("success") || message.toLowerCase().includes("ingested")
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                  : "bg-rose-500/10 border-rose-500/30 text-rose-300"
              }`}
            >
              {message.toLowerCase().includes("success") || message.toLowerCase().includes("ingested") ? (
                <FiCheckCircle size={16} />
              ) : (
                <FiAlertCircle size={16} />
              )}
              <span>{message}</span>
            </div>
          )}

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <span>{loading ? "Uploading & Processing Image..." : "Upload Microscopic Image"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
