import React from 'react';
import WeatherWidget from '../components/WeatherWidget';
import MetricCards from '../components/MetricCards';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>
      
      {/* Weather Widget at the top */}
      <WeatherWidget />
      
      {/* Metric Cards below weather widget */}
      <MetricCards />
      
      <div className="dashboard-content">
        <h2>Farm Overview</h2>
        <p>Welcome to your agriculture monitoring dashboard. Monitor weather conditions above and track your system metrics to make informed farming decisions.</p>
        {/* More dashboard content will go here */}
      </div>
    </div>
  );
};

export default Dashboard;
