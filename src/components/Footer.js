import React from 'react';
import { Download, FileText, FileSpreadsheet } from 'lucide-react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-actions">
        <button className="export-btn">
          <FileText size={18} />
          Download Report (PDF)
        </button>
        <button className="export-btn">
          <FileSpreadsheet size={18} />
          Export Data (Excel)
        </button>
      </div>
      <div className="footer-info">
        <span>Powered by AI & Hyperspectral Imaging</span>
        <span className="separator">•</span>
        <span>Last Updated: 5 minutes ago</span>
        <span className="separator">•</span>
        <span>© 2024 Fasal.ai</span>
      </div>
    </footer>
  );
};

export default Footer;