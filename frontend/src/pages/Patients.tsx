import { useEffect, useState } from "react";
import api from "../services/api";

type Patient = {
  id: number;
  patient_id: string;
  name: string;
  age: number;
  gender: string;
  blood_group: string;
  doctor: string;
  phone: string;
  visit_date: string;
};

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Patient[]>("/patients/")
      .then((res) => setPatients(res.data))
      .catch(() => setPatients([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-card">
      <div className="page-header">
        <div>
          <p className="eyebrow">Patient registry</p>
          <h2>Manage your patients</h2>
        </div>
        <span className="pill">{patients.length} records</span>
      </div>

      {loading ? (
        <p>Loading patients...</p>
      ) : (
        <div className="table-card">
          {patients.length === 0 ? (
            <p>No patients available yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Patient ID</th>
                  <th>Age</th>
                  <th>Blood group</th>
                  <th>Doctor</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.name}</td>
                    <td>{patient.patient_id}</td>
                    <td>{patient.age}</td>
                    <td>{patient.blood_group}</td>
                    <td>{patient.doctor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
