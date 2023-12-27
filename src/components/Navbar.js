// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate=useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    navigate("/login");
  };
  const handleClick = () => {
    navigate('/dashboard/addpost');
  };
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Reddit
        </Link>
        <div className="navbar-links">
          <Link to="/home" className="navbar-link">
            Home
          </Link>
          <Link to="/popular" className="navbar-link">
            Popular
          </Link>
          <Link to="/subreddits" className="navbar-link">
            Subreddits
          </Link>
          {/* Add more links as needed */}
        </div>
        <div className="navbar-actions">
          <button className="navbar-button" onClick={handleClick}>Create Post</button>
          <button className="navbar-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
