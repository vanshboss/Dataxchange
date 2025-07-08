import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import { UserProvider, UserContext } from "./context/UserContext";
import './index.scss'; 


function AppContent() {
  const { loading } = useContext(UserContext);

  if (loading) {
    return <div className="loading-screen">🔒 Checking login status…</div>;
  }

  return <App />;
}
ReactDOM.createRoot(document.getElementById('root')).render(

<UserProvider>

  <React.StrictMode>
    <Router>
      <AppContent />
    </Router>
  </React.StrictMode>
</UserProvider>

  
);
