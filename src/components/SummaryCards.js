import React from 'react';
import { Heart, Droplets, Bug, TrendingUp } from 'lucide-react';
import '../styles/SummaryCards.css';

const SummaryCards = () => {
  const cards = [
    {
      title: 'Crop Health Status',
      value: '72%',
      subtitle: 'Healthy',
      icon: Heart,
      color: 'green',
      trend: 'up',
      trendValue: '+5%'
    },
    {
      title: 'Soil Moisture Index',
      value: '45%',
      subtitle: 'Moderate',
      icon: Droplets,
      color: 'blue',
      trend: 'down',
      trendValue: '-3%'
    },
    {
      title: 'Pest Risk Level',
      value: 'High',
      subtitle: 'Zone 3',
      icon: Bug,
      color: 'red',
      trend: 'up',
      trendValue: 'Alert'
    },
    
  ];

  return (
    <div className="summary-cards">
      {cards.map((card, index) => (
        <div key={index} className={`summary-card ${card.color}`}>
          <div className="card-header">
            <div className="card-icon">
              <card.icon size={24} />
            </div>
            <div className={`card-trend ${card.trend}`}>
              <span>{card.trendValue}</span>
            </div>
          </div>
          <div className="card-body">
            <h3 className="card-title">{card.title}</h3>
            <div className="card-value">{card.value}</div>
            <div className="card-subtitle">{card.subtitle}</div>
          </div>
          {card.title === 'Crop Health Status' && (
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: card.value }}></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;