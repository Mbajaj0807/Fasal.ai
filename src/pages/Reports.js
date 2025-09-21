import React, { useState } from 'react';
import './SoilAnalysis.css';
import axios from 'axios';

const Reports = () => {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState('');

  const handleFetchReport = async () => {
    if (!lat || !lon) {
      setError('Please enter both latitude and longitude.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/api/ndvi', {
        lat: parseFloat(lat),
        lon: parseFloat(lon)
      });
      setReportData(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch report.');
    }
    setLoading(false);
  };

  const handleReset = () => {
    setLat('');
    setLon('');
    setReportData(null);
    setError('');
  };

  return (
    <div className="page-container">
      <h1>NDVI Reports</h1>

      {/* Form */}
      <div className="soil-analysis-form">
        <h2>Enter Location</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Latitude</label>
            <input
              type="number"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              placeholder="Enter latitude"
            />
          </div>
          <div className="form-group">
            <label>Longitude</label>
            <input
              type="number"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
              placeholder="Enter longitude"
            />
          </div>
        </div>
        {error && <span className="error-message">{error}</span>}
        <div className="form-actions">
          <button className="predict-btn" onClick={handleFetchReport} disabled={loading}>
            {loading ? <div className="spinner"></div> : 'Generate Report'}
          </button>
          <button className="predict-btn" onClick={handleFetchReport} disabled={loading}>
            {loading ? <div className="spinner"></div> : 'Download Report'}
          </button>
          <button className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      {/* Report Results */}
      {reportData && (
        <div className="prediction-results">
          <h2>NDVI Report</h2>

          {/* Map */}
          <div className="results-grid">
            <div className="result-card">
              <h3>NDVI Map</h3>
              <div dangerouslySetInnerHTML={{ __html: reportData.map_html }} />
            </div>

            {/* NDVI Statistics */}
            <div className="result-card">
              <h3>NDVI Statistics</h3>
              <p><strong>Mean:</strong> {reportData.ndvi_statistics.mean.toFixed(2)}</p>
              <p><strong>Min:</strong> {reportData.ndvi_statistics.min.toFixed(2)}</p>
              <p><strong>Max:</strong> {reportData.ndvi_statistics.max.toFixed(2)}</p>
              <p><strong>StdDev:</strong> {reportData.ndvi_statistics.stdDev.toFixed(2)}</p>
            </div>

            {/* NDVI Histogram */}
            {reportData.ndvi_histogram_base64 && (
              <div className="result-card">
                <h3>NDVI Histogram</h3>
                <img
                  src={`data:image/png;base64,${reportData.ndvi_histogram_base64}`}
                  alt="NDVI Histogram"
                  style={{ width: '100%' }}
                />
              </div>
            )}

            {/* NDVI Classification Pie */}
            {reportData.ndvi_classification_pie_base64 && (
              <div className="result-card">
                <h3>NDVI Coverage Pie</h3>
                <img
                  src={`data:image/png;base64,${reportData.ndvi_classification_pie_base64}`}
                  alt="NDVI Coverage Pie"
                  style={{ width: '100%' }}
                />
              </div>
            )}

            {/* Metadata */}
            <div className="result-card">
              <h3>Metadata</h3>
              <p><strong>Satellite:</strong> {reportData.metadata.satellite}</p>
              <p><strong>Image Date:</strong> {reportData.metadata.image_date}</p>
              <p><strong>Location:</strong> {reportData.metadata.center_lat}, {reportData.metadata.center_lon}</p>
              <p><strong>Buffer Radius (m):</strong> {reportData.metadata.buffer_radius_m}</p>
              <p><strong>Analysis Date:</strong> {reportData.metadata.analysis_date}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
