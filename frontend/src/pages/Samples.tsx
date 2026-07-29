import { useEffect, useState } from "react";
import api from "../services/api";

type Sample = {
  id: number;
  sample_id: string;
  patient_id: number;
  sample_type: string;
  status: string;
  collection_date: string;
  remarks?: string | null;
};

export default function Samples() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Sample[]>("/samples/")
      .then((res) => setSamples(res.data))
      .catch(() => setSamples([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-card">
      <div className="page-header">
        <div>
          <p className="eyebrow">Specimen tracker</p>
          <h2>Review sample lifecycle</h2>
        </div>
        <span className="pill">{samples.length} samples</span>
      </div>

      {loading ? (
        <p>Loading samples...</p>
      ) : (
        <div className="table-card">
          {samples.length === 0 ? (
            <p>No samples available yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Sample ID</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Collected</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {samples.map((sample) => (
                  <tr key={sample.id}>
                    <td>{sample.sample_id}</td>
                    <td>{sample.sample_type}</td>
                    <td>{sample.status}</td>
                    <td>{sample.collection_date}</td>
                    <td>{sample.remarks || "—"}</td>
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
