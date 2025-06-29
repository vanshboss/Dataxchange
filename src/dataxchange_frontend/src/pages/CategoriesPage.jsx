// src/pages/CategoriesPage.jsx
import React from 'react';
import '../styles/categories.css';

const categories = [
  { name: 'NLP', color: 'pink' },
  { name: 'Computer Vision', color: 'green' },
  { name: 'Finance', color: 'yellow' },
  { name: 'Satellite', color: 'blue' },
  // Add more if needed
];

export default function CategoriesPage() {
  return (
    <>
      <section className="categories-hero">
        <div className="categories-container">
          <h1 className="categories-title">Browse by Category</h1>
          <p className="categories-subtitle">
            Find datasets grouped by domain for easy discovery.
          </p>
        </div>
      </section>

      <div className="categories-grid">
        {categories.map((cat) => (
          <div key={cat.name} className={`category-card ${cat.color}`}>
            <h2>{cat.name}</h2>
            <p>Browse datasets in the {cat.name} category.</p>
          </div>
        ))}
      </div>
    </>
  );
}
