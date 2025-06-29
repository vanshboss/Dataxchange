// src/services/api.js

/**
 * Fetches dataset list from the backend.
 * Replace with real canister call later.
 */
export async function fetchDatasets() {
  // TODO: replace with `dataxchange_backend.getDatasets()`
  return [
    { id: '1', title: 'Satellite Images', description: 'High-res earth images', price: '10', owner: 'Alice' },
    { id: '2', title: 'NLP Text Corpus', description: 'Large-scale text data for NLP models', price: '5', owner: 'Bob' },
  ];
}
