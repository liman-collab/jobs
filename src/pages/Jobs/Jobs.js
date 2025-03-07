import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getJob } from '../../services/api.js'; 
import './Jobs.css';
const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
 
    getJob()
      .then((response) => {
        setJobs(response.data); 
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
    <div className="job-cards-container">
    <h2>Jobs</h2>
    <div className="job-cards">
      {jobs.map((job) => (
        <Link to={`/job/${job.id}`} key={job.id} className="job-card-link">
          <div className="job-card">
            <h3 className="job-title">{job.title}</h3>
            <p className="job-description">{job.job_description}</p>
            <p className="job-phone"><strong>Phone:</strong> {job.phone}</p>
            <p className="job-address"><strong>Address:</strong> {job.address}</p>
            <p className="job-category"><strong>Category:</strong> {job.category}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
  );
};

export default Jobs;
