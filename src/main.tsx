import { HashRouter } from 'react-router-dom'; // 🚀 Changed from BrowserRouter
import { createRoot } from 'react-dom/client';
import './index.css'
import App from './App.tsx'
import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ErrorBoundary from './components/ErrorBoundary.tsx';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <HashRouter> 
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </HashRouter>
  </React.StrictMode>
)