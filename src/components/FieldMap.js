import React, { useState } from 'react';
import { MapPin, Maximize2, Info } from 'lucide-react';
import '../styles/FieldMap.css';

const FieldMap = ({ selectedField }) => {
  const [hoveredZone, setHoveredZone] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);

  const zones = [
    { id: 1, x: 10, y: 10, width: 35, height: 35, health: 'healthy', ndvi: 0.78, moisture: 65, risk: 'Low' },
    { id: 2, x: 50, y: 10, width: 35, height: 35, health: 'stressed', ndvi: 0.52, moisture: 35, risk: 'Medium' },
    { id: 3, x: 10, y: 50, width: 35, height: 35, health: 'healthy', ndvi: 0.71, moisture: 58, risk: 'Low' },
    { id: 4, x: 50, y: 50, width: 35, height: 35, health: 'critical', ndvi: 0.32, moisture: 25, risk: 'High' },
  ];

  const getZoneColor = (health) => {
    switch(health) {
      case 'healthy': return '#4CAF50';
      case 'stressed': return '#FFC107';
      case 'critical': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  return (
    <div className="field-map-container">
      <div className="map-header">
        <h2 className="map-title">
          <MapPin size={20} />
          Field Health Map - {selectedField}
        </h2>
        <button className="map-expand">
          <Maximize2 size={18} />
        </button>
      </div>

      <div className="map-content">
        <svg className="field-map" viewBox="0 0 100 100">
          {zones.map(zone => (
            <g key={zone.id}>
              <rect
                x={zone.x}
                y={zone.y}
                width={zone.width}
                height={zone.height}
                fill={getZoneColor(zone.health)}
                fillOpacity={0.7}
                stroke={selectedZone === zone.id ? '#000' : '#fff'}
                strokeWidth={selectedZone === zone.id ? 2 : 1}
                className="zone-rect"
                onMouseEnter={() => setHoveredZone(zone)}
                onMouseLeave={() => setHoveredZone(null)}
                onClick={() => setSelectedZone(zone.id)}
              />
              <text
                x={zone.x + zone.width / 2}
                y={zone.y + zone.height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                className="zone-label"
              >
                Zone {zone.id}
              </text>
            </g>
          ))}
        </svg>

        {hoveredZone && (
          <div className="zone-tooltip">
            <div className="tooltip-header">Zone {hoveredZone.id}</div>
            <div className="tooltip-content">
              <div className="tooltip-row">
                <span>NDVI:</span>
                <span className="tooltip-value">{hoveredZone.ndvi}</span>
              </div>
              <div className="tooltip-row">
                <span>Moisture:</span>
                <span className="tooltip-value">{hoveredZone.moisture}%</span>
              </div>
              <div className="tooltip-row">
                <span>Risk:</span>
                <span className={`tooltip-value risk-${hoveredZone.risk.toLowerCase()}`}>
                  {hoveredZone.risk}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="map-legend">
          <h4>NDVI Scale</h4>
          <div className="legend-items">
            <div className="legend-item">
              <span className="legend-color healthy"></span>
              <span>Healthy (0.6-1.0)</span>
            </div>
            <div className="legend-item">
              <span className="legend-color stressed"></span>
              <span>Stressed (0.4-0.6)</span>
            </div>
            <div className="legend-item">
              <span className="legend-color critical"></span>
              <span>Critical (&lt;0.4)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="map-info">
        <Info size={16} />
        <span>Click zones for detailed analysis • Hover for quick stats</span>
      </div>
    </div>
  );
};

export default FieldMap;