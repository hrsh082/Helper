import React, { useEffect, useRef, useState } from 'react';
import './MapPicker.css';

export default function MapPicker({ open, onClose, onSelect, initialLat = 20.5937, initialLon = 78.9629, initialZoom = 15 }) {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const autocompleteRef = useRef(null);
  const markerRef = useRef(null);
  const [center, setCenter] = useState({ lat: initialLat, lon: initialLon });
  const [isLocating, setIsLocating] = useState(false);
  const [addressPreview, setAddressPreview] = useState('');
  const [isReverseGeocoding, setIsReverseGeocoding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchBoxRef = useRef(null);

  useEffect(() => {
    if (!open || !window.google || !window.google.maps) return;
    
    // Initialize Google Map
    const mapOptions = {
      center: { lat: initialLat, lng: initialLon },
      zoom: initialZoom,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: true,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    };
    
    const map = new window.google.maps.Map(containerRef.current, mapOptions);
    mapRef.current = map;
    
    // Create marker for the center
    const marker = new window.google.maps.Marker({
      position: { lat: initialLat, lng: initialLon },
      map: map,
      draggable: false,
      animation: window.google.maps.Animation.DROP
    });
    markerRef.current = marker;
    
    // Initialize Places Autocomplete
    const autocomplete = new window.google.maps.places.Autocomplete(searchBoxRef.current, {
      fields: ['formatted_address', 'geometry', 'name'],
      componentRestrictions: { country: 'in' } // Restrict to India, change as needed
    });
    autocompleteRef.current = autocomplete;
    
    // Listen for place selection
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) return;
      
      // Update map and marker
      map.setCenter(place.geometry.location);
      map.setZoom(17);
      marker.setPosition(place.geometry.location);
      
      // Update state
      const newCenter = { 
        lat: place.geometry.location.lat(), 
        lon: place.geometry.location.lng() 
      };
      setCenter(newCenter);
      setAddressPreview(place.formatted_address || place.name);
      setSearchQuery(place.formatted_address || place.name);
    });
    
    // Listen for map center changes
    map.addListener('center_changed', () => {
      const center = map.getCenter();
      setCenter({ 
        lat: center.lat(), 
        lon: center.lng() 
      });
      marker.setPosition(center);
    });
    
    // Listen for idle state to perform reverse geocoding
    map.addListener('idle', () => {
      const center = map.getCenter();
      performReverseGeocoding(center.lat(), center.lng());
    });
    
    return () => {
      // Clean up
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
      if (mapRef.current) {
        window.google.maps.event.clearInstanceListeners(mapRef.current);
      }
      mapRef.current = null;
      markerRef.current = null;
      autocompleteRef.current = null;
    };
  }, [open, initialLat, initialLon, initialZoom]);

  // Function to perform reverse geocoding using Google Maps Geocoder
  const performReverseGeocoding = (lat, lng) => {
    if (!window.google || !window.google.maps) return;
    
    setIsReverseGeocoding(true);
    const geocoder = new window.google.maps.Geocoder();
    
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setAddressPreview(results[0].formatted_address);
      } else {
        setAddressPreview(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
      }
      setIsReverseGeocoding(false);
    });
  };

  // Handle search query changes
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleConfirm = () => {
    if (onSelect) onSelect({ 
      lat: center.lat, 
      lon: center.lon, 
      name: addressPreview 
    });
    onClose();
  };

  const handleUseMyLocation = () => {
    if (!mapRef.current) return;
    if (!('geolocation' in navigator)) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const { latitude, longitude } = pos.coords;
        
        // Update map and marker
        const latLng = new window.google.maps.LatLng(latitude, longitude);
        mapRef.current.setCenter(latLng);
        mapRef.current.setZoom(17);
        if (markerRef.current) {
          markerRef.current.setPosition(latLng);
        }
        
        // Update state
        setCenter({ lat: latitude, lon: longitude });
        performReverseGeocoding(latitude, longitude);
      },
      (err) => {
        console.error('Geolocation error', err);
        setIsLocating(false);
        alert('Unable to fetch your location. Please allow permission.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  if (!open) return null;

  return (
    <div className="map-picker-container">
      <div className="map-picker-modal">
        <div className="map-picker-header">
          <div className="map-picker-search">
            <input
              ref={searchBoxRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchQueryChange}
              placeholder="Search for a location, area, or landmark..."
              className="map-picker-search-input"
            />
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
        <div className="map-picker-map-container">
          {/* Map Container */}
          <div ref={containerRef} className="map-picker-map" />
          
          {/* Footer Controls */}
          <div className="map-picker-footer">
            <div className="map-picker-address">
              {isReverseGeocoding ? 'Fetching address…' : (addressPreview || `${center.lat.toFixed(5)}, ${center.lon.toFixed(5)}`)}
            </div>
            <button className="btn btn-secondary location-btn" onClick={handleUseMyLocation} disabled={isLocating}>
              {isLocating ? '⏳' : '📍'}
            </button>
            <button className="btn btn-primary" onClick={handleConfirm}>Confirm Location</button>
          </div>
          
          {/* Uber/Rapido style pin indicator */}
          <div className="map-picker-pin">
            {/* Pin shadow effect */}
            <div className="map-picker-pin-shadow" />
            
            {/* Animated pin */}
            <div className={`map-picker-pin-icon ${isReverseGeocoding ? 'animating' : ''}`}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="#e63946" stroke="#ffffff" strokeWidth="1.2">
                <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
