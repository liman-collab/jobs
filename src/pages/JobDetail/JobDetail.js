import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJob } from '../../services/api'; 
import './JobDetail.css';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {

    getJob()
      .then((response) => {
        const jobData = response.data.find((job) => job.id === parseInt(id));
        setJob(jobData); 
        setLoading(false); 
      })
      .catch((err) => {
        setError('Failed to fetch job details'); 
        setLoading(false);
      });
  }, [id]);

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
    <div className="job-detail">
      <h2>{job.title}</h2>
      <p><strong>Description:</strong> {job.job_description}</p>
      <p><strong>Phone:</strong> {job.phone}</p>
      <p><strong>Address:</strong> {job.address}</p>
      <p><strong>Category:</strong> {job.category}</p>
    </div>
  );
};

export default JobDetail;
