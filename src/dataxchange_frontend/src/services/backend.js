import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../declarations/data_marketplace_backend";
import { canisterId } from "../declarations/data_marketplace_backend";

// Use this for local replica in WSL:
const agent = new HttpAgent({ host: "http://localhost:4943" });
agent.fetchRootKey(); // REQUIRED in local dev

export function getBackendActor() {
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });
}
