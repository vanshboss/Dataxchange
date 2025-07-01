import React, { createContext, useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authClient, setAuthClient] = useState(null);
  const [identity, setIdentity] = useState(null);

  useEffect(() => {
    AuthClient.create().then(client => {
      setAuthClient(client);
      client.isAuthenticated().then(async (ok) => {
        if (ok) setIdentity(await client.getIdentity());
      });
    });
  }, []);

  const login = () => authClient.login({
    identityProvider: 'https://identity.ic0.app',
    onSuccess: async () => setIdentity(await authClient.getIdentity()),
  });

  const logout = () => authClient.logout().then(() => setIdentity(null));

  return (
    <AuthContext.Provider value={{ identity, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
