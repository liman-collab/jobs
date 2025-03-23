
import React from 'react';
import './Footer.css';
import { AppBar } from '@mui/material';

const Footer = () => {
  return (
    <AppBar position="sticky" sx={{ bgcolor: 'primary.main', mt: 10 }}>
      <div className="footer-content">
        <p>&copy; 2025 Job Portal. All rights reserved.</p>
        <ul className="social-links">
          <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
          <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        </ul>
      </div>
    </AppBar>
  );
};

export default Footer;
