import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css'; // We'll create this next for styling

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/videos" className="navbar-brand">Aunry Videos</Link>
      <div className="navbar-links">
        {user && user.role === 'admin' && user.username === 'rubanpaul' && (
          <Link to="/admin/upload" className="navbar-item">Upload Video</Link>
        )}
        {user ? (
          <button onClick={handleLogout} className="navbar-item">Logout ({user.username})</button>
        ) : (
          <>
            {/* <Link to="/login" className="navbar-item">Login</Link> Removed login link */}
            <Link to="/" className="navbar-item">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

