
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Job Portal</h1>
      </div>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/jobs">Jobs</Link>
          </li>
          <li>
            <Link to="/auth">Sign In / Sign Up</Link>
          </li>
          <li>
            <Link to="/cities">Qytetet</Link>
          </li>
          <li>
            <Link to="/categories">Kategorite</Link>
          </li>
          <li>
            <Link to="/create-job">Create Job</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
