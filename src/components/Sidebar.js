import React from 'react';
import { ChevronDown, Calendar, MapPin, Wheat } from 'lucide-react';
import '../styles/Sidebar.css';

const Sidebar = ({ 
  selectedCrop, 
  setSelectedCrop, 
  selectedField, 
  setSelectedField,
  dateRange,
  setDateRange 
}) => {
  const crops = ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Maize'];
  const fields = ['Field-1', 'Field-2', 'Field-3', 'Field-4', 'Field-5'];
  
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <label className="sidebar-label">
          <Wheat size={16} />
          Crop Selection
        </label>
        <div className="select-wrapper">
          <select 
            value={selectedCrop} 
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="sidebar-select"
          >
            {crops.map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
          <ChevronDown className="select-icon" size={16} />
        </div>
      </div>

      <div className="sidebar-section">
        <label className="sidebar-label">
          <MapPin size={16} />
          Field Selection
        </label>
        <div className="field-list">
          {fields.map(field => (
            <button
              key={field}
              className={`field-item ${selectedField === field ? 'active' : ''}`}
              onClick={() => setSelectedField(field)}
            >
              <span className="field-name">{field}</span>
              <span className="field-size">12.5 acres</span>
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <label className="sidebar-label">
          <Calendar size={16} />
          Date Range
        </label>
        <div className="date-filters">
          <button 
            className={`filter-btn ${dateRange === '7days' ? 'active' : ''}`}
            onClick={() => setDateRange('7days')}
          >
            Last 7 days
          </button>
          <button 
            className={`filter-btn ${dateRange === '30days' ? 'active' : ''}`}
            onClick={() => setDateRange('30days')}
          >
            Last 30 days
          </button>
          <button 
            className={`filter-btn ${dateRange === 'custom' ? 'active' : ''}`}
            onClick={() => setDateRange('custom')}
          >
            Custom range
          </button>
        </div>
      </div>

      <div className="sidebar-stats">
        <div className="stat-card">
          <span className="stat-label">Total Area</span>
          <span className="stat-value">62.5 acres</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Active Alerts</span>
          <span className="stat-value alert">5</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;