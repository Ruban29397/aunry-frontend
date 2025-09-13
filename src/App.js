import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import AdminUpload from './components/AdminUpload';
import Register from './components/Register';
// import PrivateRoute from './components/PrivateRoute'; // Removed as PrivateRoute is no longer used
import Navbar from './components/Navbar';
import Login from './components/Login'; // Re-added Login import

// Main App component with routing
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Render Navbar globally */}
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} /> {/* Re-added Login route */}
          <Route path="/videos" element={<VideoList />} />
          <Route path="/video/:id" element={<VideoPlayer />} />
          <Route path="/admin/upload" element={<AdminUpload />} /> {/* AdminUpload is now directly accessible if logged in */}
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
