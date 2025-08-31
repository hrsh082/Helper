import React, { createContext, useContext, useReducer } from 'react';

const BookingContext = createContext();

const initialState = {
  selectedService: null,
  selectedProvider: null,
  bookingDetails: {
    date: '',
    time: '',
    address: '',
    description: '',
    urgency: 'normal'
  },
  currentStep: 0,
  isBooking: false
};

function bookingReducer(state, action) {
  switch (action.type) {
    case 'SELECT_SERVICE':
      return {
        ...state,
        selectedService: action.payload,
        currentStep: 1
      };
    case 'SELECT_PROVIDER':
      return {
        ...state,
        selectedProvider: action.payload,
        currentStep: 2
      };
    case 'UPDATE_BOOKING_DETAILS':
      return {
        ...state,
        bookingDetails: { ...state.bookingDetails, ...action.payload }
      };
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, 3)
      };
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0)
      };
    case 'START_BOOKING':
      return {
        ...state,
        isBooking: true
      };
    case 'COMPLETE_BOOKING':
      return {
        ...state,
        isBooking: false,
        currentStep: 0,
        selectedService: null,
        selectedProvider: null,
        bookingDetails: initialState.bookingDetails
      };
    case 'RESET_BOOKING':
      return initialState;
    default:
      return state;
  }
}

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  const value = {
    ...state,
    dispatch,
    selectService: (service) => dispatch({ type: 'SELECT_SERVICE', payload: service }),
    selectProvider: (provider) => dispatch({ type: 'SELECT_PROVIDER', payload: provider }),
    updateBookingDetails: (details) => dispatch({ type: 'UPDATE_BOOKING_DETAILS', payload: details }),
    nextStep: () => dispatch({ type: 'NEXT_STEP' }),
    prevStep: () => dispatch({ type: 'PREV_STEP' }),
    startBooking: () => dispatch({ type: 'START_BOOKING' }),
    completeBooking: () => dispatch({ type: 'COMPLETE_BOOKING' }),
    resetBooking: () => dispatch({ type: 'RESET_BOOKING' })
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}


