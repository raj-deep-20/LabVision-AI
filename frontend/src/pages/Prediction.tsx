import { useState } from "react";
import api from "../services/api";

export default function Prediction() {
  const [imageId, setImageId] = useState("");
  const [result, setResult] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlePredict(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await api.post(`/predictions/${imageId}`);
      setResult(res.data);
    } catch (err: any) {
      setMessage(err?.response?.data?.detail || "Prediction failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-card">
      <div className="page-header">
        <div>
          <p className="eyebrow">AI classification</p>
          <h2>Run a prediction</h2>
        </div>
      </div>

      <form onSubmit={handlePredict} className="upload-form">
        <label>
          Image ID
          <input value={imageId} onChange={(e) => setImageId(e.target.value)} placeholder="1" required />
        </label>

        {message ? <p className="error-text">{message}</p> : null}

        <button className="primary-btn" type="submit" disabled={loading}>
          {loading ? "Predicting..." : "Run prediction"}
        </button>
      </form>

      {result ? (
        <div className="result-card">
          <h3>Prediction result</h3>
          <p><strong>Label:</strong> {result.prediction_label}</p>
          <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(1)}%</p>
        </div>
      ) : null}
    </div>
  );
}
