import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import AdminUpload from './components/AdminUpload';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

// Main App component with routing
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Render Navbar globally */}
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/videos" element={<VideoList />} />
          <Route path="/video/:id" element={<VideoPlayer />} />
          <Route
            path="/admin/upload"
            element={
              <PrivateRoute adminOnly={true}>
                <AdminUpload />
              </PrivateRoute>
            }
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
