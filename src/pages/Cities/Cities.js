import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCities } from '../../services/api.js'; 
import { Box, Typography, Card, CardContent, CardActionArea, Grid, CircularProgress } from '@mui/material';
import { LocationOn as LocationIcon } from '@mui/icons-material';  // Icon for city
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
        setError('Failed to fetch cities');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', paddingTop: '20px' }}><CircularProgress /></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{marginTop:20}} className="city-list-container">
    <Typography variant="h4" align="center" gutterBottom>
      Qytetet
    </Typography>
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {cities.map((city) => (
            <Grid item xs={12} sm={6} md={4} key={city.term_id}>
              <Card>
                <CardActionArea cityName={city.name}component={Link} to={`/city/${city.name}/${city.term_id}`}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      <LocationIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                      {city.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {city.description || 'No description available.'}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Cities;
