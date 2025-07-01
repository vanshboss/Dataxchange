import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { buyDataset } from '../services/backend.js';

export default function BuyButton({ datasetId }) {
  const { identity, login } = useContext(AuthContext);

  const onBuy = () => {
    if (!identity) return login();
    buyDataset(datasetId).then(() => alert('Purchase stubbed'));
  };

  return (
    <button onClick={onBuy}>
      {identity ? 'Buy Now' : 'Login to Buy'}
    </button>
  );
}
