import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LOGO from "./assets/logo.jpg";

export default function Header({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();
  
  // Manage dark mode state internally
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(() => {
    try {
      return localStorage.getItem('theme') === 'dark';
    } catch (_) {
      return false; // default to light
    }
  });

  // Apply theme changes to document and save to localStorage
  useEffect(() => {
    const theme = isDarkModeEnabled ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    try { 
      localStorage.setItem('theme', theme); 
    } catch (_) {}
  }, [isDarkModeEnabled]);

  return (
    <header style={{ borderBottom: "1px solid #ddd" }}>
      {/* TOP BAR */}
      <div
        style={{
          color: "blue",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 20px',
          background: 'rgba(241, 244, 247, 0.2)', // Transparent blue
          flexWrap: 'wrap', // Helps stack items on small screens
        }}
      >
        {/* Logo */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <Link to="/" aria-label="Home" style={{ textDecoration: "none", color: "inherit" }}>
            <img style={{ width: '40px', height: '40px', borderRadius: '50%' }} src={LOGO} alt="Logo" />
            <h1 className="logo" style={{ marginLeft: '50px', marginTop: "-35px", fontSize: '24px', color: 'blue' }}>
              Helper
            </h1>
          </Link>
        </div>

        {/* BOTTOM NAV BAR */}
        <nav
          style={{
            display: 'flex',
            gap: '20px',
            padding: '10px 20px',
            justifyContent: 'center',
            background: isDarkModeEnabled ? '#222' : 'rgba(243, 243, 243, 0.1)', // transparent blue
            color: 'blue',
          }}
        >
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
          <Link to="/services" style={{ color: "inherit", textDecoration: "none" }}>Services</Link>
          <Link to="/about" style={{ color: "inherit", textDecoration: "none" }}>About</Link>
          <Link to="/contact" style={{ color: "inherit", textDecoration: "none" }}>Contact</Link>
        </nav>

        {/* Right Side Buttons */}
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "10px" }}>
          {/* Dark/Light Mode Toggle */}
          <button
            type="button"
            aria-label={isDarkModeEnabled ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => setIsDarkModeEnabled(v => !v)}
            title={isDarkModeEnabled ? 'Light mode' : 'Dark mode'}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer"
            }}
          >
            {isDarkModeEnabled ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 18a6 6 0 100-12 6 6 0 000 12z" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            )}
          </button>

          {/* Sign In/Out Button */}
          {isAuthenticated ? (
            <button className="btn btn-primary" onClick={onLogout}>
              Sign Out
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => navigate('/signin')}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
