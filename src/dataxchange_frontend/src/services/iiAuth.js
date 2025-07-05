import { AuthClient } from "@dfinity/auth-client";

let authClient;
export async function initII() {
  authClient = await AuthClient.create();
  return authClient;
}

export async function loginII() {
  await authClient.login({
    identityProvider: "https://identity.ic0.app/#authorize",
    onSuccess: () => {},
  });
  return authClient.getIdentity().getPrincipal().toText();
}

export async function isAuthenticatedII() {
  return authClient && (await authClient.isAuthenticated());
}

export function getIIPrincipal() {
  return authClient.getIdentity().getPrincipal().toText();
}
export async function getIdentity() {
  const client = await initII();
  return client.getIdentity();
}
export async function logoutII() {
  return authClient?.logout(); // this clears session
}