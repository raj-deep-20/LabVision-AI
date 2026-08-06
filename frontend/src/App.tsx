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
        <title>LabVision AI | Clinical microscopy workspace</title>
        <meta
          name="description"
          content="LabVision AI connects patient registration, sample tracking, smear uploads, AI prediction, and PDF reporting in one clinical workflow."
        />
        <meta
          name="keywords"
          content="LabVision AI, clinical microscopy, blood smear, pathology workflow, AI prediction, patient registry, sample tracking"
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