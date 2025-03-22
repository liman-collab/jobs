import React , {useState,useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Jobs from './pages/Jobs/Jobs';
// import NotFound from './pages/NotFound';
import './App.css';
import JobDetail from './pages/JobDetail/JobDetail'; // Import the JobDetail component
import Header from './pages/Header/Header';
import Footer from './pages/Footer/Footer';
import Auth from './pages/Auth/Auth';
import Categories from './pages/Categories/Categories';
import CategoryArchive from './templates/CategoryArchive/CategoryArchive';
import CreateJob from './templates/CreateJob/CreateJob';
import Cities from './pages/Cities/Cities';
import FrontPage from './pages/FrontPage/FrontPage';
import City from './templates/City/City';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import { authenticate } from './services/api';
// import ProtectedRoute from './components/ProtectedRoute';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import axios from 'axios';
import UserProfile from './pages/UserProfile/UserProfile';

// import '@fontsource/poppins/300.css'; // Light
import '@fontsource/poppins/400.css'; // Regular
// import '@fontsource/poppins/500.css'; // Medium
// import '@fontsource/poppins/700.css'; // Bold


// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import JobDetails from './templates/JobDetails';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

const App = () => {
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8088/wp-json/v2/auth/me', {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data?.email) {
          setLoggedIn(true);
          setUser(response.data);
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
  <BrowserRouter>
    <div className="app-container">
      <Header loggedIn={loggedIn} handleLogout={logoutUser}/> 
      <div className="content">
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <Routes>
          {/* <Route path="/" element={<FrontPage />} /> */}
          <Route path="/jobs" element={<Jobs />} />
          {/*  <Route path="*" element={<NotFound />} /> 404 Page */}
          <Route path="/cities" element={<Cities />} />


          <Route path="/signup" element={<SignUp />} />
          <Route path="/create-job" element={<CreateJob />} />
          <Route path="/login" element={<Login />} />
          <Route path="/city/:cityId" element={<City />} />
          <Route path="/profile" element={<UserProfile user={user} />} />
          <Route path="/job/:id" element={<JobDetails />} />

          {/* <Route path="/checkout/:orderId" element={<CheckoutPage />} />  */}


{/* 
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/:slug" element={<CategoryArchive />} />
              <Route path="/create-job" element={<CreateJob />} />
              <Route path="/cities" element={<Cities />} />
              <Route path="/cities/:citySlug" element={<City />} />
              <Route path="/checkout" element={<CheckoutPage />} /> */}


        </Routes>
        </ThemeProvider>

      </div>
      <Footer /> {/* Add the Footer component */}
    </div>
  </BrowserRouter>
);
}

export default App;
