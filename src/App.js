import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Jobs from './pages/Jobs/Jobs';
// import NotFound from './pages/NotFound';
import './App.css';
import JobDetail from './pages/JobDetail/JobDetail';
import Header from './pages/Header/Header';
import Footer from './pages/Footer/Footer';
import Auth from './pages/Auth/Auth';
import Categories from './pages/Categories/Categories';
import CategoryArchive from './templates/CategoryArchive/CategoryArchive';
import CreateJob from './templates/CreateJob/CreateJob';
import Cities from './pages/Cities/Cities';
import FrontPage from './pages/FrontPage/FrontPage';

const App = () => (
  <BrowserRouter>
    <div className="app-container">
      <Header /> 
      <div className="content">
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/jobs" element={<Jobs />} />
          {/*  <Route path="*" element={<NotFound />} /> 404 Page */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:slug" element={<CategoryArchive />} />
          <Route path="/create-job" element={<CreateJob />} />
          <Route path="/cities" element={<Cities />} />
        </Routes>
      </div>
      <Footer /> 
    </div>
  </BrowserRouter>
);

export default App;
