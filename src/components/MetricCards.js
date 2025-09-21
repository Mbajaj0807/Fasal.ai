import React from 'react';
import './MetricCards.css';

const MetricCards = () => {
  const cards = [
    {
      title: 'Active Fields',
      value: '4',
      subtitle: '1 from last month',
      icon: '🌾',
      trend: 'neutral',
      color: 'green'
    },
    {
      title: 'Online Sensors',
      value: '3/3',
      subtitle: 'All systems operational',
      icon: '📡',
      trend: 'good',
      color: 'sky'
    },
    {
      title: 'System Health',
      value: '66%',
      subtitle: 'Needs attention',
      icon: '🌱',
      trend: 'warning',
      color: 'amber'
    },
    {
      title: 'Active Alerts',
      value: '3',
      subtitle: 'All systems normal',
      icon: '🔔',
      trend: 'good',
      color: 'leaf'
    }
  ];

  return (
    <div className="metric-cards-container">
      {cards.map((card, index) => (
        <div key={index} className={`metric-card ${card.color} ${card.trend}`}>
          <div className="card-header">
            <span className="card-icon">{card.icon}</span>
            <span className="card-title">{card.title}</span>
          </div>
          <div className="card-body">
            <div className="card-value">{card.value}</div>
            <div className="card-subtitle">{card.subtitle}</div>
          </div>
          {card.trend === 'good' && (
            <div className="trend-indicator good">
              <span>✓</span>
            </div>
          )}
          {card.trend === 'warning' && (
            <div className="trend-indicator warning">
              <span>!</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MetricCards;