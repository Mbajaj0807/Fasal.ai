import React, { useState, useEffect, useRef } from 'react';
import './MainMap.css';

const MainMap = () => {
  const [selectedField, setSelectedField] = useState(null);
  const [sensorData, setSensorData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const modalRef = useRef();

  const fields = [
    { id: 1, name: 'Nathuram', status: 'green', crops: 'Wheat', area: '5 acres' },
    { id: 2, name: 'South', status: 'yellow', crops: 'Rice', area: '4 acres' },
    { id: 3, name: 'East', status: 'red', crops: 'Corn', area: '6 acres' },
    { id: 4, name: 'West', status: 'green', crops: 'Soybeans', area: '3 acres' },
  ];

  const sensorTypes = [
    { type: 'soil_moisture', name: 'Soil Moisture', unit: '%', icon: '💧' },
    { type: 'temperature', name: 'Temperature', unit: '°C', icon: '🌡️' },
    { type: 'humidity', name: 'Humidity', unit: '%', icon: '💦' },
    { type: 'ph', name: 'pH Level', unit: '', icon: '⚗️' },
    { type: 'nitrogen', name: 'Nitrogen', unit: 'mg/kg', icon: '🧪' },
    { type: 'light', name: 'Light Intensity', unit: 'lux', icon: '☀️' },
  ];

  // Generate mock sensor data based on field status
  const generateMockData = (status) => {
    switch (status) {
      case 'green':
        return {
          soil_moisture: Math.floor(Math.random() * 20) + 50,
          temperature: Math.floor(Math.random() * 10) + 20,
          humidity: Math.floor(Math.random() * 20) + 50,
          ph: (Math.random() * 0.5 + 6.5).toFixed(1),
          nitrogen: Math.floor(Math.random() * 50) + 150,
          light: Math.floor(Math.random() * 20000) + 30000,
        };
      case 'yellow':
        return {
          soil_moisture: Math.floor(Math.random() * 20) + 30,
          temperature: Math.floor(Math.random() * 10) + 25,
          humidity: Math.floor(Math.random() * 30) + 40,
          ph: (Math.random() * 1 + 6.0).toFixed(1),
          nitrogen: Math.floor(Math.random() * 50) + 100,
          light: Math.floor(Math.random() * 20000) + 20000,
        };
      case 'red':
        return {
          soil_moisture: Math.floor(Math.random() * 20) + 10,
          temperature: Math.floor(Math.random() * 10) + 35,
          humidity: Math.floor(Math.random() * 20) + 20,
          ph: (Math.random() * 2 + 5.5).toFixed(1),
          nitrogen: Math.floor(Math.random() * 50) + 50,
          light: Math.floor(Math.random() * 20000) + 10000,
        };
      default:
        return {};
    }
  };

  const fetchSensorData = (field) => {
    if (!field) return;
    setIsLoading(true);
    setTimeout(() => {
      const newData = generateMockData(field.status);
      setSensorData(newData);
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (autoRefresh && selectedField) {
      const interval = setInterval(() => fetchSensorData(selectedField), 5000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, selectedField]);

  const getStatusColor = (type, value) => {
    switch (type) {
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

  // Close modal if clicked outside
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setSelectedField(null);
      setSensorData(null);
    }
  };

  return (
    <div className="main-map-container">
      {/* Fields Grid */}
      <div className="main-map-grid">
        {fields.map(field => (
          <div
            key={field.id}
            className={`main-map-tile ${field.status}`}
            onClick={() => {
              setSelectedField(field);
              fetchSensorData(field);
            }}
          >
            {field.name}
          </div>
        ))}
      </div>

      {/* Field Modal */}
      {selectedField && (
        <div className="main-map-modal" onClick={handleOutsideClick}>
          <div
            className="main-map-modal-content"
            ref={modalRef}
            style={{ maxWidth: '650px', width: '90%', maxHeight: '80vh', overflowY: 'auto', padding: '20px' }}
          >
            <h2>Sensor Data - {selectedField.name}</h2>
            <p><strong>Area:</strong> {selectedField.area} • <strong>Crops:</strong> {selectedField.crops}</p>

            <button
              className={`auto-refresh-btn ${autoRefresh ? 'active' : ''}`}
              onClick={() => setAutoRefresh(!autoRefresh)}
              style={{ margin: '10px 0' }}
            >
              🔄 Auto Refresh: {autoRefresh ? 'ON' : 'OFF'}
            </button>

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

            <button
              onClick={() => {
                setSelectedField(null);
                setSensorData(null);
              }}
              style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '8px', background: '#16a34a', color: 'white', border: 'none' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainMap;
