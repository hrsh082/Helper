import React, { useEffect, useRef, useState } from 'react';
import MapPicker from './MapPicker';
import bannerbg from "./assets/banner_bg.jpg";
import { useLocationContext } from './contexts/LocationContext';

function Banner() {
  const { locationText, setLocation, hydrateFromStorage, coords } = useLocationContext();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const debounceRef = useRef(null);
  const containerRef = useRef(null);

  // Hydrate on mount
  useEffect(() => {
    hydrateFromStorage();
  }, [hydrateFromStorage]);

  // Seed query with saved location - only when locationText changes
  useEffect(() => {
    if (locationText && !query) setQuery(locationText);
  }, [locationText]);

  // Close dropdown on outside click
  useEffect(() => {
    function onDocClick(e) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  function onFocusInput() {
    setOpen(true);
    if (!query) {
      // Seed with popular places
      const seed = [
        { display_name: 'Mumbai, Maharashtra', _type: 'static', id: 'mumbai' },
        { display_name: 'Delhi, India', _type: 'static', id: 'delhi' },
        { display_name: 'Bengaluru, Karnataka', _type: 'static', id: 'blr' },
      ];
      setSuggestions(seed);
    }
  }

  function onChangeInput(val) {
    setQuery(val);
    setOpen(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!val || val.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(val)}&addressdetails=1&limit=6`; 
        const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
        const data = await res.json();
        setSuggestions(data.map((d) => ({ id: d.place_id, display_name: d.display_name, lat: d.lat, lon: d.lon, _type: 'place' })));
      } catch (_) {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300);
  }

  function onSelectSuggestion(item) {
    if (item._type === 'static') {
      setLocation(item.display_name, null);
      setQuery(item.display_name);
      setOpen(false);
      return;
    }
    setLocation(item.display_name, { lat: Number(item.lat), lon: Number(item.lon) });
    setQuery(item.display_name);
    setOpen(false);
  }

  return (
    <div className="banner" style={{
      height: "200px",
      textAlign: "center",
      paddingTop: "10px"
    }}>
      <h1 style={{color: "var(--banner-text)"}}>India Needs An Helper</h1>
       <div
          style={{
            flex: 2,
            display: 'flex',
            justifyContent: 'center',
            minWidth: '200px',
            margin: '10px 0',
          }}
        >
          <div
            ref={containerRef}
            style={{
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              border: focused ? "1px solid var(--accent)" : "1px solid var(--input-border)",
              borderRadius: "9999px",
              gap: "10px",
              minWidth: "250px",
              maxWidth: "90vw",
              background: "var(--input-bg)",
              position: 'relative',
              boxShadow: focused ? "0 0 0 3px rgba(37,99,235,0.15), var(--card-shadow)" : "var(--card-shadow)",
              transition: "all 0.2s ease"
            }}
          >
            <svg width="20" height="20" fill="var(--accent)" viewBox="0 0 24 24">
              <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
            </svg>
            <input
              type="text"
              value={query}
              onFocus={(e) => { setFocused(true); onFocusInput(e); }}
              onBlur={() => setFocused(false)}
              onChange={(e) => onChangeInput(e.target.value)}
              placeholder="Enter your location"
              style={{
                border: "none",
                outline: "none",
                flex: 1,
                fontSize: "14px",
                color: "var(--input-text)",
                background: "transparent",
                minWidth: "0",
                transition: "color 0.2s ease"
              }}
            />
            <button
              type="button"
              onClick={async () => {
                if (!('geolocation' in navigator)) {
                  alert('Geolocation is not supported by your browser.');
                  return;
                }
                setIsLocating(true);
                navigator.geolocation.getCurrentPosition(async (pos) => {
                  try {
                    const { latitude, longitude } = pos.coords;
                    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
                    const res = await fetch(url);
                    const data = await res.json();
                    const name = data?.display_name || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
                    setLocation(name, { lat: latitude, lon: longitude });
                    setQuery(name);
                    setOpen(false);
                  } catch (_) {
                    const fallback = `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
                    setLocation(fallback, { lat: pos.coords.latitude, lon: pos.coords.longitude });
                    setQuery(fallback);
                  } finally {
                    setIsLocating(false);
                  }
                }, (err) => {
                  console.error('Geolocation error', err);
                  setIsLocating(false);
                  alert('Unable to fetch your location. Please allow permission.');
                }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 });
              }}
              title="Use my location"
              aria-label="Use my location"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                padding: 0,
                borderRadius: '50%',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--text)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '18px'
              }}
            >
              {isLocating ? '⏳' : '📍'}
            </button>
            <button
              type="button"
              onClick={() => setMapOpen(true)}
              title="Pick on map"
              aria-label="Pick on map"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                height: 32,
                borderRadius: '50%',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--text)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
              </svg>
            </button>
            {open && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                boxShadow: 'var(--card-shadow)',
                borderRadius: 14,
                marginTop: 10,
                zIndex: 10,
                maxHeight: 260,
                overflowY: 'auto',
                animation: 'slideDown 0.2s ease'
              }}>
                {loading && (
                  <div style={{ padding: 10, color: 'var(--muted-text)', fontSize: 14 }}>Searching…</div>
                )}
                {!loading && suggestions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectSuggestion(item)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '12px 14px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text)',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'var(--surface)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                    }}
                  >
                    <span style={{ fontSize: 14 }}>{item.display_name}</span>
                  </button>
                ))}
                {!loading && suggestions.length === 0 && (
                  <div style={{ padding: 10, color: 'var(--muted-text)', fontSize: 14 }}>No results</div>
                )}
              </div>
            )}
          </div>
        </div>
        <MapPicker
          open={mapOpen}
          onClose={() => setMapOpen(false)}
          initialLat={coords?.lat ?? 20.5937}
          initialLon={coords?.lon ?? 78.9629}
          initialZoom={coords ? 12 : 5}
          onSelect={async ({ lat, lon, name }) => {
            try {
              const finalName = name && typeof name === 'string' && name.length > 0 ? name : null;
              if (finalName) {
                setLocation(finalName, { lat, lon });
                setQuery(finalName);
              } else {
                const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
                const res = await fetch(url);
                const data = await res.json();
                const resolved = data?.display_name || `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
                setLocation(resolved, { lat, lon });
                setQuery(resolved);
              }
              setOpen(false);
              setMapOpen(false);
            } catch (_) {
              const fallback = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
              setLocation(fallback, { lat, lon });
              setQuery(fallback);
              setMapOpen(false);
            }
          }}
        />
    </div>
  );
}

export default Banner;