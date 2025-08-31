import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const LocationContext = createContext(null);

export function LocationProvider({ children }) {
  const [locationText, setLocationText] = useState('');
  const [coords, setCoords] = useState(null); // { lat, lon }

  // Function to hydrate from localStorage - memoized to prevent infinite loops
  const hydrateFromStorage = useCallback(() => {
    try {
      const text = localStorage.getItem('helper_location_text') || '';
      const raw = localStorage.getItem('helper_location_coords');
      setLocationText(text);
      setCoords(raw ? JSON.parse(raw) : null);
    } catch (_) {}
  }, []);

  // Hydrate from localStorage on mount
  useEffect(() => {
    hydrateFromStorage();
  }, []); // <-- Only runs once

  const value = {
    locationText,
    coords,
    hydrateFromStorage,
    setLocation: (text, coordinates) => {
      setLocationText(text || '');
      setCoords(coordinates || null);
      try {
        localStorage.setItem('helper_location_text', text || '');
        localStorage.setItem('helper_location_coords', coordinates ? JSON.stringify(coordinates) : '');
      } catch (_) {}
    },
    clearLocation: () => {
      setLocationText('');
      setCoords(null);
      try {
        localStorage.removeItem('helper_location_text');
        localStorage.removeItem('helper_location_coords');
      } catch (_) {}
    }
  };

  return (
    <LocationContext.Provider value={value}>{children}</LocationContext.Provider>
  );
}

export function useLocationContext() {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error('useLocationContext must be used within LocationProvider');
  return ctx;
}



