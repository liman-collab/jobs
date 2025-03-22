import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function Filter({ jobs, cities, onFilterChange }) {
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedJob, setSelectedJob] = useState([]);

  const handleCitySelect = (event, newCity) => {
    setSelectedCity(newCity);
  };

  const handleJobSelect = (event, newJob) => {
    setSelectedJob(newJob);
  };

  // Apply filters and notify parent component (Jobs.js)
  useEffect(() => {
    let filtered = jobs;

    // Filter by selected city if any
    if (selectedCity.length > 0) {
      filtered = filtered.filter((job) =>
        selectedCity.some((city) => city.name === job.city)
      );
    }

    // Filter by selected job type if any
    if (selectedJob.length > 0) {
      filtered = filtered.filter((job) =>
        selectedJob.some((jobOption) => jobOption.title === job.title)
      );
    }

    onFilterChange(filtered);
  }, [selectedCity, selectedJob, jobs, onFilterChange]);

  return (
    <Stack direction="row" spacing={3} sx={{ width: '100%', marginBottom: 5 }}>
      <Autocomplete
        multiple
        id="city-filter"
        options={cities}
        getOptionLabel={(option) => option.name}
        value={selectedCity}
        onChange={handleCitySelect}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Qytetet"
            placeholder="Zgjidh"
          />
        )}
        sx={{ flex: 1 }}
      />
      <Autocomplete
        multiple
        id="job-filter"
        options={jobs}
        getOptionLabel={(option) => option.title}
        value={selectedJob}
        onChange={handleJobSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Punet"
            placeholder="Zgjidh"
          />
        )}
        sx={{ flex: 1 }}
      />
    </Stack>
  );
}
