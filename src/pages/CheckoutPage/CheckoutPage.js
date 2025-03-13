import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import OAuth from "oauth-1.0a";
import jsSHA from "jssha";

const CheckoutPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [bankDetails, setBankDetails] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    account_name: "",
    bank_name: "",
    iban: "",
    reference: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const consumerKey = "ck_733df19bcfad7f219f55fc85cae9143379fde942";
  const consumerSecret = "cs_a1d498a76ae5afc04fe76d2668233798f8fe5234"; // Replace with actual secret

  const oauth = OAuth({
    consumer: { key: consumerKey, secret: consumerSecret },
    signature_method: "HMAC-SHA1",
    hash_function(base_string, key) {
      const shaObj = new jsSHA("SHA-1", "TEXT");
      shaObj.setHMACKey(key, "TEXT");
      shaObj.update(base_string);
      return shaObj.getHMAC("B64");
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!orderId) return;

      try {
        // Fetch Order Data (with OAuth)
        const orderUrl = `http://localhost:8088/wp-json/wc/v3/orders/${orderId}`;
        const orderRequest = { method: "GET", url: orderUrl };
        const orderAuthHeader = oauth.toHeader(oauth.authorize(orderRequest));

        const orderResponse = await axios.get(orderUrl, {
          headers: { Authorization: orderAuthHeader.Authorization },
        });

        console.log("Fetched Order Data:", orderResponse.data);
        setOrder(orderResponse.data);

        // Fetch Bank Payment Details (also with OAuth)
        const bankUrl = `http://localhost:8088/wp-json/wc/v3/payment_gateways/bacs`;
        const bankRequest = { method: "GET", url: bankUrl };
        const bankAuthHeader = oauth.toHeader(oauth.authorize(bankRequest));

        const bankResponse = await axios.get(bankUrl, {
          headers: { Authorization: bankAuthHeader.Authorization },
        });

        console.log("Fetched Bank Details:", bankResponse.data);
        setBankDetails(bankResponse.data.settings);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [orderId]);

  const handleInputChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setSuccessMessage("");

    try {
      // Update order status to 'on-hold' and add payment details
      const updateOrderUrl = `http://localhost:8088/wp-json/wc/v3/orders/${orderId}`;
      const updateOrderRequest = { method: "PUT", url: updateOrderUrl };
      const updateOrderAuthHeader = oauth.toHeader(
        oauth.authorize(updateOrderRequest)
      );

      const updateResponse = await axios.put(
        updateOrderUrl,
        {
          status: "on-hold", // Mark as "on-hold" while waiting for confirmation
          meta_data: [
            { key: "account_name", value: paymentInfo.account_name },
            { key: "bank_name", value: paymentInfo.bank_name },
            { key: "iban", value: paymentInfo.iban },
            { key: "reference", value: paymentInfo.reference },
          ],
        },
        {
          headers: { Authorization: updateOrderAuthHeader.Authorization },
        }
      );

      console.log("Payment Submitted:", updateResponse.data);
      setSuccessMessage("Payment details submitted successfully! Awaiting confirmation.");
    } catch (error) {
      console.error("Error submitting payment:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h1>Bank Transfer Payment</h1>
      <p>Please use the following details to complete your payment:</p>
      <h3>Order ID: {order.id}</h3>
      <p>Amount: ${order.total}</p>
      {bankDetails ? (
        <div>
          <h3>Bank Details:</h3>
          <p>Account Name: {bankDetails.account_name?.value}</p>
          <p>Bank Name: {bankDetails.bank_name?.value}</p>
          <p>IBAN: {bankDetails.iban?.value}</p>
        </div>
      ) : (
        <p>Loading bank details...</p>
      )}

      <h2>Submit Your Payment Details</h2>
      <form onSubmit={handlePaymentSubmit}>
        <label>
          Your Account Name:
          <input type="text" name="account_name" value={paymentInfo.account_name} onChange={handleInputChange} required />
        </label>
        <label>
          Your Bank Name:
          <input type="text" name="bank_name" value={paymentInfo.bank_name} onChange={handleInputChange} required />
        </label>
        <label>
          Your IBAN:
          <input type="text" name="iban" value={paymentInfo.iban} onChange={handleInputChange} required />
        </label>
        <label>
          Payment Reference:
          <input type="text" name="reference" value={paymentInfo.reference} onChange={handleInputChange} required />
        </label>
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Submit Payment"}
        </button>
      </form>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <p>After submitting, your payment will be reviewed.</p>
    </div>
  );
};

export default CheckoutPage;
