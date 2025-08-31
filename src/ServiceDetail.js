import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooking } from './contexts/BookingContext';
import MapPicker from './MapPicker';
import { useLocationContext } from './contexts/LocationContext';

const serviceData = {
  'electrician': {
    title: 'Electrician Services',
    image: '/src/assets/elc.jpg',
    description: 'Professional electrical services for your home and office',
    startingPrice: '₹299',
    features: [
      'Switch & Socket Installation',
      'Fan & Light Fitting',
      'MCB & Wiring',
      'Appliance Installation',
      'Electrical Safety Checks',
      'Emergency Repairs'
    ],
    providers: [
      { id: 1, name: 'Rajesh Kumar', rating: 4.8, experience: '8 years', price: '₹299', available: true, lat: 28.6448, lon: 77.2167 },
      { id: 2, name: 'Amit Singh', rating: 4.6, experience: '5 years', price: '₹349', available: true, lat: 28.5355, lon: 77.3910 },
      { id: 3, name: 'Vikram Patel', rating: 4.9, experience: '12 years', price: '₹399', available: false, lat: 28.4089, lon: 77.3178 }
    ]
  },
  'plumber': {
    title: 'Plumbing Services',
    image: '/src/assets/plumber.jpg',
    description: 'Expert plumbing solutions for all your needs',
    startingPrice: '₹249',
    features: [
      'Leak Repairs',
      'Tap & Mixer Installation',
      'Drain Cleaning',
      'Bathroom Fittings',
      'Pipe Repairs',
      'Water Heater Service'
    ],
    providers: [
      { id: 4, name: 'Suresh Yadav', rating: 4.7, experience: '6 years', price: '₹249', available: true, lat: 19.0760, lon: 72.8777 },
      { id: 5, name: 'Ramesh Kumar', rating: 4.5, experience: '4 years', price: '₹299', available: true, lat: 19.2183, lon: 72.9781 },
      { id: 6, name: 'Mohan Das', rating: 4.8, experience: '10 years', price: '₹349', available: true, lat: 18.5204, lon: 73.8567 }
    ]
  },
  'carpenter': {
    title: 'Carpentry Services',
    image: '/src/assets/carpenter.jpg',
    description: 'Quality woodwork and furniture services',
    startingPrice: '₹399',
    features: [
      'Furniture Assembly',
      'Door & Window Repairs',
      'Shelf Installation',
      'Cabinet Making',
      'Wood Repairs',
      'Custom Woodwork'
    ],
    providers: [
      { id: 7, name: 'Lakshman Rao', rating: 4.6, experience: '7 years', price: '₹399', available: true, lat: 13.0827, lon: 80.2707 },
      { id: 8, name: 'Krishna Kumar', rating: 4.4, experience: '3 years', price: '₹449', available: true, lat: 12.9716, lon: 77.5946 },
      { id: 9, name: 'Venkatesh', rating: 4.9, experience: '15 years', price: '₹599', available: false, lat: 17.3850, lon: 78.4867 }
    ]
  },
  'mechanic': {
    title: 'Mechanic Services',
    image: '/src/assets/garage.jpg',
    description: 'Two-wheeler and four-wheeler maintenance',
    startingPrice: '₹199',
    features: [
      'Battery Service',
      'Puncture Repair',
      'Oil Change',
      'Basic Servicing',
      'Jump Start',
      'Tire Replacement'
    ],
    providers: [
      { id: 10, name: 'Prakash Singh', rating: 4.5, experience: '6 years', price: '₹199', available: true, lat: 23.0225, lon: 72.5714 },
      { id: 11, name: 'Harish Kumar', rating: 4.7, experience: '8 years', price: '₹249', available: true, lat: 22.7196, lon: 75.8577 },
      { id: 12, name: 'Sunil Verma', rating: 4.8, experience: '12 years', price: '₹299', available: true, lat: 26.9124, lon: 75.7873 }
    ]
  },
  'ac-repair': {
    title: 'AC Repair & Service',
    image: '/src/assets/ac.jpg',
    description: 'Professional AC maintenance and repair',
    startingPrice: '₹499',
    features: [
      'AC Installation',
      'Gas Refilling',
      'General Service',
      'Cooling Issues',
      'Filter Cleaning',
      'Emergency Repairs'
    ],
    providers: [
      { id: 13, name: 'Arun Kumar', rating: 4.8, experience: '10 years', price: '₹499', available: true, lat: 28.4595, lon: 77.0266 },
      { id: 14, name: 'Deepak Singh', rating: 4.6, experience: '6 years', price: '₹549', available: true, lat: 28.7041, lon: 77.1025 },
      { id: 15, name: 'Rahul Sharma', rating: 4.9, experience: '14 years', price: '₹699', available: true, lat: 29.1492, lon: 75.7217 }
    ]
  },
  'cleaning': {
    title: 'Home Cleaning Services',
    image: '/src/assets/clean.png',
    description: 'Professional cleaning for your home',
    startingPrice: '₹399',
    features: [
      'Kitchen Deep Cleaning',
      'Bathroom Cleaning',
      'Sofa & Mattress',
      'Full Home Cleaning',
      'Move-in/out Cleaning',
      'Regular Maintenance'
    ],
    providers: [
      { id: 16, name: 'Priya Devi', rating: 4.7, experience: '5 years', price: '₹399', available: true, lat: 22.5726, lon: 88.3639 },
      { id: 17, name: 'Sunita Kumari', rating: 4.5, experience: '3 years', price: '₹449', available: true, lat: 21.1702, lon: 72.8311 },
      { id: 18, name: 'Lakshmi Bai', rating: 4.8, experience: '8 years', price: '₹549', available: true, lat: 25.5941, lon: 85.1376 }
    ]
  }
};

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { selectService } = useBooking();
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [serviceLocation, setServiceLocation] = useState('');
  const [mapOpen, setMapOpen] = useState(false);
  const [serviceCoords, setServiceCoords] = useState(null); // { lat, lon }
  const [distanceKm, setDistanceKm] = useState(null);
  const { locationText, coords } = useLocationContext();

  useEffect(() => {
    if (locationText) {
      setServiceLocation(locationText);
    }
    if (coords && coords.lat && coords.lon) {
      // Ensure coords are properly formatted
      setServiceCoords({
        lat: typeof coords.lat === 'string' ? parseFloat(coords.lat) : coords.lat,
        lon: typeof coords.lon === 'string' ? parseFloat(coords.lon) : coords.lon
      });
    }
  }, [locationText, coords]);

  const service = serviceData[serviceId];

  const handleBookNow = () => {
    if (selectedProvider && serviceLocation) {
      // Include both location text and coordinates for persistence
      selectService({
        ...service,
        provider: selectedProvider,
        location: serviceLocation,
        locationCoords: serviceCoords
      });
      navigate('/booking');
    }
  };

  async function reverseGeocodeAndSet(lat, lon) {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
      const res = await fetch(url);
      const data = await res.json();
      const name = data?.display_name || `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
      setServiceLocation(name);
      setServiceCoords({ lat, lon });
    } catch (_) {
      setServiceLocation(`${lat.toFixed(4)}, ${lon.toFixed(4)}`);
      setServiceCoords({ lat, lon });
    }
  }

  const handleUseMyLocation = () => {
    if (!('geolocation' in navigator)) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        reverseGeocodeAndSet(latitude, longitude);
      },
      (err) => {
        console.error('Geolocation error', err);
        alert('Unable to fetch your location. Please allow location permission or use the map picker.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  function haversineDistanceKm(a, b) {
    if (!a || !b) return Infinity;
    
    // Ensure coordinates are numbers
    const aLat = typeof a.lat === 'string' ? parseFloat(a.lat) : a.lat;
    const aLon = typeof a.lon === 'string' ? parseFloat(a.lon) : a.lon;
    const bLat = typeof b.lat === 'string' ? parseFloat(b.lat) : b.lat;
    const bLon = typeof b.lon === 'string' ? parseFloat(b.lon) : b.lon;
    
    if (isNaN(aLat) || isNaN(aLon) || isNaN(bLat) || isNaN(bLon)) return Infinity;
    
    const R = 6371; // km
    const dLat = toRadians(bLat - aLat);
    const dLon = toRadians(bLon - aLon);
    const lat1 = toRadians(aLat);
    const lat2 = toRadians(bLat);
    const sinDLat = Math.sin(dLat / 2);
    const sinDLon = Math.sin(dLon / 2);
    const h = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;
    const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
    return R * c;
  }

  useEffect(() => {
    if (!serviceCoords || !service) return;
    const available = (service.providers || []).filter((p) => p.available && typeof p.lat === 'number' && typeof p.lon === 'number');
    if (available.length === 0) return;
    let best = null;
    let bestDist = Infinity;
    for (const p of available) {
      const d = haversineDistanceKm(serviceCoords, { lat: p.lat, lon: p.lon });
      if (d < bestDist) {
        bestDist = d;
        best = p;
      }
    }
    setSelectedProvider(best);
    // Cap the distance at a reasonable value (100 km) for display purposes
    // This prevents showing unreasonably large distances
    const displayDistance = best ? Math.min(Math.round(bestDist * 10) / 10, 100) : null;
    setDistanceKm(displayDistance);
  }, [serviceCoords, service]);

  return (
    !service ? (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Service not found</h2>
        <button onClick={() => navigate('/services')} className="btn btn-primary">
          Back to Services
        </button>
      </div>
    ) : (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--text)', marginBottom: '1rem' }}>
          {service.title}
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--muted-text)', maxWidth: '600px', margin: '0 auto' }}>
          {service.description}
        </p>
        <div style={{ marginTop: '1rem' }}>
          <span style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: 'var(--accent)',
            padding: '0.5rem 1rem',
            background: 'var(--surface)',
            borderRadius: '8px'
          }}>
            Starting at {service.startingPrice}
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
        {/* Left Column - Service Info */}
        <div>
          <div style={{ 
            background: 'var(--card-bg)', 
            border: '1px solid var(--card-border)', 
            borderRadius: '12px',
            padding: '2rem',
            marginBottom: '2rem'
          }}>
            <h3 style={{ color: 'var(--text)', marginBottom: '1rem' }}>What's Included</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {service.features.map((feature, index) => (
                <li key={index} style={{ 
                  padding: '0.5rem 0', 
                  color: 'var(--muted-text)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ color: 'var(--accent)' }}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ 
            background: 'var(--card-bg)', 
            border: '1px solid var(--card-border)', 
            borderRadius: '12px',
            padding: '2rem'
          }}>
            <h3 style={{ color: 'var(--text)', marginBottom: '1rem' }}>Why Choose Helper?</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  background: 'var(--accent)', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem'
                }}>
                  🛡️
                </div>
                <div>
                  <strong style={{ color: 'var(--text)' }}>Verified Professionals</strong>
                  <p style={{ color: 'var(--muted-text)', margin: 0, fontSize: '0.9rem' }}>
                    Background-checked experts with community ratings
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  background: 'var(--accent)', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem'
                }}>
                  ⏰
                </div>
                <div>
                  <strong style={{ color: 'var(--text)' }}>Same Day Service</strong>
                  <p style={{ color: 'var(--muted-text)', margin: 0, fontSize: '0.9rem' }}>
                    Book now, get service today or schedule for later
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  background: 'var(--accent)', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem'
                }}>
                  💰
                </div>
                <div>
                  <strong style={{ color: 'var(--text)' }}>Transparent Pricing</strong>
                  <p style={{ color: 'var(--muted-text)', margin: 0, fontSize: '0.9rem' }}>
                    No hidden charges, upfront quotes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Provider Selection & Location */}
        <div>
          {/* Location Selection */}
          <div style={{ 
            background: 'var(--card-bg)', 
            border: '1px solid var(--card-border)', 
            borderRadius: '12px',
            padding: '2rem',
            marginBottom: '2rem'
          }}>
            <h3 style={{ color: 'var(--text)', marginBottom: '1.5rem' }}>Service Location</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="20" height="20" fill="var(--accent)" viewBox="0 0 24 24">
                <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
              </svg>
              <input
                type="text"
                value={serviceLocation}
                onChange={(e) => setServiceLocation(e.target.value)}
                placeholder="Enter service address or use map picker"
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  border: '1px solid var(--input-border)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: 'var(--input-text)',
                  background: 'var(--input-bg)'
                }}
              />
              <button
                type="button"
                onClick={handleUseMyLocation}
                className="btn btn-secondary location-btn"
                style={{
                  width: 40,
                  height: 40,
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  fontSize: '18px'
                }}
              >
                📍
              </button>
              <button
                type="button"
                onClick={() => setMapOpen(true)}
                title="Pick on map"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                  color: 'var(--text)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
                </svg>
              </button>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--muted-text)', marginTop: '0.5rem' }}>
              Select where you need the service. This helps us find nearby professionals.
            </p>
          </div>

          {/* Nearest Professional (auto-selected) */}
          <div style={{ 
            background: 'var(--card-bg)', 
            border: '1px solid var(--card-border)', 
            borderRadius: '12px',
            padding: '2rem'
          }}>
            <h3 style={{ color: 'var(--text)', marginBottom: '1.5rem' }}>Nearest Professional</h3>
            {!serviceLocation || !serviceCoords ? (
              <p style={{ color: 'var(--muted-text)' }}>Pick your service location to auto-assign the nearest available professional.</p>
            ) : !selectedProvider ? (
              <p style={{ color: 'var(--muted-text)' }}>No available professional found near your location.</p>
            ) : (
              <div
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '1rem',
                  background: 'var(--card-bg)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ color: 'var(--text)', margin: '0 0 0.5rem 0' }}>{selectedProvider.name}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--accent)' }}>⭐ {selectedProvider.rating}</span>
                      <span style={{ color: 'var(--muted-text)' }}>{selectedProvider.experience} experience</span>
                      {typeof distanceKm === 'number' && (
                        <span style={{ color: 'var(--muted-text)' }}>{distanceKm} km away</span>
                      )}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text)' }}>
                      {selectedProvider.price}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent)' }}>
                      Assigned
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleBookNow}
              disabled={!selectedProvider || !serviceLocation}
              style={{
                width: '100%',
                padding: '1rem',
                marginTop: '1.5rem',
                background: (selectedProvider && serviceLocation) ? 'var(--accent)' : 'var(--border)',
                color: (selectedProvider && serviceLocation) ? 'white' : 'var(--muted-text)',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: (selectedProvider && serviceLocation) ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease'
              }}
            >
              {!serviceLocation ? 'Enter service location' : 
               !selectedProvider ? 'Finding nearest professional…' : 
               `Book ${selectedProvider.name} for ${selectedProvider.price}`}
            </button>
          </div>
        </div>
      </div>

      {/* Map Picker Modal */}
      <MapPicker
        open={mapOpen}
        onClose={() => setMapOpen(false)}
        onSelect={async ({ lat, lon }) => {
          try {
            const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
            const res = await fetch(url);
            const data = await res.json();
            const name = data?.display_name || `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
            setServiceLocation(name);
            setServiceCoords({ lat, lon });
          } catch (_) {
            setServiceLocation(`${lat.toFixed(4)}, ${lon.toFixed(4)}`);
            setServiceCoords({ lat, lon });
          } finally {
            setMapOpen(false);
          }
        }}
      />
    </div>
    )
  );
}
