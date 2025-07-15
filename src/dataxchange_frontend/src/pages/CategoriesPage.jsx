import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence
import { getAllDatasets } from "../services/api";
import DatasetCard from "../components/DatasetCard";
import "../styles/categories.css";

// Animation variants for the grid and cards
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function CategoriesPage() {
  const { cat } = useParams();
  const navigate = useNavigate();

  const [datasets, setDatasets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getAllDatasets()
      .then((data) => {
        setDatasets(data);
        const uniqueCategories = [...new Set(data.map((ds) => ds.category.trim()))];
        setCategoryList(["All", ...uniqueCategories]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching datasets:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (cat === "All") {
      setFiltered(datasets);
    } else {
      setFiltered(
        datasets.filter((ds) => ds.category.toLowerCase() === cat.toLowerCase())
      );
    }
  }, [cat, datasets]);

  const handleChange = (e) => {
    navigate(`/categories/${e.target.value}`);
  };

  if (loading) return <p className="loading-message">⏳ Loading datasets…</p>;

  return (
    <div className="categories-container">
      <div className="categories-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h3 className="categories-title">📁 Category: {cat}</h3>
      </div>
      
      <select value={cat} onChange={handleChange} className="category-dropdown">
        {categoryList.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          <motion.div
            key={cat} // Key change to re-animate on category change
            className="categories-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filtered.map((ds) => (
              <motion.div key={ds.id} variants={cardVariants}>
                <DatasetCard {...ds} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="no-datasets">No datasets found in this category.</p>
        )}
      </AnimatePresence>
    </div>
  );
}