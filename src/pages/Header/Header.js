import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import axios from 'axios';

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8088/wp-json/v2/auth/me', {
        withCredentials: true,
      })
      .then((response) => {
        console.log('User data:', response.data);
        if (response.data?.email) {
          setLoggedIn(true);
          // window.location.href = '/login';
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const logoutUser = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8088/wp-json/custom/v1/logout',
        {},
        { withCredentials: true }
      );

      console.log('Logout response:', response);

      if (response.status === 200) {
        // Manually delete cookies for HTTP
        document.cookie = 'wordpress_logged_in=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'wordpress_sec=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        
        setLoggedIn(false);
        console.log('User logged out');
      }  else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>Job Portal</h1>
        {loggedIn && <p>Welcome back!</p>}
      </div>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/jobs">Jobs</Link>
          </li>
          <li>
            {loggedIn ? (
              <button style={{border:'none',background:'none',color:'#fff',fontSize:16,cursor:'pointer'}} onClick={logoutUser} className="logout-btn">
                Logout
              </button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
          <li>
            <Link to="/cities">Qytetet</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
