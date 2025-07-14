import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import RequireAuth from "./routes/RequireAuth";

import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import ExplorePage from "./pages/ExplorePage";
import UploadPage from "./pages/UploadPage";
import ProfilePage from "./pages/ProfilePage";
import MyRequestsPage from "./pages/MyRequestsPage";
import MyUploadsPage from "./pages/MyUploadsPage";
import CategoriesPage from "./pages/CategoriesPage";
import ContactPage from "./pages/ContactPage";
import DatasetDetailPage from "./pages/DatasetDetailPage";
import AdminApprovalPage from "./pages/AdminApprovalPage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { AnimatePresence } from "framer-motion";

export default function App() {
  const { loading } = useContext(UserContext);

  if (loading) return <div className="loading-screen">⏳ Checking session...</div>;

  return (
    <main>
      <div className="app-wrapper">
        <Navbar />
        <div className="page-content">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              
              {/* Protected Routes */}
              <Route path="/explore" element={<RequireAuth><ExplorePage /></RequireAuth>} />
              <Route path="/upload" element={<RequireAuth><UploadPage /></RequireAuth>} />
              <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
              <Route path="/myrequests" element={<RequireAuth><MyRequestsPage /></RequireAuth>} />
              <Route path="/myuploads" element={<RequireAuth><MyUploadsPage /></RequireAuth>} />
              <Route path="/categories/:cat" element={<RequireAuth><CategoriesPage /></RequireAuth>} />
              <Route path="/dataset/:id" element={<RequireAuth><DatasetDetailPage /></RequireAuth>} />
              <Route path="/admin/requests/:id" element={<RequireAuth><AdminApprovalPage /></RequireAuth>} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Default redirect */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AnimatePresence>
        </div>
        <Footer />
      </div>
    </main>
  );
}
