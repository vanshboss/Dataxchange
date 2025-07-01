// src/services/api.js

/**
 * Fetches dataset list from the backend.
 * Replace with real canister call later.
 */

export async function createDataset(blobBytes, metaJson) {
  console.log('STUB createDataset', { size: blobBytes.length, meta: metaJson });
  return Math.floor(Math.random() * 1000); // fake ID
}

export async function fetchDatasets() {
  // TODO: replace with `dataxchange_backend.getDatasets()`
  console.log('STUB getAllDatasets');
  return [
    { id: '1', title: 'Satellite Images', description: 'High-res earth images', price: '10', owner: 'Alice' },
    { id: '2', title: 'NLP Text Corpus', description: 'Large-scale text data for NLP models', price: '5', owner: 'Bob' },
  ];
}
export async function buyDataset(id) {
  console.log('STUB buyDataset', id);
  return true;
}