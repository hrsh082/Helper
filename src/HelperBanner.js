import bclean from "./assets/banner_clean.jpg"
import belec from './assets/banner_electrician.jpg';
import bplum from './assets/banner_plumber.jpg';
import bmech from './assets/banner_machnic.jpg';

// Ensure your bundler (e.g., Webpack, CRA) supports importing images like this.
// If you see errors, check your assets folder and image paths.

export default function HelperBanner() {
  return (
    <div className="helper-banner" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'var(--banner-bg)',
      padding: '40px',
      borderRadius: '10px',
      flexWrap: 'wrap',
      gap: '20px'
    }}>
      
      {/* Left Side Content */}
      <div style={{ 
        maxWidth: '400px',
        flex: '1',
        minWidth: '280px'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: 'var(--banner-text)',
          lineHeight: '1.2',
          marginBottom: '15px'
        }}>
          Get Expert Help, <span style={{ color: '#f4b400' }}>Anytime</span>
        </h1>
        <p style={{
          fontSize: '16px',
          color: 'var(--banner-subtext)',
          marginBottom: '20px',
          lineHeight: '1.5'
        }}>
          At Helper, we connect you with skilled plumbers, electricians, mechanics, and more — 
          quickly and affordably, whenever you need them.
        </p>
        <button style={{
          backgroundColor: 'var(--primary)',
          color: 'var(--on-primary)',
          border: 'none',
          padding: '12px 25px',
          borderRadius: '25px',
          fontSize: '16px',
          cursor: 'pointer'
        }}>
          Book a Service →
        </button>
      </div>

      {/* Right Side Images */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '15px',
        marginTop: '20px',
        flex: '1',
        minWidth: '280px'
      }}>
        <img
          src={bplum}
          alt="Plumber"
          style={{ 
            width: '100%', 
            height: 'auto', 
            maxWidth: '180px',
            borderRadius: '12px', 
            objectFit: 'cover' 
          }}
        />
        <img
          src={belec}
          alt="Electrician"
          style={{ 
            width: '100%', 
            height: 'auto', 
            maxWidth: '180px',
            borderRadius: '12px', 
            objectFit: 'cover' 
          }}
        />
        <img
          src={bmech}
          alt="Mechanic"
          style={{ 
            width: '100%', 
            height: 'auto', 
            maxWidth: '180px',
            borderRadius: '12px', 
            objectFit: 'cover' 
          }}
        />
        <img
          src={bclean}
          alt="Cleaning Service"
          style={{ 
            width: '100%', 
            height: 'auto', 
            maxWidth: '180px',
            borderRadius: '12px', 
            objectFit: 'cover' 
          }}
        />
      </div>

    </div>
  );
}
