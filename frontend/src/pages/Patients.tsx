import { useEffect, useState } from "react";
import { FiUsers, FiUserCheck, FiRefreshCw, FiAlertCircle, FiPhone, FiCalendar } from "react-icons/fi";
import api from "../services/api";
import type { PatientCreatePayload, PatientRecord } from "../services/contracts";

export default function Patients() {
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState<PatientCreatePayload>({
    name: "",
    age: 30,
    gender: "Male",
    blood_group: "O+",
    phone: "",
    doctor: "",
    visit_date: new Date().toISOString().split("T")[0],
  });

  function fetchPatients() {
    setLoading(true);
    api
      .get<PatientRecord[]>("/patients/")
      .then((res) => setPatients(res.data))
      .catch(() => setPatients([]))
      .finally(() => setLoading(false));
  }

  async function handleCreatePatient(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const response = await api.post<PatientRecord>("/patients/", {
        ...form,
        age: Number(form.age),
      });

      const newRecord = response.data;
      const code = newRecord.patient_code || newRecord.patient_id || "Record";

      setPatients((current) => [newRecord, ...current]);
      setForm({
        name: "",
        age: 30,
        gender: "Male",
        blood_group: "O+",
        phone: "",
        doctor: "",
        visit_date: new Date().toISOString().split("T")[0],
      });
      setMessage(`Patient ${code} created successfully.`);
    } catch (error: any) {
      const detail = error?.response?.data?.detail;
      if (Array.isArray(detail)) {
        setMessage(detail.map((err: any) => `${err.loc?.join(" -> ")}: ${err.msg}`).join("; "));
      } else {
        setMessage(detail || "Failed to create patient record.");
      }
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 shadow-xl p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <FiUsers size={24} />
            </div>
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                Clinical Registry
              </div>
              <h2 className="text-xl font-bold text-white">Create Patient Record</h2>
            </div>
          </div>

          <form onSubmit={handleCreatePatient} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60"
                placeholder="Patient full name"
                required
                minLength={2}
                maxLength={100}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Age
              </label>
              <input
                type="number"
                min={1}
                max={119}
                value={form.age || ""}
                onChange={(e) => setForm((current) => ({ ...current, age: Number(e.target.value) }))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 font-mono"
                placeholder="Age"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Gender
              </label>
              <select
                value={form.gender}
                onChange={(e) => setForm((current) => ({ ...current, gender: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60"
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Blood Group
              </label>
              <select
                value={form.blood_group}
                onChange={(e) => setForm((current) => ({ ...current, blood_group: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 font-mono"
                required
              >
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Attending Doctor
              </label>
              <input
                value={form.doctor}
                onChange={(e) => setForm((current) => ({ ...current, doctor: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60"
                placeholder="Dr. Smith"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Visit Date
              </label>
              <input
                type="date"
                value={form.visit_date}
                onChange={(e) => setForm((current) => ({ ...current, visit_date: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 font-mono"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Phone Number (10–15 digits)
              </label>
              <div className="relative">
                <FiPhone className="absolute left-3.5 top-3.5 text-slate-500" size={16} />
                <input
                  value={form.phone}
                  onChange={(e) => setForm((current) => ({ ...current, phone: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 font-mono"
                  placeholder="e.g. 9876543210"
                  pattern="^\d{10,15}$"
                  required
                />
              </div>
            </div>

            {message && (
              <div className="sm:col-span-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-sm text-slate-300 font-mono">
                {message}
              </div>
            )}

            <div className="sm:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200 active:scale-95 disabled:opacity-50"
              >
                {saving ? "Creating patient..." : "Create Patient"}
              </button>
            </div>
          </form>
        </div>

        <div className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 shadow-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Registry Summary</div>
              <h3 className="text-lg font-bold text-white">Current Patients</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-cyan-400 font-mono text-xs font-semibold">
              {patients.length} Records
            </span>
          </div>

          <div className="space-y-3 max-h-[22rem] overflow-auto pr-1">
            {patients.map((patient) => {
              const code = patient.patient_code || patient.patient_id || "PAT";
              return (
                <div key={code} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{patient.name}</p>
                      <p className="text-xs text-slate-400 font-mono">{code}</p>
                    </div>
                    <span className="text-xs font-mono text-cyan-400">{patient.blood_group}</span>
                  </div>
                  <p className="mt-3 text-xs text-slate-400">
                    Age {patient.age} | {patient.gender} | Dr. {patient.doctor}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 flex items-center gap-1.5 font-mono">
                    <FiCalendar /> {patient.visit_date}
                  </p>
                </div>
              );
            })}

            {!loading && patients.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-700 p-6 text-center text-slate-400 text-sm">
                No patient records yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <FiUsers size={24} />
          </div>
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              Clinical Registry
            </div>
            <h2 className="text-xl font-bold text-white">Patient Database</h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-cyan-400 font-mono text-xs font-semibold">
            {patients.length} Registered Records
          </span>
          <button
            onClick={fetchPatients}
            title="Refresh list"
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-all active:scale-95 border border-slate-700/60"
          >
            <FiRefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Table / Content Card */}
      <div className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 shadow-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <FiRefreshCw size={28} className="animate-spin mx-auto text-cyan-400" />
            <p className="text-sm font-mono">Fetching clinical patient records...</p>
          </div>
        ) : patients.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <FiAlertCircle size={32} className="mx-auto text-amber-400" />
            <h3 className="text-base font-semibold text-slate-200">No Patient Records Found</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              No patient files have been registered yet. Create a patient entry above to populate the registry.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/60 border-b border-slate-800 text-xs font-mono uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 px-5">Patient Name</th>
                  <th className="py-3.5 px-5">Patient Code</th>
                  <th className="py-3.5 px-5">Age / Gender</th>
                  <th className="py-3.5 px-5">Blood Group</th>
                  <th className="py-3.5 px-5">Attending Doctor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {patients.map((patient) => {
                  const code = patient.patient_code || patient.patient_id || "PAT";
                  return (
                    <tr
                      key={code}
                      className="hover:bg-slate-800/40 transition-colors duration-150 group"
                    >
                      <td className="py-4 px-5 font-medium text-white flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs">
                          {patient.name.charAt(0).toUpperCase()}
                        </div>
                        <span>{patient.name}</span>
                      </td>
                      <td className="py-4 px-5 font-mono text-cyan-400 font-semibold text-xs">
                        {code}
                      </td>
                      <td className="py-4 px-5 font-mono text-slate-300 text-xs">
                        {patient.age} Yrs / <span className="capitalize">{patient.gender}</span>
                      </td>
                      <td className="py-4 px-5">
                        <span className="inline-block px-2.5 py-0.5 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono font-bold text-xs">
                          {patient.blood_group}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-slate-300 text-xs flex items-center gap-2">
                        <FiUserCheck className="text-emerald-400" />
                        <span>{patient.doctor}</span>
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
