import { getBackendActor } from "./backend";
import { Principal } from "@dfinity/principal";

// Upload Dataset
export async function uploadDataset({ title, content, price, wallet_address }) {
  const actor = await getBackendActor();
  const id = await actor.upload_dataset(
    title,
    content,
    BigInt(price),
    wallet_address
  );
  return Number(id);
}

// Get All Datasets
export async function getAllDatasets() {
  const actor = await getBackendActor();
  const raw = await actor.get_all_datasets(); 
  return raw.map(([id, title, price, wallet, owner]) => ({
    id: Number(id),
    title,
    price: Number(price),
    wallet_address: wallet,
    owner: owner.toText(),
    pendingBuyers: [] 
  }));
}


// Request Access
export async function requestAccess(id) {
  const actor = await getBackendActor();
  return await actor.request_access(BigInt(id));
}

// View Dataset
export async function viewDataset(id) {
  const actor = await getBackendActor();
  return await actor.view_dataset(BigInt(id));
}

// Get Pending Requests
export async function getPendingRequests(id) {
  const actor = await getBackendActor();
  const list = await actor.get_pending_requests(BigInt(id));
  return list.map((p) => p.toText());
}

// Approve Buyer
export async function approveBuyer(datasetId, buyerText) {
  const actor = await getBackendActor();
  const principal = Principal.fromText(buyerText);
  return await actor.approve_buyer(BigInt(datasetId), principal);
}

export async function getDatasetById(id) {
  const actor=await getBackendActor();
  const all = await actor.get_all_datasets();
  const match = all.find((d) => Number(d[0]) === id);
  if (!match) return null;

  return {
    id: match[0],
    title: match[1],
    price: match[2],
    wallet: match[3],
    owner: match[4].toText(),
  };
}
