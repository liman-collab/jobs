import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the route parameters
import { Box, Typography, TextField, Grid, Paper, Divider } from '@mui/material';
import { getJobById } from '../services/api'; // Your API service function

const JobDetails = () => {
  const { id } = useParams(); // Extract the 'id' from the URL
  const [job, setJob] = useState(null); // State to store the job data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch job details by ID
    getJobById(id)
      .then((response) => {
        setJob(response.data);
      })
      .catch(() => {
        setError('Failed to fetch job details');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]); // Re-fetch data if the ID changes


  console.log(job)
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!job) {
    return <div>Job not found</div>;
  }

  

  return (
    <Box sx={{ padding: 3 }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Job Details
        </Typography>

        {/* Job Title */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Job Title"
              value={job.title}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          {/* Job Description */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Job Description"
              value={job.description}
              multiline
              rows={4}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          {/* Your Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Your Name"
              value={job.name}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          {/* Phone Number */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              value={job.phone}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          {/* Address */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address"
              value={job.address}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          {/* City */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              value={job.city}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          {/* Category */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Job Type"
              value={job.job_type}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>

        {/* Divider for better separation */}
        <Divider sx={{ margin: '20px 0' }} />

        <Typography variant="h6" gutterBottom>
          Application Details:
        </Typography>
        {/* More application related details can go here */}
      </Paper>
    </Box>
  );
};

export default JobDetails;
