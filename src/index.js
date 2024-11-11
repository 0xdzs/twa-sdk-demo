import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Add Eruda initialization only in development
if (process.env.REACT_APP_ENV === 'development') {
  const eruda = require('eruda');
  eruda.init();
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
