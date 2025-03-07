import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateJob.css"; 
import { getJobType, createJob } from "../../services/api";

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setError("You must be logged in to create a job.");
      setLoading(false);
      return;
    }
    

    const jobData = {
        title,
        content: description,
        name, 
        phone, 
        address, 
        category, 
        status: "publish",
        categories: [selectedCategory],
      };

    try {
      const response = await axios.post(
        "http://localhost:8088/wp-json/job/save_job", 
        jobData, 
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      console.log("Job created successfully:", response.data);
      navigate("/jobs");
    } catch (error) {
      console.error("Error creating job:", error);
      setError("Failed to create job. Please try again.");
    }

  };

  return (
    <div className="create-job-container">
      <h2>Create a Job</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Job"}
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
