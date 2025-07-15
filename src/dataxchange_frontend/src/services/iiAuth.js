import { AuthClient } from "@dfinity/auth-client";
import { canisterId as iiCanisterId } from "declarations/internet_identity"; // Assuming this path is now correct

let authClient;

export async function initII() {
  authClient = await AuthClient.create();
  return authClient;
}

export { initII as initAuth };

export function getAuthClient() {
  return authClient;
}

// Modify loginII to accept an options object
export async function loginII(options) {
  const isLocal = process.env.DFX_NETWORK !== "ic";
  const identityProviderUrl = isLocal
    ? `http://${iiCanisterId}.localhost:4943`
    : "https://identity.ic0.app";

  await authClient.login({
    identityProvider: identityProviderUrl,
    // Pass along the onSuccess callback from the options
    onSuccess: options?.onSuccess,
    onError: options?.onError, // Also good to pass onError
  });
  // No need to return principal here, as onSuccess handles it
}

export async function isAuthenticatedII() {
  return authClient && (await authClient.isAuthenticated());
}

export function getIIPrincipal() {
  if (!authClient) return null;
  return authClient.getIdentity().getPrincipal().toText();
}

export async function getIdentity() {
  if (!authClient) await initII();
  return authClient.getIdentity();
}

export async function logoutII() {
  return authClient?.logout();
}