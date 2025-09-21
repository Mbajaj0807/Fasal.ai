import React, { useState } from "react";
import "./SoilAnalysis.css"; // Make sure this contains the CSS you shared

const ImageAnalysis = () => {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [mapHtml, setMapHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateNDVI = async () => {
    if (!lat || !lon) {
      setError("Please enter both latitude and longitude.");
      return;
    }

    setLoading(true);
    setError("");
    setMapHtml("");

    try {
      const response = await fetch("http://localhost:8000/api/ndvi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lat: parseFloat(lat),
          lon: parseFloat(lon),
          buffer_radius: 5000
        }),
      });

      const data = await response.json();

      if (data.map_html) {
        setMapHtml(data.map_html);
      } else {
        setError("NDVI map not returned from server.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch NDVI map.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setLat("");
    setLon("");
    setMapHtml("");
    setError("");
  };

  return (
    <div className="page-container">
      <h1>Image Analysis</h1>

      <div className="soil-analysis-form">
        <h2>NDVI Map Generator</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>
              Latitude
            </label>
            <input
              type="number"
              placeholder="Enter latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>
              Longitude
            </label>
            <input
              type="number"
              placeholder="Enter longitude"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            className="predict-btn"
            onClick={handleGenerateNDVI}
            disabled={loading}
          >
            {loading ? <span className="spinner"></span> : "Generate NDVI Map"}
          </button>
          <button
            className="reset-btn"
            onClick={handleReset}
            disabled={loading}
          >
            Reset
          </button>
        </div>

        {error && <span className="error-message">{error}</span>}
      </div>

      {mapHtml && (
        <div
          className="prediction-results"
          style={{ height: "500px" }}
          dangerouslySetInnerHTML={{ __html: mapHtml }}
        />
      )}
    </div>
  );
};

export default ImageAnalysis;
