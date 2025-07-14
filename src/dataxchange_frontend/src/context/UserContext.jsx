import React, { createContext, useState, useEffect } from "react";
// Import the initAuth and loginII functions from iiAuth.js
import { initAuth, getAuthClient, loginII as iiLoginFunction } from "../services/iiAuth";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({});

export function UserProvider({ children }) {
  const [iiPrincipal, setIIPrincipal] = useState(null);
  const [authClient, setAuthClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    initAuth().then(async (client) => {
      setAuthClient(client);
      const isAuth = await client.isAuthenticated();
      if (isAuth) {
        const principal = client.getIdentity().getPrincipal().toText();
        setIIPrincipal(principal);
      }
      setLoading(false);
    });
  }, []);

  // Use the imported loginII function directly
  // This will use the dynamic identityProviderUrl logic from iiAuth.js
  const loginII = async () => {
    if (!authClient) {
      console.error("AuthClient not initialized.");
      return;
    }
    // Call the loginII function from iiAuth.js, passing the onSuccess callback
    await iiLoginFunction({
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        const principal = identity.getPrincipal().toText();
        console.log("✅ Login successful:", principal);
        setIIPrincipal(principal);
        navigate("/explore");
      },
    });
  };

  const logout = async () => {
    if (authClient) {
      await authClient.logout();
      setIIPrincipal(null);
      navigate("/");
    }
  };

  return (
    <UserContext.Provider value={{ iiPrincipal, loginII, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
}