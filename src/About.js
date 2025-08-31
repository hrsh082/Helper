import React from 'react';
import './About.css';
import LOGO from './assets/logo.jpg';

function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 12 }}>
          <img src={LOGO} alt="Helper logo" style={{ width: 40, height: 40, borderRadius: '50%' }} />
          <h1>About Helper</h1>
        </div>
        <p className="about-subtitle">Trusted home services — electricians, plumbers, mechanics, cleaning and more.</p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2>Who we are</h2>
          <p>
            Helper connects you with verified, local professionals for everyday home needs. From
            quick electrical fixes and plumbing repairs to AC servicing, carpentry, and deep cleaning —
            we make it easy to book reliable experts at transparent prices.
          </p>
        </div>

        <div className="about-section">
          <h2>Why choose Helper</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>Verified Professionals</h3>
              <p>Background-checked, skilled experts with community-rated feedback.</p>
            </div>
            <div className="service-card">
              <h3>Upfront Pricing</h3>
              <p>No surprises. Clear estimates, secure payment options.</p>
            </div>
            <div className="service-card">
              <h3>Fast Booking</h3>
              <p>Book in minutes. Same-day or scheduled visits as you prefer.</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>How it works</h2>
          <ul className="values-list">
            <li>Tell us your need — choose a service and describe the issue.</li>
            <li>Get matched — we connect you with the right professional.</li>
            <li>Relax — the expert completes the job, you pay securely.</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Our promise</h2>
          <ul className="values-list">
            <li>Quality workmanship with genuine parts when needed.</li>
            <li>On-time arrival and respectful in-home service.</li>
            <li>Support that listens — reach us anytime from 8:00 AM – 9:00 PM.</li>
          </ul>
        </div>

        <div className="about-stats">
          <div className="stat">
            <strong>1,000+</strong>
            <span>Happy customers</span>
          </div>
          <div className="stat">
            <strong>50+</strong>
            <span>Trusted professionals</span>
          </div>
          <div className="stat">
            <strong>25+</strong>
            <span>Service categories</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;