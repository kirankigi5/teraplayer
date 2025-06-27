import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './Root';
import { ThemeProvider } from './contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <Root />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
