import React, { useState } from 'react';
import { AlertTriangle, Droplets, Bug, Thermometer, ChevronRight, X } from 'lucide-react';
import '../styles/AlertsPanel.css';

const AlertsPanel = ({ selectedField }) => {
  const [expandedAlert, setExpandedAlert] = useState(null);
  const [dismissedAlerts, setDismissedAlerts] = useState([]);

  const alerts = [
    {
      id: 1,
      level: 'warning',
      icon: Droplets,
      title: 'Low Soil Moisture Detected',
      zone: 'Zone 2',
      description: 'Soil moisture has dropped to 35%, below optimal level of 50-60%',
      action: 'Irrigate Zone 2 for 2 hours',
      recommendation: 'Schedule irrigation for early morning or late evening to minimize evaporation',
      time: '2 hours ago'
    },
    {
      id: 2,
      level: 'critical',
      icon: Bug,
      title: 'Pest Risk - Brown Planthopper',
      zone: 'Zone 4',
      description: 'High pest activity detected. Immediate action required',
      action: 'Apply recommended pesticide',
      recommendation: 'Spray Imidacloprid 17.8% SL at 125ml/acre',
      time: '30 min ago'
    },
    {
      id: 3,
      level: 'warning',
      icon: Thermometer,
      title: 'Temperature Stress',
      zone: 'Zone 1',
      description: 'Temperature exceeding optimal range (35°C)',
      action: 'Increase irrigation frequency',
      recommendation: 'Consider shade nets or mulching for temperature control',
      time: '1 hour ago'
    },
    {
      id: 4,
      level: 'info',
      icon: AlertTriangle,
      title: 'Nutrient Deficiency',
      zone: 'Zone 3',
      description: 'Nitrogen levels showing slight deficiency',
      action: 'Apply fertilizer',
      recommendation: 'Apply 50kg Urea per acre in split doses',
      time: '3 hours ago'
    }
  ];

  const filteredAlerts = alerts.filter(alert => !dismissedAlerts.includes(alert.id));

  const handleDismiss = (alertId) => {
    setDismissedAlerts([...dismissedAlerts, alertId]);
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'critical': return 'alert-critical';
      case 'warning': return 'alert-warning';
      case 'info': return 'alert-info';
      default: return '';
    }
  };

  return (
    <div className="alerts-panel">
      <div className="alerts-header">
        <h2>Insights & Alerts</h2>
        <span className="alert-count">{filteredAlerts.length} Active</span>
      </div>

      <div className="alerts-list">
        {filteredAlerts.map(alert => (
          <div key={alert.id} className={`alert-item ${getLevelColor(alert.level)}`}>
            <div className="alert-main">
              <div className="alert-icon">
                <alert.icon size={20} />
              </div>
              
              <div className="alert-content">
                <div className="alert-title-row">
                  <h3 className="alert-title">{alert.title}</h3>
                  <button 
                    className="alert-dismiss"
                    onClick={() => handleDismiss(alert.id)}
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <div className="alert-meta">
                  <span className="alert-zone">{alert.zone}</span>
                  <span className="alert-time">{alert.time}</span>
                </div>
                
                <p className="alert-description">{alert.description}</p>
                
                <button 
                  className="alert-expand"
                  onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
                >
                  <span>View Action</span>
                  <ChevronRight 
                    size={16} 
                    className={expandedAlert === alert.id ? 'rotated' : ''}
                  />
                </button>
              </div>
            </div>

            {expandedAlert === alert.id && (
              <div className="alert-actions">
                <div className="action-card">
                  <h4>Recommended Action</h4>
                  <p className="action-text">{alert.action}</p>
                  <p className="action-recommendation">{alert.recommendation}</p>
                  <button className="action-button primary">
                    Execute Action
                  </button>
                  <button className="action-button secondary">
                    Schedule for Later
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="no-alerts">
          <AlertTriangle size={48} />
          <p>No active alerts</p>
          <span>All systems operating normally</span>
        </div>
      )}
    </div>
  );
};

export default AlertsPanel;