import React, { createContext, useState, useEffect } from "react";
import { initII, isAuthenticatedII, getIIPrincipal, loginII, logoutII } from "../services/iiAuth";


export const UserContext = createContext({});

export function UserProvider({ children }) {
  const [iiPrincipal, setIIPrincipal] = useState(null);

const [loading, setLoading] = useState(true);
  useEffect(() => {
    initII().then(async () => {
      if (await isAuthenticatedII()) {
        setIIPrincipal(getIIPrincipal());
      }
      else{
        setIIPrincipal(null);
      }

setLoading(false);
    });// Auto logout on browser/tab close

  }, []);

  const handleLoginII = async () => {
    const pr = await loginII();
    setIIPrincipal(pr);
    return pr;
  };


const logout = async () => {
  // Clear identity from auth client if needed (depends on your II setup)
   await logoutII();
  setIIPrincipal(null);
  setPlugPrincipal(null);
};

  return (
    <UserContext.Provider
      value={{ iiPrincipal, loginII: handleLoginII, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
}