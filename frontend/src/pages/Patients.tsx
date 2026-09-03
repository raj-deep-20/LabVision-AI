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
        <div className="rounded-2xl bg-white/80 dark:bg-[#161324]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#8CED00]/15 border border-[#8CED00]/30 text-[#6AB800] dark:text-[#8CED00]">
              <FiUsers size={22} />
            </div>
            <div>
              <div className="text-xs font-mono text-[#6AB800] dark:text-[#8CED00] uppercase tracking-widest font-bold">
                Clinical Registry
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#2D2342] dark:text-white">Create Patient Record</h2>
            </div>
          </div>

          <form onSubmit={handleCreatePatient} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#8CED00] text-sm"
                placeholder="Patient full name"
                required
                minLength={2}
                maxLength={100}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Age
              </label>
              <input
                type="number"
                min={1}
                max={119}
                value={form.age || ""}
                onChange={(e) => setForm((current) => ({ ...current, age: Number(e.target.value) }))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-[#8CED00] font-mono text-sm"
                placeholder="Age"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Gender
              </label>
              <select
                value={form.gender}
                onChange={(e) => setForm((current) => ({ ...current, gender: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-[#8CED00] text-sm"
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Blood Group
              </label>
              <select
                value={form.blood_group}
                onChange={(e) => setForm((current) => ({ ...current, blood_group: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-[#8CED00] font-mono text-sm"
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
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Attending Doctor
              </label>
              <input
                value={form.doctor}
                onChange={(e) => setForm((current) => ({ ...current, doctor: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-[#8CED00] text-sm"
                placeholder="Dr. Smith"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Visit Date
              </label>
              <input
                type="date"
                value={form.visit_date}
                onChange={(e) => setForm((current) => ({ ...current, visit_date: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-[#8CED00] font-mono text-sm"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Phone Number (10–15 digits)
              </label>
              <div className="relative">
                <FiPhone className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
                <input
                  value={form.phone}
                  onChange={(e) => setForm((current) => ({ ...current, phone: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-[#8CED00] font-mono text-sm"
                  placeholder="e.g. 9876543210"
                  pattern="^\d{10,15}$"
                  required
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
                className="btn-theme-lime px-6 py-2.5 text-slate-900 font-extrabold text-sm shadow-md transition-all duration-200 active:scale-95 disabled:opacity-50 rounded-xl"
              >
                {saving ? "Creating patient..." : "Create Patient"}
              </button>
            </div>
          </form>
        </div>

        <div className="rounded-2xl bg-white/80 dark:bg-[#161324]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-mono text-[#6AB800] dark:text-[#8CED00] uppercase tracking-widest font-bold">Registry Summary</div>
              <h3 className="text-lg font-bold text-[#2D2342] dark:text-white">Current Patients</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#6AB800] dark:text-[#8CED00] font-mono text-xs font-bold">
              {patients.length} Records
            </span>
          </div>

          <div className="space-y-3 max-h-[22rem] overflow-auto pr-1">
            {patients.map((patient) => {
              const code = patient.patient_code || patient.patient_id || "PAT";
              return (
                <div key={code} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-[#2D2342] dark:text-white">{patient.name}</p>
                      <p className="text-xs text-[#6AB800] dark:text-[#8CED00] font-mono font-bold">{code}</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#00D8C9]">{patient.blood_group}</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                    Age {patient.age} | {patient.gender} | Dr. {patient.doctor}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400 flex items-center gap-1.5 font-mono">
                    <FiCalendar /> {patient.visit_date}
                  </p>
                </div>
              );
            })}

            {!loading && patients.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-6 text-center text-slate-400 text-xs">
                No patient records yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white/80 dark:bg-[#161324]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#8CED00]/15 border border-[#8CED00]/30 text-[#6AB800] dark:text-[#8CED00]">
            <FiUsers size={22} />
          </div>
          <div>
            <div className="text-xs font-mono text-[#6AB800] dark:text-[#8CED00] uppercase tracking-widest font-bold">
              Clinical Registry
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#2D2342] dark:text-white">Patient Database</h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#6AB800] dark:text-[#8CED00] font-mono text-xs font-bold">
            {patients.length} Registered Records
          </span>
          <button
            onClick={fetchPatients}
            title="Refresh list"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all active:scale-95 border border-slate-200 dark:border-slate-700"
          >
            <FiRefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="rounded-2xl bg-white/80 dark:bg-[#161324]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <FiRefreshCw size={28} className="animate-spin mx-auto text-[#8CED00]" />
            <p className="text-xs font-mono">Fetching clinical patient records...</p>
          </div>
        ) : patients.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <FiAlertCircle size={32} className="mx-auto text-amber-500" />
            <h3 className="text-base font-bold text-[#2D2342] dark:text-slate-200">No Patient Records Found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              No patient files have been registered yet. Create a patient entry above to populate the registry.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <th className="py-3.5 px-5">Patient Name</th>
                    <th className="py-3.5 px-5">Patient Code</th>
                    <th className="py-3.5 px-5">Age / Gender</th>
                    <th className="py-3.5 px-5">Blood Group</th>
                    <th className="py-3.5 px-5">Attending Doctor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 text-sm">
                  {patients.map((patient) => {
                    const code = patient.patient_code || patient.patient_id || "PAT";
                    return (
                      <tr
                        key={code}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors duration-150"
                      >
                        <td className="py-4 px-5 font-bold text-[#2D2342] dark:text-white flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#8CED00]/15 border border-[#8CED00]/30 flex items-center justify-center text-[#6AB800] dark:text-[#8CED00] font-extrabold text-xs">
                            {patient.name.charAt(0).toUpperCase()}
                          </div>
                          <span>{patient.name}</span>
                        </td>
                        <td className="py-4 px-5 font-mono text-[#6AB800] dark:text-[#8CED00] font-bold text-xs">
                          {code}
                        </td>
                        <td className="py-4 px-5 font-mono text-slate-600 dark:text-slate-300 text-xs">
                          {patient.age} Yrs / <span className="capitalize">{patient.gender}</span>
                        </td>
                        <td className="py-4 px-5">
                          <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#00E5D1]/15 border border-[#00E5D1]/30 text-[#00D8C9] font-mono font-bold text-xs">
                            {patient.blood_group}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-slate-600 dark:text-slate-300 text-xs flex items-center gap-2">
                          <FiUserCheck className="text-emerald-500" />
                          <span>{patient.doctor}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="block md:hidden divide-y divide-slate-200 dark:divide-slate-800/60">
              {patients.map((patient) => {
                const code = patient.patient_code || patient.patient_id || "PAT";
                return (
                  <div key={code} className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#8CED00]/15 border border-[#8CED00]/30 flex items-center justify-center text-[#6AB800] dark:text-[#8CED00] font-bold text-xs">
                          {patient.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#2D2342] dark:text-white">{patient.name}</p>
                          <p className="text-xs text-[#6AB800] dark:text-[#8CED00] font-mono font-bold">{code}</p>
                        </div>
                      </div>
                      <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#00E5D1]/15 border border-[#00E5D1]/30 text-[#00D8C9] font-mono font-bold text-xs">
                        {patient.blood_group}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
