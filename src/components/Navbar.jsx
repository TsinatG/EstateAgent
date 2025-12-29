import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

// ... imports
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar-nav">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-left">
            <Link to="/" className="navbar-logo-link group">
              <Home className="navbar-logo-icon" />
              <span className="navbar-logo-text">rightmove<span className="navbar-logo-text-accent">clone</span></span>
            </Link>
            <div className="navbar-links">
              <Link to="/" className="navbar-link">
                Buy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
