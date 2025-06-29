import React from 'react';
import { Routes, Route } from 'react-router-dom';


import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import CategoriesPage from './pages/CategoriesPage';
import ProvidersPage from './pages/ProvidersPage';
import ProviderProfilePage from './pages/ProviderProfilePage';
import BuyerDashboard from './pages/BuyerDashboard';
import SellerDashboard from './pages/SellerDashboard';
import UploadPage from './pages/UploadPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  return (
    
      <main>
        <div className="app-wrapper">
          {/* <div style={{ backgroundColor: "green", color: "white" }}>It works!</div> */}

          {/* <img src="/logo2.svg" alt="DataXchange logo" className="inline-block h-12" /> */}
        <Navbar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/providers" element={<ProvidersPage />} />
            <Route path="/provider/:id" element={<ProviderProfilePage />} />
            <Route path="/buyers" element={<BuyerDashboard />} />
            {/* <Route path="/sellers" element={<SellerDashboard />} /> */}
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/about" element={<AboutPage />} />
            {/* <Route path="/contact" element={<ContactPage />} /> */}
          </Routes>
        </div>
          <Footer />
        </div>
      </main>
  
  );
}
