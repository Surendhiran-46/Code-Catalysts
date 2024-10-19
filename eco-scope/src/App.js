// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './component/Home';
// import Login from './component/Login';
// import Register from './component/Register';
// import DataEntry from './component/DataEntry';
// import { AuthProvider } from './context/AuthContext';  // Import the AuthProvider
// import ProtectedRoute from './component/ProtectedRoute'; // Import ProtectedRoute
// import HomeLogged from './component/HomeLogged';
// import Profile from './component/Profile';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* Protected Routes */}
//           <Route path="/Home" element={<ProtectedRoute element={<HomeLogged />} />} />
//           <Route path="/data-entry" element={<ProtectedRoute element={<DataEntry />} />} /> 
//           <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} /> 
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import Register from './component/Register';
import DataEntry from './component/DataEntry';
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider
import ProtectedRoute from './component/ProtectedRoute'; // Import ProtectedRoute
import HomeLogged from './component/HomeLogged';
import Profile from './component/Profile';
import Sugess from './component/suggestion'; // Import Sugess component

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="/home" element={<ProtectedRoute element={<HomeLogged />} />} />
          <Route path="/data-entry" element={<ProtectedRoute element={<DataEntry />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          
          {/* Sugess Component Route */}
          <Route path="/suggestion" element={<ProtectedRoute element={<Sugess />} />} /> {/* Added Sugess component route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
