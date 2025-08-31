import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from './contexts/BookingContext';

export default function Booking() {
  const navigate = useNavigate();
  const { selectedService, updateBookingDetails, bookingDetails, completeBooking } = useBooking();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Initialize address from selected service location when component mounts
  React.useEffect(() => {
    if (selectedService && selectedService.location) {
      updateBookingDetails({ address: selectedService.location });
    }
  }, [selectedService, updateBookingDetails]);

  if (!selectedService) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>No service selected</h2>
        <p>Please select a service first.</p>
        <button onClick={() => navigate('/services')} className="btn btn-primary">
          Browse Services
        </button>
      </div>
    );
  }

  const handleInputChange = (field, value) => {
    updateBookingDetails({ [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the booking to your backend
    console.log('Booking submitted:', { service: selectedService, details: bookingDetails });
    
    // Show success message and redirect
    alert('Booking submitted successfully! We\'ll contact you soon.');
    completeBooking();
    navigate('/');
  };

  const renderStep1 = () => (
    <div>
      <h3>Service Details</h3>
      <div style={{ 
        background: 'var(--card-bg)', 
        border: '1px solid var(--card-border)', 
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <h4>{selectedService.title}</h4>
        <p style={{ color: 'var(--muted-text)' }}>{selectedService.description}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
          <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>
            {selectedService.provider?.price}
          </span>
          <span style={{ color: 'var(--muted-text)' }}>
            with {selectedService.provider?.name}
          </span>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <h3>Schedule & Details</h3>
      <div style={{ display: 'grid', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text)' }}>
            Preferred Date
          </label>
          <input
            type="date"
            value={bookingDetails.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              background: 'var(--input-bg)',
              color: 'var(--text)'
            }}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text)' }}>
            Preferred Time
          </label>
          <select
            value={bookingDetails.time}
            onChange={(e) => handleInputChange('time', e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              background: 'var(--input-bg)',
              color: 'var(--text)'
            }}
          >
            <option value="">Select time</option>
            <option value="morning">Morning (8 AM - 12 PM)</option>
            <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
            <option value="evening">Evening (4 PM - 8 PM)</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text)' }}>
            Service Location
          </label>
          <div style={{
            padding: '0.75rem',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            background: 'var(--surface)',
            color: 'var(--text)',
            fontSize: '0.9rem'
          }}>
            📍 {selectedService.location || 'Location not specified'}
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted-text)', marginTop: '0.25rem' }}>
            This is the location you selected in the service details
          </p>
          <input 
            type="hidden" 
            name="locationCoords" 
            value={JSON.stringify(selectedService.locationCoords || {})} 
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text)' }}>
            Service Description
          </label>
          <textarea
            value={bookingDetails.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe what you need (e.g., 'Fix leaking tap in kitchen', 'Install new ceiling fan')"
            rows={3}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              background: 'var(--input-bg)',
              color: 'var(--text)',
              resize: 'vertical'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text)' }}>
            Urgency Level
          </label>
          <select
            value={bookingDetails.urgency}
            onChange={(e) => handleInputChange('urgency', e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              background: 'var(--input-bg)',
              color: 'var(--text)'
            }}
          >
            <option value="normal">Normal (Within 24 hours)</option>
            <option value="urgent">Urgent (Same day)</option>
            <option value="emergency">Emergency (Within 2 hours)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div>
      <h3>Review & Confirm</h3>
      <div style={{ 
        background: 'var(--card-bg)', 
        border: '1px solid var(--card-border)', 
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <h4>Booking Summary</h4>
        <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--muted-text)' }}>Service:</span>
            <span style={{ color: 'var(--text)', fontWeight: 'bold' }}>{selectedService.title}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--muted-text)' }}>Professional:</span>
            <span style={{ color: 'var(--text)' }}>{selectedService.provider?.name}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--muted-text)' }}>Price:</span>
            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{selectedService.provider?.price}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--muted-text)' }}>Location:</span>
            <span style={{ color: 'var(--text)' }}>{selectedService.location || 'Not specified'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--muted-text)' }}>Date:</span>
            <span style={{ color: 'var(--text)' }}>{bookingDetails.date || 'Not selected'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--muted-text)' }}>Time:</span>
            <span style={{ color: 'var(--text)' }}>{bookingDetails.time || 'Not selected'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--muted-text)' }}>Urgency:</span>
            <span style={{ color: 'var(--text)' }}>{bookingDetails.urgency}</span>
          </div>
        </div>
      </div>

      <div style={{ 
        background: 'var(--surface)', 
        border: '1px solid var(--border)', 
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1.5rem'
      }}>
        <h5 style={{ color: 'var(--text)', marginBottom: '0.5rem' }}>What happens next?</h5>
        <ol style={{ color: 'var(--muted-text)', margin: 0, paddingLeft: '1.5rem' }}>
          <li>We'll confirm your booking within 30 minutes</li>
          <li>The professional will contact you to confirm timing</li>
          <li>Service will be completed as scheduled</li>
          <li>Pay securely after service completion</li>
        </ol>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Progress Bar */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span style={{ color: currentStep >= 1 ? 'var(--accent)' : 'var(--muted-text)' }}>Service Details</span>
          <span style={{ color: currentStep >= 2 ? 'var(--accent)' : 'var(--muted-text)' }}>Schedule & Details</span>
          <span style={{ color: currentStep >= 3 ? 'var(--accent)' : 'var(--muted-text)' }}>Review & Confirm</span>
        </div>
        <div style={{ 
          height: '4px', 
          background: 'var(--border)', 
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{ 
            height: '100%', 
            background: 'var(--accent)', 
            width: `${(currentStep / 3) * 100}%`,
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Step Content */}
      <div style={{ 
        background: 'var(--card-bg)', 
        border: '1px solid var(--card-border)', 
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="btn btn-secondary"
          style={{ opacity: currentStep === 1 ? 0.5 : 1 }}
        >
          Previous
        </button>

        {currentStep < 3 ? (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="btn btn-primary"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="btn btn-primary"
            style={{ background: 'var(--accent)' }}
          >
            Confirm Booking
          </button>
        )}
      </div>
    </div>
  );
}
