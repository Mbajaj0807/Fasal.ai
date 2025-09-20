import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Image, 
  Activity, 
  Droplets, 
  AlertTriangle,
  Map,
  FileText,
  Settings,
  Menu,
  X
} from 'lucide-react';
import './SidebarNav.css';

const SidebarNav = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/image-analysis', name: 'Image Analysis', icon: Image },
    { path: '/sensor-data', name: 'Sensor Data', icon: Activity },
    { path: '/soil-analysis', name: 'Soil Analysis', icon: Droplets },
    { path: '/alerts', name: 'Alerts', icon: AlertTriangle, badge: '3' },
    { path: '/field-map', name: 'Field Map', icon: Map },
    { path: '/reports', name: 'Reports', icon: FileText },
    { path: '/settings', name: 'Settings', icon: Settings }
  ];

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleItemClick = () => {
    // Close mobile menu when an item is clicked
    if (window.innerWidth <= 768) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button className="mobile-menu-btn" onClick={toggleMobile}>
        <Menu size={24} />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="sidebar-overlay" onClick={toggleMobile}></div>
      )}

      {/* Sidebar */}
      <aside className={`sidebar-nav ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">🌾</span>
            <span className="logo-text">Fasal.ai</span>
          </div>
          {/* Mobile Close Button */}
          <button className="mobile-close-btn" onClick={toggleMobile}>
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
                           (item.path === '/dashboard' && location.pathname === '/');
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                onClick={handleItemClick}
              >
                <div className="sidebar-item-icon">
                  <Icon size={20} />
                  {item.badge && (
                    <span className="sidebar-badge">{item.badge}</span>
                  )}
                </div>
                <span className="sidebar-item-text">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="user-avatar">👤</div>
            <div className="user-info">
              <span className="user-name">Manan Bajaj</span>
              <span className="user-role">Admin</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarNav;