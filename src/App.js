import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar'; 
import MoviePage from './MoviePage'; 
import HomePage from './HomePage'; 
import MovieDetail from './MovieDetail';
import Login from './Login'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/MoviePage" element={<MoviePage />} />
          <Route path="/movie/:id" element={<MovieDetail />} /> 
          <Route path="/MovieDetail" element={<MovieDetail />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
