import React from 'react';
import { User, Bell, Settings, BarChart3, FileText, AlertTriangle } from 'lucide-react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <span className="logo-icon">🌾</span>
          <span className="logo-text">Fasal.ai</span>
        </div>
        <nav className="nav">
          <a href="#dashboard" className="nav-item active">
            <BarChart3 size={18} />
            Dashboard
          </a>
          <a href="#reports" className="nav-item">
            <FileText size={18} />
            Reports
          </a>
          <a href="#alerts" className="nav-item">
            <AlertTriangle size={18} />
            Alerts
          </a>
          <a href="#settings" className="nav-item">
            <Settings size={18} />
            Settings
          </a>
        </nav>
      </div>
      <div className="header-right">
        <button className="notification-btn">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>
        <div className="profile-dropdown">
          <button className="profile-btn">
            <User size={20} />
            <span>John Farmer</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;