import { useEffect, useState } from "react";
import { FiActivity, FiRefreshCw, FiAlertCircle, FiTag, FiUser, FiCalendar, FiFileText } from "react-icons/fi";
import api from "../services/api";
import type { PatientRecord, SampleCreatePayload, SampleRecord } from "../services/contracts";

export default function Samples() {
  const [samples, setSamples] = useState<SampleRecord[]>([]);
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState<SampleCreatePayload>({
    patient_code: "",
    sample_type: "Blood Smear",
    collection_date: new Date().toISOString().split("T")[0],
    remarks: "",
  });

  function fetchSamples() {
    setLoading(true);
    Promise.all([
      api.get<SampleRecord[]>("/samples/"),
      api.get<PatientRecord[]>("/patients/"),
    ])
      .then(([sampleResponse, patientResponse]) => {
        setSamples(sampleResponse.data);
        setPatients(patientResponse.data);
      })
      .catch(() => {
        setSamples([]);
        setPatients([]);
      })
      .finally(() => setLoading(false));
  }

  async function handleCreateSample(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const response = await api.post<SampleRecord>("/samples/", {
        ...form,
        remarks: form.remarks?.trim() ? form.remarks : null,
      });

      const newSample = response.data;
      const code = newSample.sample_code || "SMP";

      setSamples((current) => [newSample, ...current]);
      setForm({
        patient_code: "",
        sample_type: "Blood Smear",
        collection_date: new Date().toISOString().split("T")[0],
        remarks: "",
      });
      setMessage(`Sample ${code} created successfully.`);
    } catch (error: any) {
      const detail = error?.response?.data?.detail;
      if (Array.isArray(detail)) {
        setMessage(detail.map((err: any) => `${err.loc?.join(" -> ")}: ${err.msg}`).join("; "));
      } else {
        setMessage(detail || "Failed to create sample.");
      }
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    fetchSamples();
  }, []);

  function getStatusBadge(status: string) {
    const s = status.toLowerCase();
    if (s.includes("completed") || s.includes("analyzed") || s.includes("ready")) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 font-mono text-xs font-bold">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {status}
        </span>
      );
    }
    if (s.includes("pending") || s.includes("processing") || s.includes("in progress")) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#8CED00]/15 border border-[#8CED00]/30 text-[#6AB800] dark:text-[#8CED00] font-mono text-xs font-bold">
          <span className="h-1.5 w-1.5 rounded-full bg-[#8CED00] animate-pulse" />
          {status}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-mono text-xs font-semibold">
        <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
        {status}
      </span>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-6">
        <div className="rounded-2xl bg-white/80 dark:bg-[#161324]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#00E5D1]/15 border border-[#00E5D1]/30 text-[#00D8C9]">
              <FiActivity size={22} />
            </div>
            <div>
              <div className="text-xs font-mono text-[#00D8C9] uppercase tracking-widest font-bold">
                Specimen Intake
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#2D2342] dark:text-white">Create Sample Record</h2>
            </div>
          </div>

          <form onSubmit={handleCreateSample} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Patient Code (e.g. PAT000001)
              </label>
              <input
                type="text"
                value={form.patient_code}
                onChange={(e) => setForm((current) => ({ ...current, patient_code: e.target.value.trim() }))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-[#8CED00] font-mono text-sm"
                placeholder="PAT000001"
                pattern="^PAT\d{6}$"
                required
              />
              <p className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                Select a patient from the list on the right or type the public patient code (e.g., PAT000001).
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Sample Type
              </label>
              <select
                value={form.sample_type}
                onChange={(e) => setForm((current) => ({ ...current, sample_type: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-[#8CED00] font-mono text-sm"
                required
              >
                <option value="Blood Smear">Blood Smear</option>
                <option value="Urine">Urine</option>
                <option value="Tissue">Tissue</option>
                <option value="CSF">CSF</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Collection Date
              </label>
              <input
                type="date"
                value={form.collection_date}
                onChange={(e) => setForm((current) => ({ ...current, collection_date: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-[#8CED00] font-mono text-sm"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Remarks
              </label>
              <div className="relative">
                <FiFileText className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
                <textarea
                  value={form.remarks || ""}
                  onChange={(e) => setForm((current) => ({ ...current, remarks: e.target.value }))}
                  className="w-full min-h-20 pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-[#8CED00] text-sm"
                  placeholder="Optional clinical remarks"
                />
              </div>
            </div>

            {message && (
              <div className="sm:col-span-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-mono">
                {message}
              </div>
            )}

            <div className="sm:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="btn-theme-cyan px-6 py-2.5 text-slate-900 font-extrabold text-sm shadow-md transition-all duration-200 active:scale-95 disabled:opacity-50 rounded-xl"
              >
                {saving ? "Creating sample..." : "Create Sample"}
              </button>
            </div>
          </form>
        </div>

        <div className="rounded-2xl bg-white/80 dark:bg-[#161324]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-mono text-[#00D8C9] uppercase tracking-widest font-bold">Sample Registry</div>
              <h3 className="text-lg font-bold text-[#2D2342] dark:text-white">Current Samples</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#00D8C9] font-mono text-xs font-bold">
              {samples.length} Records
            </span>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 p-3.5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Patient Reference List</p>
            <div className="max-h-36 overflow-auto space-y-1.5 pr-1">
              {patients.map((patient) => {
                const pCode = patient.patient_code || patient.patient_id || "";
                return (
                  <button
                    key={pCode}
                    type="button"
                    onClick={() => setForm((current) => ({ ...current, patient_code: pCode }))}
                    className="w-full flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:border-[#8CED00]"
                  >
                    <span className="flex items-center gap-2 font-mono text-xs text-[#6AB800] dark:text-[#8CED00] font-bold">
                      <FiUser className="text-slate-400" />
                      {pCode}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{patient.name}</span>
                  </button>
                );
              })}
              {!patients.length && <p className="text-xs text-slate-400">No patients loaded yet.</p>}
            </div>
          </div>

          <div className="space-y-3 max-h-[20rem] overflow-auto pr-1">
            {samples.map((sample) => {
              const sCode = sample.sample_code || "SMP";
              const pCode = sample.patient_code || "PAT";
              return (
                <div key={sCode} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-[#2D2342] dark:text-white flex items-center gap-2 font-mono">
                        <FiTag className="text-slate-400" /> {sCode}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1 font-mono">
                        <FiUser /> Patient: <span className="text-[#6AB800] dark:text-[#8CED00] font-bold">{pCode}</span>
                      </p>
                    </div>
                    {getStatusBadge(sample.status)}
                  </div>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                    {sample.sample_type}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400 flex items-center gap-1.5 font-mono">
                    <FiCalendar /> {sample.collection_date}
                  </p>
                  {sample.remarks && <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 italic">{sample.remarks}</p>}
                </div>
              );
            })}

            {!loading && samples.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-6 text-center text-slate-400 text-xs">
                No sample records yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white/80 dark:bg-[#161324]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#00E5D1]/15 border border-[#00E5D1]/30 text-[#00D8C9]">
            <FiActivity size={22} />
          </div>
          <div>
            <div className="text-xs font-mono text-[#00D8C9] uppercase tracking-widest font-bold">
              Specimen Tracker
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#2D2342] dark:text-white">Sample Lifecycle</h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#00D8C9] font-mono text-xs font-bold">
            {samples.length} Active Specimens
          </span>
          <button
            onClick={fetchSamples}
            title="Refresh list"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all active:scale-95 border border-slate-200 dark:border-slate-700"
          >
            <FiRefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="rounded-2xl bg-white/80 dark:bg-[#161324]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <FiRefreshCw size={28} className="animate-spin mx-auto text-[#00D8C9]" />
            <p className="text-xs font-mono">Loading specimen lifecycle data...</p>
          </div>
        ) : samples.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <FiAlertCircle size={32} className="mx-auto text-amber-500" />
            <h3 className="text-base font-bold text-[#2D2342] dark:text-slate-200">No Samples Available</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              No lab specimens have been uploaded or cataloged yet. Use the intake form above to register a new sample.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <th className="py-3.5 px-5">Sample Code</th>
                  <th className="py-3.5 px-5">Patient Code</th>
                  <th className="py-3.5 px-5">Specimen Type</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5">Collection Date</th>
                  <th className="py-3.5 px-5">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 text-sm">
                {samples.map((sample) => {
                  const sCode = sample.sample_code || "SMP";
                  const pCode = sample.patient_code || "PAT";
                  return (
                    <tr key={sCode} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-5 font-mono text-[#00D8C9] font-bold text-xs flex items-center gap-2">
                        <FiTag className="text-slate-400" />
                        <span>{sCode}</span>
                      </td>
                      <td className="py-4 px-5 font-mono text-[#6AB800] dark:text-[#8CED00] font-bold text-xs">
                        {pCode}
                      </td>
                      <td className="py-4 px-5 font-medium text-[#2D2342] dark:text-slate-200">
                        {sample.sample_type}
                      </td>
                      <td className="py-4 px-5">
                        {getStatusBadge(sample.status)}
                      </td>
                      <td className="py-4 px-5 font-mono text-slate-500 dark:text-slate-400 text-xs">
                        {sample.collection_date}
                      </td>
                      <td className="py-4 px-5 text-slate-500 dark:text-slate-400 text-xs italic">
                        {sample.remarks || "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
