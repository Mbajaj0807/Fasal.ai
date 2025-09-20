import React, { useState, useEffect } from 'react';
import './SensorData.css';

const SensorData = () => {
  const [selectedField, setSelectedField] = useState('field-1');
  const [sensorData, setSensorData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [sensorCode, setSensorCode] = useState('SENSOR_001');

  // Mock fields data
  const fields = [
    { id: 'field-1', name: 'North Field', area: '5.2 acres', crop: 'Wheat', sensors: 4 },
    { id: 'field-2', name: 'South Field', area: '3.8 acres', crop: 'Rice', sensors: 3 },
    { id: 'field-3', name: 'East Field', area: '4.5 acres', crop: 'Corn', sensors: 5 },
    { id: 'field-4', name: 'West Field', area: '2.9 acres', crop: 'Soybeans', sensors: 2 },
  ];

  // Mock sensor types
  const sensorTypes = [
    { type: 'soil_moisture', name: 'Soil Moisture', unit: '%', icon: '💧' },
    { type: 'temperature', name: 'Temperature', unit: '°C', icon: '🌡️' },
    { type: 'humidity', name: 'Humidity', unit: '%', icon: '💦' },
    { type: 'ph', name: 'pH Level', unit: '', icon: '⚗️' },
    { type: 'nitrogen', name: 'Nitrogen', unit: 'mg/kg', icon: '🧪' },
    { type: 'light', name: 'Light Intensity', unit: 'lux', icon: '☀️' },
  ];

  // Function to generate mock sensor data
  const generateMockData = () => {
    return {
      soil_moisture: Math.floor(Math.random() * 40) + 30,
      temperature: Math.floor(Math.random() * 15) + 20,
      humidity: Math.floor(Math.random() * 30) + 50,
      ph: (Math.random() * 2 + 6).toFixed(1),
      nitrogen: Math.floor(Math.random() * 100) + 150,
      light: Math.floor(Math.random() * 50000) + 10000,
    };
  };

  // Function to fetch sensor data
  const fetchSensorData = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newData = generateMockData();
      setSensorData(newData);
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 1500);
  };

  // Auto-refresh functionality
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        fetchSensorData();
      }, 10000); // Refresh every 10 seconds

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  // Get status color based on value
  const getStatusColor = (type, value) => {
    switch(type) {
      case 'soil_moisture':
        if (value < 30) return 'low';
        if (value > 60) return 'high';
        return 'optimal';
      case 'temperature':
        if (value < 15 || value > 35) return 'warning';
        return 'optimal';
      case 'humidity':
        if (value < 40 || value > 70) return 'warning';
        return 'optimal';
      case 'ph':
        if (value < 6.0 || value > 7.5) return 'warning';
        return 'optimal';
      default:
        return 'normal';
    }
  };

  const currentField = fields.find(f => f.id === selectedField);

  return (
    <div className="sensor-data-page">
      <div className="page-header">
        <h1>Sensor Data Monitoring</h1>
        <div className="header-actions">
          <button 
            className={`auto-refresh-btn ${autoRefresh ? 'active' : ''}`}
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            🔄 Auto Refresh: {autoRefresh ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      <div className="sensor-content">
        {/* Field Selection Panel */}
        <div className="field-selection-panel">
          <h2>Select Field</h2>
          <div className="fields-grid">
            {fields.map(field => (
              <div
                key={field.id}
                className={`field-card ${selectedField === field.id ? 'selected' : ''}`}
                onClick={() => setSelectedField(field.id)}
              >
                <div className="field-icon">🌾</div>
                <div className="field-info">
                  <h3>{field.name}</h3>
                  <p className="field-details">{field.area} • {field.crop}</p>
                  <p className="sensor-count">
                    <span className="sensor-badge">{field.sensors} sensors</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Sensor Panel */}
        <div className="sensor-panel">
          <div className="panel-header">
            <h2>Sensor Readings - {currentField?.name}</h2>
            {lastUpdated && (
              <span className="last-updated">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>

          {/* Sensor Code Input */}
          <div className="sensor-control-section">
            <div className="sensor-code-input">
              <label htmlFor="sensor-code">Sensor Code:</label>
              <input
                id="sensor-code"
                type="text"
                value={sensorCode}
                onChange={(e) => setSensorCode(e.target.value)}
                placeholder="Enter sensor code"
                className="code-input"
              />
              <button 
                className="fetch-btn"
                onClick={fetchSensorData}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Fetching...
                  </>
                ) : (
                  <>
                    📡 Get Sensor Data
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sensor Data Display */}
          {isLoading && !sensorData && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Fetching sensor data...</p>
            </div>
          )}

          {sensorData && (
            <div className="sensor-data-grid">
              {sensorTypes.map(sensor => {
                const value = sensorData[sensor.type];
                const status = getStatusColor(sensor.type, value);
                
                return (
                  <div key={sensor.type} className={`sensor-card ${status}`}>
                    <div className="sensor-header">
                      <span className="sensor-icon">{sensor.icon}</span>
                      <span className="sensor-name">{sensor.name}</span>
                    </div>
                    <div className="sensor-value">
                      <span className="value">{value}</span>
                      <span className="unit">{sensor.unit}</span>
                    </div>
                    <div className={`status-indicator ${status}`}>
                      {status === 'optimal' && '✓ Optimal'}
                      {status === 'warning' && '⚠ Warning'}
                      {status === 'low' && '↓ Low'}
                      {status === 'high' && '↑ High'}
                      {status === 'normal' && 'Normal'}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!sensorData && !isLoading && (
            <div className="no-data-container">
              <div className="no-data-icon">📊</div>
              <h3>No Sensor Data Available</h3>
              <p>Click "Get Sensor Data" to fetch the latest readings from your sensors.</p>
            </div>
          )}

          {/* Historical Data Preview */}
          {sensorData && (
            <div className="historical-section">
              <h3>Quick Stats</h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <span className="stat-label">Avg. Soil Moisture</span>
                  <span className="stat-value">{sensorData.soil_moisture}%</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Current Temp</span>
                  <span className="stat-value">{sensorData.temperature}°C</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">pH Level</span>
                  <span className="stat-value">{sensorData.ph}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Light Intensity</span>
                  <span className="stat-value">{sensorData.light} lux</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SensorData;
