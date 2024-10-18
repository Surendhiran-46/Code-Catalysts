import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import Register from './component/Register';
import DataEntry from './component/DataEntry'; // Import the DataEntry component

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />
        
        {/* Login Route */}
        <Route path="/login" element={<Login />} />
        
        {/* Register Route */}
        <Route path="/register" element={<Register />} />
        
        {/* Data Entry Route */}
        <Route path="/data-entry" element={<DataEntry />} /> {/* Add the DataEntry route */}
      </Routes>
    </Router>
  );
}

export default App;
