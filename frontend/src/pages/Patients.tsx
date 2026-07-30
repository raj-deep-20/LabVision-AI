import { useEffect, useState } from "react";
import { FiUsers, FiUserCheck, FiRefreshCw, FiAlertCircle } from "react-icons/fi";
import api from "../services/api";

type Patient = {
  id: number;
  patient_id: string;
  name: string;
  age: number;
  gender: string;
  blood_group: string;
  doctor: string;
  phone?: string;
  visit_date?: string;
};

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  function fetchPatients() {
    setLoading(true);
    api
      .get<Patient[]>("/patients/")
      .then((res) => setPatients(res.data))
      .catch(() => setPatients([]))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="space-y-6">
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
              No patient files have been registered yet. Connect your backend database or insert patient entries to populate the registry.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/60 border-b border-slate-800 text-xs font-mono uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 px-5">Patient Name</th>
                  <th className="py-3.5 px-5">Patient ID</th>
                  <th className="py-3.5 px-5">Age / Gender</th>
                  <th className="py-3.5 px-5">Blood Group</th>
                  <th className="py-3.5 px-5">Attending Doctor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {patients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="hover:bg-slate-800/40 transition-colors duration-150 group"
                  >
                    <td className="py-4 px-5 font-medium text-white flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs">
                        {patient.name.charAt(0).toUpperCase()}
                      </div>
                      <span>{patient.name}</span>
                    </td>
                    <td className="py-4 px-5 font-mono text-cyan-400 font-semibold text-xs">
                      {patient.patient_id}
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
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
