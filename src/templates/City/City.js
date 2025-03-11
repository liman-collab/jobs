import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCities } from '../../services/api'; 
import './City.css';

const City = () => {
  const { term_id } = useParams();
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {

    getCities()
      .then((response) => {
        const cityData = response.data.find((city) => city.term_id === parseInt(term_id));
        setCity(cityData); 
        setLoading(false); 
      })
      .catch((err) => {
        setError('Failed to fetch city details'); 
        setLoading(false);
      });
  }, [term_id]);
 

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  if (!city) {
    return <div>City not found</div>; 
  }

  return (
    <div className="job-detail">
      <h2>{city.name}</h2>
    </div>
  );
};

export default City;
