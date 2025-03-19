import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const loginResponse = await fetch("http://localhost:8088/wp-json/wp/v2/users/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      console.log(loginResponse);

      if (!loginResponse.ok) {
        throw new Error("Authentication failed. Please check your credentials.");
      }

      // Fetch user data & update state
      const userData = await fetch("http://localhost:8088/wp-json/v2/auth/me", {
        method: "GET",
        credentials: "include",
      });

      if (!userData.ok) throw new Error("Failed to retrieve user data.");
      const user = await userData.json();
      // navigate('/login'); // Redirect to login page
      console.log(user); // Handle the user data (maybe save to context or state)

    } catch (err) {
      setError(err.message || "Something went wrong during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "100%",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: "12px",
    fontSize: "16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: "10px",
  },
};

export default Login;
