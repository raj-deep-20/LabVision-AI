import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardOverview from './components/DashboardOverview';
import ImageDiagnostics from './components/ImageDiagnostics';
import LiveStreamInspection from './components/LiveStreamInspection';
import ReportsHistory from './components/ReportsHistory';
import BackendIntegrationHub from './components/BackendIntegrationHub';
import { checkHealth, fetchModels } from './services/api';
import { CheckCircle2 } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [backendStatus, setBackendStatus] = useState({ connected: false, latency: null });
  const [models, setModels] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    handleRefreshHealth();
    loadModels();
  }, []);

  const handleRefreshHealth = async () => {
    const res = await checkHealth();
    setBackendStatus(res);
  };

  const loadModels = async () => {
    const res = await fetchModels();
    setModels(res.data);
  };

  const showToast = (msg, type = 'info') => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleScanCompleted = (scanResult) => {
    showToast(`Scan ${scanResult.scan_id} analyzed with ${(scanResult.confidence * 100).toFixed(0)}% confidence`, 'success');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Toast Notification Popup */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 999,
          background: toastMessage.type === 'success' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(6, 182, 212, 0.9)',
          backdropFilter: 'blur(10px)',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontWeight: 600,
          fontSize: '0.88rem',
          animation: 'pulseGlow 2s infinite ease-in-out'
        }}>
          <CheckCircle2 size={18} />
          {toastMessage.msg}
        </div>
      )}

      {/* Main Glass Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        backendStatus={backendStatus}
        onRefreshHealth={handleRefreshHealth}
      />

      {/* Main App Workspace Area */}
      <main style={{ flex: 1, maxWidth: '1400px', width: '100%', margin: '0 auto', padding: '24px 20px' }}>
        {activeTab === 'dashboard' && (
          <DashboardOverview
            models={models}
            backendStatus={backendStatus}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'diagnostics' && (
          <ImageDiagnostics
            models={models}
            isMockMode={!backendStatus.connected}
            onScanCompleted={handleScanCompleted}
          />
        )}

        {activeTab === 'livestream' && (
          <LiveStreamInspection />
        )}

        {activeTab === 'reports' && (
          <ReportsHistory />
        )}

        {activeTab === 'integration' && (
          <BackendIntegrationHub
            backendStatus={backendStatus}
            onRefreshHealth={handleRefreshHealth}
          />
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-glass)',
        background: 'rgba(7, 10, 19, 0.9)',
        backdropFilter: 'blur(12px)',
        padding: '20px 24px',
        marginTop: '40px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>LabVision AI</span>
            <span>• Medical Computer Vision Analytics Platform</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span className="font-mono" style={{ color: 'var(--text-dim)' }}>FastAPI + React 19 Engine</span>
            <button onClick={() => setActiveTab('integration')} style={{ border: 'none', background: 'transparent', color: '#38bdf8', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
              API Specs & Integration Route
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
