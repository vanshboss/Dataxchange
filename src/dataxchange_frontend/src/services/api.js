import { getBackendActor } from "./backend";
import { Principal } from "@dfinity/principal";

// Upload Dataset
export async function uploadDataset({ title, category, file, price, wallet_address }) {
  const actor = await getBackendActor();
  const result = await actor.upload_dataset(title, category, Array.from(file), BigInt(price), wallet_address);

  if ("Err" in result) throw new Error(result.Err);
  return Number(result.Ok);
}

// Get All Datasets
export async function getAllDatasets() {
  const actor = await getBackendActor();
  const raw = await actor.get_all_datasets();

  return raw.map(([id, title, category, price, wallet, owner]) => ({
    id: Number(id),
    title,
    category,
    price: Number(price),
    wallet_address: wallet,
    owner: owner.toText(),
    pendingBuyers: [] // optional UI field
  }));
}

// View Dataset File (after access granted)
export async function viewDataset(id) {
  const actor = await getBackendActor();
  const result = await actor.view_dataset(BigInt(id));

  if ("Err" in result) throw new Error(result.Err);
  return new Uint8Array(result.Ok); // file bytes
}

// Request Access
export async function requestAccess(id) {
  const actor = await getBackendActor();
  return await actor.request_access(BigInt(id));
}

// Approve Buyer
export async function approveBuyer(datasetId, buyerText) {
  const actor = await getBackendActor();
  const principal = Principal.fromText(buyerText);
  return await actor.approve_buyer(BigInt(datasetId), principal);
}

// Get Pending Buyer Requests
export async function getPendingRequests(datasetId) {
  const actor = await getBackendActor();
  const list = await actor.get_pending_requests(BigInt(datasetId));
  return list.map((p) => p.toText());
}

// Optional: Get dataset by ID
export async function getDatasetById(id) {
  const actor = await getBackendActor();
  const all = await actor.get_all_datasets();
  const match = all.find((d) => Number(d[0]) === id);
  if (!match) return null;

  return {
    id: Number(match[0]),
    title: match[1],
    category: match[2],
    price: Number(match[3]),
    wallet: match[4],
    owner: match[5].toText(),
  };
}
export async function hasAccess(id) {
  const actor = await getBackendActor();
  return await actor.has_access(BigInt(id));
}

/**
 * Gets a list of all datasets the current user has requested.
 * @returns {Promise<Array<{ dataset_id: number, title: string, status: string }>>}
 */
export async function getMyRequests() {
  try {
    const actor = await getBackendActor();
    const requests = await actor.get_my_requests();
    
    // Map the requests to a more usable format
    return requests.map((req) => ({
      dataset_id: Number(req.dataset_id),
      title: req.title,
      status: Object.keys(req.status)[0],
    }));
  } catch (err) {
    console.error("Error fetching my requests:", err);
    throw err;
  }
}