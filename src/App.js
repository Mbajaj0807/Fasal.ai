import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import SidebarNav from './components/SidebarNav';
import Dashboard from './pages/Dashboard';
import ImageAnalysis from './pages/ImageAnalysis';
import SensorData from './pages/SensorData';
import SoilAnalysis from './pages/SoilAnalysis';
import Alerts from './pages/Alerts';
import FieldMap from './pages/FieldMap';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="App">
        <SidebarNav />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/image-analysis" element={<ImageAnalysis />} />
            <Route path="/sensor-data" element={<SensorData />} />
            <Route path="/soil-analysis" element={<SoilAnalysis />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/field-map" element={<FieldMap />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
