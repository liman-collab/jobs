import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Auth.css';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();  

  useEffect(() => {
    const checkAuth = async (token) => {
      try {
        // Send the token to your backend for validation
        const response = await fetch("http://localhost:8088/wp-json/jwt-auth/v1/token/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,  // Send token in the Authorization header
          }
        });
  
        // If the backend validates the token, the user is logged in
        if (response.ok) {
          setLoggedIn(true);
        } else {
          // If the token is invalid, remove it from localStorage and mark user as logged out
          localStorage.removeItem("authToken");
          setLoggedIn(false);
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        setLoggedIn(false);
      }
    };
  
    // Get token from localStorage
    const token = localStorage.getItem("authToken");
  
    // If no token, mark user as not logged in
    if (!token) {
      setLoggedIn(false);
      return;
    }
  
    // If token exists, call checkAuth function
    checkAuth(token);
  
  }, []); // Empty dependency array ensures this runs only once when the component mounts
  
  

  const onFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const url = isSignUp
      ? 'http://localhost:8088/wp-json/wp/v2/users/register'
      : 'http://localhost:8088/wp-json/jwt-auth/v1/token';

    const data = isSignUp
      ? { username: fullName, email, password }
      : { username, password };

    try {
      const response = await axios.post(url, data, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (isSignUp) {
        console.log("Sign Up Successful:", response.data);
        setIsSignUp(false); 
      } else {
        console.log("Sign In Successful:", response.data);
        localStorage.setItem('authToken', response.data.token);
        navigate("/jobs"); 
      
      }

      setError('');
    } catch (err) {
      console.error("Error:", err);
      setError('An error occurred, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    setLoggedIn(false); 
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="auth-container"
    >
      <h2>{isSignUp ? "Sign Up" : loggedIn ? "Welcome!" : "Sign In"}</h2>

      {!loggedIn ? (
        <form onSubmit={onFormSubmit}>
          {isSignUp && (
            <motion.input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
          {!isSignUp && (
            <motion.input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            />
          )}
          {isSignUp && (
            <motion.input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSignUp ? false : true}  
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            />
          )}
          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.2 }}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
          </motion.button>
        </form>
      ) : (
        <div>
          <p>Welcome back, {username}!</p>
          <motion.button
            onClick={handleSignOut}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      {!loggedIn && (
        <p className="toggle-text">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      )}
    </motion.div>
  );
}
