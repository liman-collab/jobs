import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box, CircularProgress } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const response = await fetch("http://localhost:8088/wp-json/v2/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const user = await response.json();
          console.log("User already logged in:", user);
          navigate('/jobs'); // Redirect to the desired page
        }
      } catch (err) {
        console.error("Error checking user login status:", err);
      }
    };

    checkUserLoggedIn();
  }, [navigate]);
  

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
      console.log(user); // Handle the user data (maybe save to context or state)
      navigate('/jobs'); // Redirect to dashboard or wherever you'd like

    } catch (err) {
      setError(err.message || "Something went wrong during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Full viewport height
    }}
  >
      <Container maxWidth="xs" sx={{ width: '100%', padding: 4, backgroundColor: "#fff", borderRadius: 2, boxShadow: 3, margin: 'auto' }}>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center">
          Kycu
        </Typography>
        
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>

        {error && (
          <Typography variant="body2" color="error" align="center" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}
      </Container>

    </Box>
  );
};

export default Login;
