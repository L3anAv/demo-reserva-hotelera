import './index.css'
import App from './App'
import React from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <BrowserRouter basename="/">
     <App />
    </BrowserRouter>
  </React.StrictMode>
)