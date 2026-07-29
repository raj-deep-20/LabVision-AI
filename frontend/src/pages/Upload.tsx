import { useState } from "react";
import api from "../services/api";

export default function Upload() {
  const [sampleId, setSampleId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setMessage("Please select an image to upload.");
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
      setMessage("Image uploaded successfully.");
    } catch (err: any) {
      setMessage(err?.response?.data?.detail || "Upload failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-card">
      <div className="page-header">
        <div>
          <p className="eyebrow">Image ingestion</p>
          <h2>Upload a smear image</h2>
        </div>
      </div>

      <form onSubmit={handleUpload} className="upload-form">
        <label>
          Sample ID
          <input value={sampleId} onChange={(e) => setSampleId(e.target.value)} placeholder="1" required />
        </label>

        <label>
          Image file
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} required />
        </label>

        {message ? <p className="error-text">{message}</p> : null}

        <button className="primary-btn" type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload image"}
        </button>
      </form>
    </div>
  );
}
