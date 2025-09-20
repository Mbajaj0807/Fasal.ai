import React, { useState } from 'react';
import './SoilAnalysis.css';

const SoilAnalysis = () => {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    moisture: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Only allow numbers and decimal points
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setFormData({
        ...formData,
        [name]: value
      });
      // Clear error for this field
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.nitrogen) newErrors.nitrogen = 'Nitrogen value is required';
    if (!formData.phosphorus) newErrors.phosphorus = 'Phosphorus value is required';
    if (!formData.potassium) newErrors.potassium = 'Potassium value is required';
    if (!formData.moisture) newErrors.moisture = 'Moisture value is required';
    
    // Check ranges
    if (formData.nitrogen && (parseFloat(formData.nitrogen) < 0 || parseFloat(formData.nitrogen) > 500))
      newErrors.nitrogen = 'Nitrogen should be between 0-500 kg/ha';
    if (formData.phosphorus && (parseFloat(formData.phosphorus) < 0 || parseFloat(formData.phosphorus) > 200))
      newErrors.phosphorus = 'Phosphorus should be between 0-200 kg/ha';
    if (formData.potassium && (parseFloat(formData.potassium) < 0 || parseFloat(formData.potassium) > 300))
      newErrors.potassium = 'Potassium should be between 0-300 kg/ha';
    if (formData.moisture && (parseFloat(formData.moisture) < 0 || parseFloat(formData.moisture) > 100))
      newErrors.moisture = 'Moisture should be between 0-100%';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generate mock prediction based on input values
  const generateMockPrediction = () => {
    const n = parseFloat(formData.nitrogen);
    const p = parseFloat(formData.phosphorus);
    const k = parseFloat(formData.potassium);
    const m = parseFloat(formData.moisture);

    let soilQuality = 'Good';
    let recommendations = [];
    let suitableCrops = [];
    let fertilizerRecommendation = {};

    // Determine soil quality
    if (n < 100 && p < 30 && k < 50) {
      soilQuality = 'Poor';
    } else if (n < 200 && p < 60 && k < 100) {
      soilQuality = 'Moderate';
    } else if (n < 350 && p < 100 && k < 200) {
      soilQuality = 'Good';
    } else {
      soilQuality = 'Excellent';
    }

    // Generate recommendations based on NPK values
    if (n < 150) {
      recommendations.push('Increase nitrogen levels through urea or organic compost');
      fertilizerRecommendation.nitrogen = `Add ${Math.round(200 - n)} kg/ha of Urea`;
    }
    if (p < 50) {
      recommendations.push('Apply phosphorus-rich fertilizers like DAP');
      fertilizerRecommendation.phosphorus = `Add ${Math.round(80 - p)} kg/ha of DAP`;
    }
    if (k < 80) {
      recommendations.push('Supplement with potassium using MOP fertilizer');
      fertilizerRecommendation.potassium = `Add ${Math.round(120 - k)} kg/ha of MOP`;
    }
    if (m < 30) {
      recommendations.push('Increase irrigation frequency to maintain optimal moisture');
    } else if (m > 70) {
      recommendations.push('Ensure proper drainage to prevent waterlogging');
    }

    // Determine suitable crops based on soil conditions
    if (soilQuality === 'Excellent' || soilQuality === 'Good') {
      suitableCrops = ['Rice', 'Wheat', 'Sugarcane', 'Cotton'];
    } else if (soilQuality === 'Moderate') {
      suitableCrops = ['Pulses', 'Maize', 'Groundnut', 'Soybean'];
    } else {
      suitableCrops = ['Millets', 'Barley', 'Mustard'];
    }

    // Calculate pH estimate (mock)
    const estimatedPH = (6.5 + (n/1000) - (p/500) + (k/600)).toFixed(1);

    return {
      soilQuality,
      estimatedPH: Math.min(Math.max(estimatedPH, 4.5), 8.5),
      suitableCrops,
      recommendations: recommendations.length > 0 ? recommendations : ['Soil conditions are optimal. Maintain current practices.'],
      fertilizerRecommendation,
      overallScore: Math.round(((n/350 + p/100 + k/200 + m/60) / 4) * 100)
    };
  };

  // Handle form submission
  const handlePredict = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setPrediction(null);

    // Simulate API call delay
    setTimeout(() => {
      const mockPrediction = generateMockPrediction();
      setPrediction(mockPrediction);
      setLoading(false);
    }, 1500);
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      nitrogen: '',
      phosphorus: '',
      potassium: '',
      moisture: ''
    });
    setPrediction(null);
    setErrors({});
  };

  return (
    <div className="page-container">
      <h1>Soil Analysis</h1>
      <div className="page-content">
        <p>Enter your soil parameters to get AI-powered recommendations for optimal crop growth.</p>
        
        {/* Input Form */}
        <div className="soil-analysis-form">
          <h2>Soil Parameters Input</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="nitrogen">
                <span className="label-icon">🌱</span>
                Nitrogen (N) - kg/ha
              </label>
              <input
                type="text"
                id="nitrogen"
                name="nitrogen"
                value={formData.nitrogen}
                onChange={handleInputChange}
                placeholder="Enter nitrogen value (0-500)"
                className={errors.nitrogen ? 'error' : ''}
              />
              {errors.nitrogen && <span className="error-message">{errors.nitrogen}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phosphorus">
                <span className="label-icon">🔵</span>
                Phosphorus (P) - kg/ha
              </label>
              <input
                type="text"
                id="phosphorus"
                name="phosphorus"
                value={formData.phosphorus}
                onChange={handleInputChange}
                placeholder="Enter phosphorus value (0-200)"
                className={errors.phosphorus ? 'error' : ''}
              />
              {errors.phosphorus && <span className="error-message">{errors.phosphorus}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="potassium">
                <span className="label-icon">🟣</span>
                Potassium (K) - kg/ha
              </label>
              <input
                type="text"
                id="potassium"
                name="potassium"
                value={formData.potassium}
                onChange={handleInputChange}
                placeholder="Enter potassium value (0-300)"
                className={errors.potassium ? 'error' : ''}
              />
              {errors.potassium && <span className="error-message">{errors.potassium}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="moisture">
                <span className="label-icon">💧</span>
                Moisture - %
              </label>
              <input
                type="text"
                id="moisture"
                name="moisture"
                value={formData.moisture}
                onChange={handleInputChange}
                placeholder="Enter moisture percentage (0-100)"
                className={errors.moisture ? 'error' : ''}
              />
              {errors.moisture && <span className="error-message">{errors.moisture}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button 
              className="predict-btn"
              onClick={handlePredict}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Analyzing...
                </>
              ) : (
                <>
                   Predict Soil Quality
                </>
              )}
            </button>
            <button 
              className="reset-btn"
              onClick={handleReset}
              disabled={loading}
            >
               Reset
            </button>
          </div>
        </div>

        {/* Prediction Results */}
        {prediction && (
          <div className="prediction-results">
            <h2>Analysis Results</h2>
            
            <div className="results-grid">
              <div className={`result-card quality-${prediction.soilQuality.toLowerCase()}`}>
                <h3>Soil Quality</h3>
                <p className="result-value">{prediction.soilQuality}</p>
                <div className="quality-indicator">
                  <div className="quality-bar" style={{ width: `${prediction.overallScore}%` }}></div>
                </div>
                <p className="score-text">Overall Score: {prediction.overallScore}%</p>
              </div>

              <div className="result-card">
                <h3>Estimated pH Level</h3>
                <p className="result-value">{prediction.estimatedPH}</p>
                <p className="result-desc">Optimal range: 6.0 - 7.0</p>
              </div>
            </div>

            <div className="recommendations-section">
              <h3>📋 Recommendations</h3>
              <ul className="recommendations-list">
                {prediction.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>

            {Object.keys(prediction.fertilizerRecommendation).length > 0 && (
              <div className="fertilizer-section">
                <h3>🌾 Fertilizer Recommendations</h3>
                <div className="fertilizer-grid">
                  {Object.entries(prediction.fertilizerRecommendation).map(([key, value]) => (
                    <div key={key} className="fertilizer-card">
                      <span className="fertilizer-type">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      <span className="fertilizer-amount">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="crops-section">
              <h3>🌱 Suitable Crops</h3>
              <div className="crops-list">
                {prediction.suitableCrops.map((crop, index) => (
                  <span key={index} className="crop-tag">{crop}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoilAnalysis;
