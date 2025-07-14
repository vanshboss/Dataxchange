// src/services/backend.js
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory, canisterId } from "../declarations/data_marketplace_backend";
import { getAuthClient } from "./iiAuth";

// Environment-specific configuration
const isProd = process.env.DFX_NETWORK === "ic";
const agentHost = isProd ? "https://ic0.app" : "http://localhost:4943";

export async function getBackendActor() {
 const authClient = getAuthClient();
 const identity = authClient?.getIdentity?.();
 const principal = identity?.getPrincipal?.().toText();
// Add these console.log statements
  console.log("Attempting to get backend actor...");
  console.log("Is authenticated:", await authClient.isAuthenticated());
  console.log("Principal:", principal);
  console.log("Identity is anonymous:", identity?.getPrincipal?.().isAnonymous());
 if (!identity || identity.getPrincipal().isAnonymous()) {
 throw new Error("🔒 Identity is anonymous. Please log in first.");
 }
const agentHost = process.env.DFX_NETWORK === "ic" ? "https://ic0.app" : "http://127.0.0.1:4943";
  console.log("Agent Host:", agentHost); // Log the host
 const agent = new HttpAgent({
 host: agentHost,
 identity,
 });

 // Fetch the root key for all non-local networks
 if (!isProd) {
  await agent.fetchRootKey();
 }

 return Actor.createActor(idlFactory, {
agent,
 canisterId,
 });
}