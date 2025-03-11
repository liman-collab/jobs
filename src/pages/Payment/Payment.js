import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Payment.css'; // Import the styles for the payment form

const Payment = () => {
  const [bankName, setBankName] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // Add a success state for confirmation
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    // Validate form inputs
    if (!bankName || !accountHolder || !accountNumber || !routingNumber) {
      setError("Please fill out all fields.");
      setLoading(false);
      return;
    }

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setError("You must be logged in to proceed.");
      setLoading(false);
      return;
    }

    const paymentData = {
      bank_name: bankName,
      account_holder: accountHolder,
      account_number: accountNumber,
      routing_number: routingNumber,
    };

    try {
      // Send bank payment details to WordPress backend
      const response = await axios.post(
        "http://localhost:8088/wp-json/job-application/v1/process-bank-payment", // Custom endpoint for processing bank payments
        paymentData,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      if (response.data.success) {
        setSuccess(true); // If payment is successful, set success state
        navigate("/payment/confirmation", { state: { success: true } });
      } else {
        setError("Payment processing failed. Please try again.");
      }
    } catch (error) {
      setError("Error processing payment. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="bank-payment-form">
      <h2>Enter Bank Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Bank Name</label>
          <input
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Account Holder</label>
          <input
            type="text"
            value={accountHolder}
            onChange={(e) => setAccountHolder(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Account Number</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Routing Number</label>
          <input
            type="text"
            value={routingNumber}
            onChange={(e) => setRoutingNumber(e.target.value)}
            required
          />
        </div>
        <div>
          {loading ? (
            <button type="submit" disabled>
              Processing...
            </button>
          ) : (
            <button type="submit">Submit Payment</button>
          )}
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">Payment processed successfully!</p>}
      </form>
    </div>
  );
};

export default Payment;
