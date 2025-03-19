import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getJob, getOrderFromUserId } from '../../services/api.js';
import './Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [pendingJob, setPendingJob] = useState(true);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState(null);

  // Fetch jobs
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

  // Fetch orders (Pending Jobs)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Get token from storage or state
        if (!token) {
          throw new Error('No authentication token found');
        }
  
        const response = await getOrderFromUserId(token); // Pass token

        if (response.data.status === 'on-hold') {
          setPendingJob(true);
        }else{
          setPendingJob(false);
        }
      } catch (error) {
        console.error(error);
        setError('Failed to get order from user id');
      } finally {
        setLoadingOrders(false);
      }
    };
  
    fetchOrders();
  }, []);

  if (loadingJobs || loadingOrders) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error_job_failed"><h1>{error}</h1></div>;
  }


  
  return (
    <div className="job-cards-container">
   {pendingJob && (
     <div className="pending-card">Your job post is pending...</div>
   )}
 
    <h2>Jobs</h2>
    <div className="job-cards">
      {jobs.map((job) => (
        <Link to={`/job/${job.id}`} key={job.id} className="job-card-link">
          <div className="job-card">
            <h3 className="job-title">{job.title}</h3>
            <p className="job-description">{job.job_description}</p>
            <p className="job-phone"><strong>Phone:</strong> {job.phone}</p>
            <p className="job-address"><strong>Address:</strong> {job.address}</p>
            <p className="job-category"><strong>Job:</strong> {job.job_type}</p>
            <p className="job-category"><strong>City:</strong> {job.city}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
  );
};

export default Jobs;
