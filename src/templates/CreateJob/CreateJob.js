import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateJob.css"; 
import { getJobType, createJob ,getCities } from "../../services/api";

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
  const [showPopup, setShowPopup] = useState(false); // Popup state

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
        city: parseInt([selectedCity][0]),
        job_type: parseInt([selectedCategory][0]),
      };

    try {

      const orderResponse = await axios.post(
        "http://localhost:8088/wp-json/job-application/v1/create-order", // Custom endpoint to create WooCommerce order
        jobData, 
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      if (orderResponse.data.success) {
        // Redirect user to WooCommerce checkout page for payment
        const paymentUrl = orderResponse.data.payment_url;
        // setPaymentUrl(paymentUrl); // Optionally, store the payment URL for reference
        // window.location.href = paymentUrl; // Redirect to payment page
        // navigate('/payment', { state: { paymentUrl } });
        // setShowPopup(true); // Show popup on success
        console.log(orderResponse.data);
        window.location.href = `/checkout/${orderResponse.data.order_id}`;

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
        <select value={selectedCity} onChange={(e) => {
          const value = e.target.value;
          setSelectedCity(value); 
          console.log(value); 
        }}  required >
          <option value="">Select a City</option>
          {cities.map((city) => (
            <option key={city.term_id} value={city.term_id}>
              {city.name}
            </option>
          ))}
        </select>
        <select value={selectedCategory} 
        onChange={(e) => {
          const value = e.target.value;
          setSelectedCategory(value); 
          console.log(value); 
        }} 
        required>
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option key={category.term_id} value={category.term_id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Job"}
        </button>
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
