import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Samples from "./pages/Samples";
import Upload from "./pages/Upload";
import Prediction from "./pages/Prediction";
import Reports from "./pages/Reports";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Helmet>
        <title>LabVision AI | Clinical imaging workspace</title>
        <meta
          name="description"
          content="LabVision AI is a clinical imaging workspace for patient management, sample tracking, image uploads, and AI-assisted blood smear prediction."
        />
        <meta
          name="keywords"
          content="LabVision AI, clinical imaging, blood smear, pathology workflow, AI prediction, patient registry"
        />
      </Helmet>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/samples" element={<Samples />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/prediction" element={<Prediction />} />
            <Route path="/reports" element={<Reports />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;