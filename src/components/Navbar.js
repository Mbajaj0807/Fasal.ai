import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🌾</span>
          <span className="logo-text">Fasal.ai</span>
        </Link>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`navbar-item ${location.pathname === '/' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className={`navbar-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Dashboard
          </Link>
          <Link 
            to="/analytics" 
            className={`navbar-item ${location.pathname === '/analytics' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Analytics
          </Link>
          <Link 
            to="/reports" 
            className={`navbar-item ${location.pathname === '/reports' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Reports
          </Link>
          <Link 
            to="/alerts" 
            className={`navbar-item ${location.pathname === '/alerts' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Alerts
            <span className="alert-badge">3</span>
          </Link>
        </div>

        <div className="navbar-right">
          <button className="navbar-button">
            <span>🔔</span>
            <span className="notification-dot"></span>
          </button>
          <button className="navbar-button profile-button">
            <span>👤</span>
            <span className="profile-text">Profile</span>
          </button>
        </div>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;