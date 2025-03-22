import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getCities, getJob } from '../../services/api';
import './Jobs.css';
import JobApplicationCard from '../../components/Card/Job';
import { Grid, Container } from '@mui/material';
import CustomFilter from '../../components/CustomFilter';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [cities, setCities] = useState([]);
  const [pendingJob, setPendingJob] = useState(true);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingCities, setLoadingCities] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState(null);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleFilterChange = useCallback((filtered) => {
    setFilteredJobs(filtered);
  }, []);

  useEffect(() => {
    getJob()
      .then((response) => {
        setJobs(response.data);
      })
      .catch(() => {
        setError('Failed to fetch jobs');
      })
      .finally(() => setLoadingJobs(false));
  }, []);

  useEffect(() => {
    getCities()
      .then((response) => {
        setCities(response.data);
      })
      .catch(() => {
        setError('Failed to fetch cities');
      })
      .finally(() => setLoadingCities(false));
  }, []);

  useEffect(() => {
    // Only update filtered jobs when jobs or filters change
    setFilteredJobs(jobs);
  }, [jobs]); // Dependency on jobs, not the filters



  if (loadingJobs || loadingCities) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error_job_failed"><h1>{error}</h1></div>;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <CustomFilter jobs={jobs} cities={cities} onFilterChange={handleFilterChange} />
      <Grid container spacing={3}>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <JobApplicationCard job={job} />
            </Grid>
          ))
        ) : (
          <p>No jobs found matching your filters.</p>
        )}
      </Grid>
    </Container>
  );
};

export default Jobs;
