import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCities } from '../../services/api.js'; 
import './Cities.css';

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCities()
      .then((response) => {
        setCities(response.data); 
        setLoading(false); 
      })
      .catch((err) => {
        setError('Failed to fetch jobs'); 
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <div className="city-list-container">
    <h2>Cities</h2>
    <ul className="city-list">
      {cities.map((city) => (
        <li key={city.id} className="city-list-item">
          <Link to={`/city/${city.id}`} className="city-link">
            {city.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
  
  );
};

export default Cities;
