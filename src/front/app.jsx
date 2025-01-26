// app.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Private from './Private';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/private" 
          element={
            sessionStorage.getItem('token') 
              ? <Private /> 
              : <Navigate to="/login" replace />
          } 
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;