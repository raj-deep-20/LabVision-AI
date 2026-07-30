import { useState } from "react";
import { FiUploadCloud, FiFile, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import api from "../services/api";

export default function Upload() {
  const [sampleId, setSampleId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a blood smear image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setMessage("");

    try {
      await api.post(`/images/upload/${sampleId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Smear image ingested successfully into vision queue.");
    } catch (err: any) {
      setMessage(err?.response?.data?.detail || "Image upload failed. Please verify sample ID.");
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
        {/* Scanbeam overlay during upload */}
        {loading && <div className="animate-scanline" />}

        <form onSubmit={handleUpload} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Sample ID
            </label>
            <input
              type="text"
              value={sampleId}
              onChange={(e) => setSampleId(e.target.value)}
              placeholder="e.g. 1"
              className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 font-mono text-sm transition-all"
              required
            />
            <p className="text-[11px] text-slate-400 mt-1 font-mono">
              Target sample identifier stored in the laboratory registry.
            </p>
          </div>

          {/* File Drag and Drop / Picker Box */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Blood Smear Microscopic Image
            </label>

            <label className="relative flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-slate-700/80 hover:border-cyan-500/50 bg-slate-950/50 hover:bg-slate-950/80 transition-all cursor-pointer group">
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
            <span>{loading ? "Ingesting & Analyzing Image..." : "Upload Microscopic Image"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
