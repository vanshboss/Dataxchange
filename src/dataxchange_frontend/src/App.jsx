import React, { useContext } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from "./context/UserContext";
import RequireAuth from "./routes/RequireAuth";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import MyRequestsPage from "./pages/MyRequestsPage";

import MyUploadsPage from './pages/MyUploadsPage';
import ExplorePage from './pages/ExplorePage';

import DatasetDetailPage from "./pages/DatasetDetailPage";
import ProfilePage from "./pages/ProfilePage";

import AdminApprovalPage from "./pages/AdminApprovalPage";

import UploadPage from './pages/UploadPage';
import AboutPage from './pages/AboutPage';


export default function App() {

const { loading } = useContext(UserContext);
  if (loading) return <div className="loading-screen">Checking session...</div>;

  

  return (
    
      <main>
        <div className="app-wrapper">
          
        <Navbar />
        <div className="page-content">
          <Routes>
           <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Protected routes*/}
        <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
        <Route path="/myuploads" element={<RequireAuth><MyUploadsPage /></RequireAuth>} />
        <Route path="/myrequests" element={<RequireAuth><MyRequestsPage /></RequireAuth>} />

        <Route path="/explore" element={<RequireAuth><ExplorePage /></RequireAuth>} />
        <Route path="/upload" element={<RequireAuth><UploadPage /></RequireAuth>} />
        <Route path="/dataset/:id" element={<RequireAuth><DatasetDetailPage /></RequireAuth>} />
        <Route path="/admin/requests/:id" element={<RequireAuth><AdminApprovalPage /></RequireAuth>} />
      
        <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />

          </Routes>
        </div>
          <Footer />
        </div>
      </main>
  
  );
}
