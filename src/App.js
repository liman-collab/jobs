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
import ProtectedRoute from './components/ProtectedRoute';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';

const App = () => {
  
// const [token, setToken] = useState(null);
// const [userData, setUserData] = useState(null);
// const [error, setError] = useState(null);


  // const handleAuthentication = async (username, password) => {
  //   const remoteToken = await authenticate(username, password);
  //   if (!remoteToken) {
  //     console.log('Error: Unable to authenticate');
  //     return;
  //   }

  //   setToken(remoteToken);
  // };


return (
  <BrowserRouter>
    <div className="app-container">
      <Header /> 
      <div className="content">
        <Routes>
          {/* <Route path="/" element={<FrontPage />} /> */}
          <Route path="/jobs" element={<Jobs />} />
          {/*  <Route path="*" element={<NotFound />} /> 404 Page */}
          
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create-job" element={<CreateJob />} />
          <Route path="/login" element={<Login />} />
{/* 
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/:slug" element={<CategoryArchive />} />
              <Route path="/create-job" element={<CreateJob />} />
              <Route path="/cities" element={<Cities />} />
              <Route path="/cities/:citySlug" element={<City />} />
              <Route path="/checkout" element={<CheckoutPage />} /> */}


        </Routes>
      </div>
      <Footer /> {/* Add the Footer component */}
    </div>
  </BrowserRouter>
);
}

export default App;
