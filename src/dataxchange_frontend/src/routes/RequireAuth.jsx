import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function RequireAuth({ children }) {
  const { iiPrincipal, loading } = useContext(UserContext);
  if (loading) {
    return null;
  }
  return iiPrincipal ? children : <Navigate to="/" replace />;
}