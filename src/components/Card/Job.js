import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box, Avatar } from '@mui/material';
import { Work as WorkIcon, LocationOn, Phone } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const JobApplicationCard = ({ job }) => {
  return (
    <Card key={job.id} sx={{ 
      maxWidth: 400, 
      height: 280, // Ensures all cards are the same height
      display: "flex", 
      flexDirection: "column",
      justifyContent: "space-between",
      borderRadius: 3, 
      boxShadow: 5, 
      p: 2,
      transition: "0.3s",
      "&:hover": { transform: "scale(1.03)" }
    }}>
      {/* Header Section with Icon */}
      <Box display="flex" alignItems="center">
        <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
          <WorkIcon />
        </Avatar>
        <Typography variant="h6" fontWeight="bold" noWrap sx={{ width: "100%" }}>
          {job.title}
        </Typography>
      </Box>

      {/* Job Details */}
      <CardContent sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Typography variant="body2" color="text.secondary" fontSize={'Monospace'} sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {job.job_description}
        </Typography>

        <Box mt={2}>
          <Typography variant="body2" display="flex" alignItems="center">
            <Phone sx={{ fontSize: 18, color: "primary.main", mr: 1 }} />
            <strong style={{marginRight:5}}>Phone:</strong> {job.phone}
          </Typography>

          <Typography variant="body2" display="flex" alignItems="center" mt={1}>
            <LocationOn sx={{ fontSize: 18, color: "error.main", mr: 1 }} />
            <strong style={{marginRight:5}}>Location:</strong> {job.city}
          </Typography>
        </Box>
      </CardContent>

      {/* Action Button at Bottom */}
      <CardActions sx={{ justifyContent: "center", pt: 2 }}>
        <Button
          component={Link}
          to={`/job/${job.id}`} 
          variant="contained" 
          color="primary"
          sx={{ textTransform: "none", fontWeight: "bold", width: "100%" }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default JobApplicationCard;
