import React from 'react';
import SummaryCards from './SummaryCards';
import FieldMap from './FieldMap';
import AlertsPanel from './AlertsPanel';
import TrendCharts from './TrendCharts';
import '../styles/Dashboard.css';

const Dashboard = ({ selectedCrop, selectedField, dateRange }) => {
  return (
    <main className="dashboard">
      <SummaryCards />
      
      <div className="dashboard-main">
        <div className="dashboard-left">
          <FieldMap selectedField={selectedField} />
          <TrendCharts dateRange={dateRange} />
        </div>
        
        <div className="dashboard-right">
          <AlertsPanel selectedField={selectedField} />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;