import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignInPage from './SignInPage';
import About from './About';
import Header from './Header';
import Footer from './Footer';
import Contact from './Contact';
import Services from './Services';
import ServiceDetail from './ServiceDetail';
import Booking from './Booking';
import { BookingProvider } from './contexts/BookingContext';
import { LocationProvider } from './contexts/LocationContext';

// Render Header and Footer only once, and use Navigate for default route
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LocationProvider>
        <BookingProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<App />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/service/:serviceId" element={<ServiceDetail />} />
            <Route path="/booking" element={<Booking />} />
          </Routes>
          <Footer />
        </BookingProvider>
      </LocationProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
// ... existing code ...