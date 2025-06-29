// src/pages/ExplorePage.jsx
import React, { useEffect, useState } from 'react';
import { fetchDatasets } from '../services/api';
import DatasetCard from '../components/DatasetCard';
import '../styles/explore.css'; // Link to custom styles

export default function ExplorePage() {
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    fetchDatasets().then(setDatasets);
  }, []);

  return (
    <div className="explore-container">
      <h1 className="explore-heading">📊 Explore Datasets</h1>
      <p className="explore-subtext">Browse trending and high-quality datasets submitted by data providers.</p>
      
      <div className="explore-grid">
        {datasets.map((ds) => (
          <DatasetCard key={ds.id} {...ds} />
        ))}
      </div>
    </div>
  );
}
