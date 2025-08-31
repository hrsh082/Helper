import React from 'react';
import { Link } from 'react-router-dom';
import LOGO from "./assets/logo.jpg";

function Footer() {
  const year = new Date().getFullYear();

  const sectionStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 20px'
  };

  const linkStyle = { color: 'inherit', textDecoration: 'none' };
  const mutedStyle = { color: 'var(--muted-text)' };

  return (
    <footer style={{ background: 'var(--surface)', color: 'var(--text)', borderTop: '1px solid var(--border)' }}>
      <div style={sectionStyle}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src={LOGO} alt="Helper logo" style={{ width: 40, height: 40, borderRadius: '50%' }} />
            <span style={{ fontWeight: 800, fontSize: 18 }}>Helper</span>
          </div>
          <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.6, ...mutedStyle }}>
            Your trusted partner for home services — electricians, plumbers, cleaning, AC repair and more.
          </p>
        </div>

        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: 16 }}>Quick Links</h4>
          <nav style={{ display: 'grid', gap: 8 }}>
            <Link to="/" style={linkStyle}>Home</Link>
            <Link to="/services" style={linkStyle}>Services</Link>
            <Link to="/about" style={linkStyle}>About</Link>
            <Link to="/contact" style={linkStyle}>Contact</Link>
          </nav>
        </div>

        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: 16 }}>Contact</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
            <li style={mutedStyle}>Phone: +91 9898989898</li>
            <li style={mutedStyle}>Email: support@helper.com</li>
            <li style={mutedStyle}>Hours: 8:00 AM – 9:00 PM</li>
          </ul>
        </div>

        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: 16 }}>Legal</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
            <li><a href="#privacy" style={linkStyle}>Privacy Policy</a></li>
            <li><a href="#terms" style={linkStyle}>Terms of Service</a></li>
            <li><a href="#refunds" style={linkStyle}>Refund Policy</a></li>
          </ul>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border)', padding: '12px 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', fontSize: 14 }}>
          <span style={mutedStyle}>© {year} HELPER. All rights reserved.</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a aria-label="Twitter" href="#" style={{ color: 'inherit' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 001.87-2.37 8.53 8.53 0 01-2.7 1.03 4.25 4.25 0 00-7.24 3.87A12.08 12.08 0 013 4.9a4.24 4.24 0 001.32 5.67 4.2 4.2 0 01-1.93-.53v.06a4.25 4.25 0 003.41 4.17c-.47.13-.96.2-1.46.08a4.25 4.25 0 003.97 2.95A8.52 8.52 0 012 19.54a12.03 12.03 0 006.53 1.92c7.85 0 12.14-6.5 12.14-12.13l-.01-.55A8.67 8.67 0 0024 6.5c-.7.31-1.46.52-2.26.6z"/></svg>
            </a>
            <a aria-label="Facebook" href="#" style={{ color: 'inherit' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 10-11.5 9.9v-7H7.5V12h3v-2.3c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 1-2 2V12h3.4l-.6 2.9H14.7v7A10 10 0 0022 12z"/></svg>
            </a>
            <a aria-label="Instagram" href="#" style={{ color: 'inherit' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3.5A5.5 5.5 0 1112 18.5 5.5 5.5 0 0112 7.5zm0 2A3.5 3.5 0 1015.5 13 3.5 3.5 0 0012 9.5zM18 6.3a1 1 0 110 2 1 1 0 010-2z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
