import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import App from './App.jsx';

import './index.scss'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>

  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>

  </AuthProvider>
);
