import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, Droplets, Thermometer, Activity } from 'lucide-react';
import '../styles/TrendCharts.css';

const TrendCharts = ({ dateRange }) => {
  // Sample data based on date range
  const getNDVIData = () => {
    const baseData = [
      { day: 'Mon', ndvi: 0.72, target: 0.75 },
      { day: 'Tue', ndvi: 0.71, target: 0.75 },
      { day: 'Wed', ndvi: 0.73, target: 0.75 },
      { day: 'Thu', ndvi: 0.70, target: 0.75 },
      { day: 'Fri', ndvi: 0.68, target: 0.75 },
      { day: 'Sat', ndvi: 0.69, target: 0.75 },
      { day: 'Sun', ndvi: 0.72, target: 0.75 }
    ];
    return baseData;
  };

  const getMoistureData = () => {
    return [
      { day: 'Mon', moisture: 55, rainfall: 12, optimal: 50 },
      { day: 'Tue', moisture: 52, rainfall: 0, optimal: 50 },
      { day: 'Wed', moisture: 48, rainfall: 0, optimal: 50 },
      { day: 'Thu', moisture: 45, rainfall: 8, optimal: 50 },
      { day: 'Fri', moisture: 50, rainfall: 15, optimal: 50 },
      { day: 'Sat', moisture: 54, rainfall: 5, optimal: 50 },
      { day: 'Sun', moisture: 52, rainfall: 0, optimal: 50 }
    ];
  };

  const getTemperatureData = () => {
    return [
      { time: '6AM', temp: 22, humidity: 75 },
      { time: '9AM', temp: 26, humidity: 68 },
      { time: '12PM', temp: 32, humidity: 55 },
      { time: '3PM', temp: 35, humidity: 48 },
      { time: '6PM', temp: 30, humidity: 58 },
      { time: '9PM', temp: 26, humidity: 65 }
    ];
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}{entry.unit || ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="trend-charts">
      <div className="charts-grid">
        {/* NDVI Trend Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-title">
              <Activity size={18} />
              <span>NDVI Trend</span>
            </div>
            <div className="chart-indicator positive">
              <TrendingUp size={16} />
              <span>+2.8%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={getNDVIData()} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="day" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} domain={[0.6, 0.8]} />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="ndvi" 
                stroke="#4CAF50" 
                strokeWidth={2}
                dot={{ fill: '#4CAF50', r: 4 }}
                name="NDVI"
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#999" 
                strokeDasharray="5 5"
                dot={false}
                name="Target"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Soil Moisture Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-title">
              <Droplets size={18} />
              <span>Soil Moisture vs Rainfall</span>
            </div>
            <div className="chart-indicator negative">
              <TrendingUp size={16} style={{ transform: 'rotate(180deg)' }} />
              <span>-5%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={getMoistureData()} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="day" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="moisture" 
                stroke="#2196F3" 
                fill="#2196F3"
                fillOpacity={0.3}
                strokeWidth={2}
                name="Moisture %"
              />
              <Area 
                type="monotone" 
                dataKey="rainfall" 
                stroke="#00BCD4" 
                fill="#00BCD4"
                fillOpacity={0.3}
                strokeWidth={2}
                name="Rainfall (mm)"
              />
              <Line 
                type="monotone" 
                dataKey="optimal" 
                stroke="#FF9800" 
                strokeDasharray="5 5"
                dot={false}
                name="Optimal"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Temperature & Humidity Chart */}
        <div className="chart-card full-width">
          <div className="chart-header">
            <div className="chart-title">
              <Thermometer size={18} />
              <span>Temperature & Humidity Trend</span>
            </div>
            <div className="chart-legend">
              <span className="legend-item temp">Temperature (°C)</span>
              <span className="legend-item humidity">Humidity (%)</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={getTemperatureData()} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="time" stroke="#666" fontSize={12} />
              <YAxis yAxisId="temp" orientation="left" stroke="#FF5722" fontSize={12} />
              <YAxis yAxisId="humidity" orientation="right" stroke="#3F51B5" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                yAxisId="temp"
                type="monotone" 
                dataKey="temp" 
                stroke="#FF5722" 
                strokeWidth={2}
                dot={{ fill: '#FF5722', r: 4 }}
                name="Temperature"
              />
              <Line 
                yAxisId="humidity"
                type="monotone" 
                dataKey="humidity" 
                stroke="#3F51B5" 
                strokeWidth={2}
                dot={{ fill: '#3F51B5', r: 4 }}
                name="Humidity"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat">
          <span className="stat-icon">📈</span>
          <div className="stat-content">
            <span className="stat-label">Avg NDVI</span>
            <span className="stat-value">0.71</span>
          </div>
        </div>
        <div className="stat">
          <span className="stat-icon">💧</span>
          <div className="stat-content">
            <span className="stat-label">Total Rainfall</span>
            <span className="stat-value">40mm</span>
          </div>
        </div>
        <div className="stat">
          <span className="stat-icon">🌡️</span>
          <div className="stat-content">
            <span className="stat-label">Avg Temp</span>
            <span className="stat-value">28°C</span>
          </div>
        </div>
        <div className="stat">
          <span className="stat-icon">💨</span>
          <div className="stat-content">
            <span className="stat-label">Avg Humidity</span>
            <span className="stat-value">61%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendCharts;