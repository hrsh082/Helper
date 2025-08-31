import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';
import IMG_ELECTRICIAN from './assets/elc.jpg';
import IMG_PLUMBER from './assets/plumber.jpg';
import IMG_CARPENTER from './assets/carpenter.jpg';
import IMG_MECHANIC from './assets/garage.jpg';
import IMG_AC from './assets/ac.jpg';
import IMG_CLEAN from './assets/clean.png';

function Services() {
  const services = [
    {
      title: 'Electrician',
      image: IMG_ELECTRICIAN,
      description: 'On-demand electrical installation, repair, and safety checks for your home.',
      features: ['Switches & Sockets', 'Fan/Light Installation', 'Wiring & MCB', 'Appliance Fitting'],
    },
    {
      title: 'Plumber',
      image: IMG_PLUMBER,
      description: 'Fast, reliable plumbing fixes and fitting for kitchens and bathrooms.',
      features: ['Leak Repair', 'Tap & Mixer Fitting', 'Drain Cleaning', 'Bathroom Fittings'],
    },
    {
      title: 'Carpenter',
      image: IMG_CARPENTER,
      description: 'Custom woodwork, assembly, and repairs done right at your place.',
      features: ['Furniture Repair', 'Door/Window Fix', 'Shelf Installation', 'Assembly'],
    },
    {
      title: 'Mechanic',
      image: IMG_MECHANIC,
      description: 'Two-wheeler and four-wheeler basic service and emergency fixes.',
      features: ['Battery/Jump Start', 'Puncture Fix', 'Oil Change', 'Basic Servicing'],
    },
    {
      title: 'AC Repair',
      image: IMG_AC,
      description: 'Quick AC diagnosis, gas refilling, and seasonal servicing.',
      features: ['General Service', 'Gas Top-up', 'Installation/Uninstallation', 'Cooling Issues'],
    },
    {
      title: 'Home Cleaning',
      image: IMG_CLEAN,
      description: 'Deep cleaning for kitchens, bathrooms, and full homes with care.',
      features: ['Kitchen/Bath Cleaning', 'Sofa & Mattress', 'Full Home', 'Move-in/Out'],
    },
  ];

  return (
    <div className="services-container">
      <div className="services-header">
        <h1>Home Services, Done Right</h1>
        <p className="services-subtitle">Trusted professionals for every need — fast, affordable, and reliable.</p>
      </div>

      <div className="services-grid">
        {services.map((svc) => (
          <div className="service-item" key={svc.title}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img
                src={svc.image}
                alt={svc.title}
                style={{ width: 88, height: 88, objectFit: 'cover', borderRadius: '50%', marginBottom: 12, border: '1px solid var(--card-border)' }}
              />
              <h2 style={{ fontSize: 18, margin: '6px 0 0 0' }}>{svc.title}</h2>
            </div>
            <p style={{ color: 'var(--muted-text)' }}>{svc.description}</p>
            <ul>
              {svc.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              <Link to="/contact" className="btn btn-primary">Book Now</Link>
              <Link to="/about" className="btn btn-secondary">Learn More</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;