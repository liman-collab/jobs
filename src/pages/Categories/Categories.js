import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import "./Categories.css";
import {getJobType} from '../../services/api';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getJobType()
      .then((response) => {
        setCategories(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <div className="categories-container">
      <h2 className="categories-title">Categories</h2>
      <ul className="categories-list">
        {categories.map((category) => (
          <li key={category.id} className="category-item">
            <Link to={`/category/${category.slug}`}>{category.name}</Link> 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
