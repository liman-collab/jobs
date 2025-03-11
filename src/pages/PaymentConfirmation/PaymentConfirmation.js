import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './PaymentConfirmation.css';

const PaymentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve the 'success' state passed from the payment page
  const { success } = location.state || {};
  
  return (
    <div className="confirmation-page">
      <h2>{success ? "Payment Successful!" : "Payment Failed"}</h2>
      <p>
        {success
          ? "Your payment has been successfully processed. Thank you for your purchase!"
          : "There was an issue with processing your payment. Please try again later."}
      </p>
      <button onClick={() => navigate("/")}>Go Back to Home</button>
    </div>
  );
};

export default PaymentConfirmation;
