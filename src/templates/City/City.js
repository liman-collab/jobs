import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCities } from '../../services/api'; 
import './City.css';
import JobApplicationCard from '../../components/Card/Job';
import { Grid, Container } from '@mui/material';

const City = () => {
  const { cityId, cityName } = useParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchJobs = async () => {
          try {

              const response = await fetch(`http://localhost:8088/wp-json/custom/v1/jobs-by-city/${cityId}`);
            
              if (!response.ok) {
                  throw new Error('Error fetching jobs');
              }
              
              const data = await response.json();
              setJobs(data);
          } catch (error) {
              setError(error.message);
          } finally {
              setLoading(false);
          }
      };

      if (cityId) {
          fetchJobs();
      }
  }, [cityId]);

  if (loading) {
      return <div>Loading...</div>;
  }

  if (error) {
      return <div>Error: {error}</div>;
  }

  return (
    <div className="job-cards-container">
          <h2>Shpalljet ne {cityName}</h2>
          {jobs.length === 0 ? (
              <p>No jobs found for this city.</p>
          ) : (
            <Container sx={{ mt: 4 }}>
            <Grid container spacing={3}>
              {jobs.map((job) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={job.id}>
                  <JobApplicationCard job={job} />
                </Grid>
              ))}
            </Grid>
          </Container>
          )}
      </div>
  );
};

export default City;
