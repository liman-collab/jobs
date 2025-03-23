import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Stack,Typography } from "@mui/material";
import { getJobType, createJob, getCities } from "../../services/api";

const CreateJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState(""); 
  const [phone, setPhone] = useState(""); 
  const [address, setAddress] = useState(""); 
  const [category, setCategory] = useState(""); 
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [paymentUrl, setPaymentUrl] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getJobType()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    getCities()
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const jobData = {
      title,
      content: description,
      name,
      phone,
      address,
      category,
      status: "publish",
      city: parseInt([selectedCity][0]),
      job_type: parseInt([selectedCategory][0]),
    };

    try {
      const userData = await fetch("http://localhost:8088/wp-json/v2/auth/me", {
        method: "GET",
        credentials: "include",
      });

      if (!userData.ok) throw new Error("Failed to retrieve user data.");

      const orderResponse = await axios.post(
        "http://localhost:8088/wp-json/job-application/v1/create-order",
        jobData,
        { withCredentials: true }
      );

      if (orderResponse.data.success) {
        const paymentUrl = orderResponse.data.payment_url;
        console.log(orderResponse.data);
      } else {
        setError("Failed to create order. Please try again.");
      }

    } catch (error) {
      console.error("Error creating job or order:", error);
      setError("Failed to create job. Please try again.");
    }
  };

  return (
    <div className="create-job-container">
      <Typography variant="h4" align="center" sx={{mt:5,mb:5}} gutterBottom>
        Krijo nje aplikacion
      </Typography>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} style={{justifyContent:'center',justifyItems:'center', marginTop:10}}>
        <Stack spacing={3} sx={{ width: '30%', marginBottom: 5 }}>

          {/* Job Title */}
          <TextField
            label="Job Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />

          {/* Job Description */}
          <TextField
            label="Job Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
            required
          />

          {/* Applicant Name */}
          <TextField
            label="Your Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />

          {/* Phone Number */}
          <TextField
            label="Phone Number"
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            required
          />

          {/* Address */}
          <TextField
            label="Address"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            required
          />

          {/* City Selection */}
          <FormControl fullWidth>
            <InputLabel>City</InputLabel>
            <Select
              label="City"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              required
            >
              <MenuItem value="">
                <em>Select a City</em>
              </MenuItem>
              {cities.map((city) => (
                <MenuItem key={city.term_id} value={city.term_id}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Category Selection */}
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <MenuItem value="">
                <em>Select a Category</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.term_id} value={category.term_id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
            {loading ? "Creating..." : "Create Job"}
          </Button>

        </Stack>
      </form>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Job Submitted Successfully!</h3>
            <p>Your job application has been submitted. We will process it soon.</p>
            <button onClick={() => {
              setShowPopup(false);
              navigate('/jobs');
            }}>Close</button>
          </div>
        </div>
      )}

      <style>
        {`
          .popup {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .popup-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
          }
          .popup-content h3 {
            margin-bottom: 10px;
          }
          .popup-content button {
            padding: 8px 15px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          .popup-content button:hover {
            background: #0056b3;
          }
        `}
      </style>
    </div>
  );
};

export default CreateJob;
