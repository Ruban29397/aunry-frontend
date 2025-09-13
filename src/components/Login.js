import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  // const location = useLocation(); // Removed as not directly used for displaying messages
  const { login } = useContext(AuthContext);

  // Display message if redirected from a private route
  // React.useEffect(() => {
  //   if (location.state && location.state.message) {
  //     setMessage(location.state.message);
  //   }
  // }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const success = await login(username, password);
      if (success) {
        setMessage('You Made It!'); // Display message on successful login
        navigate('/videos'); // Redirect to videos page after login
      } else {
        setMessage('Login failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.msg || 'Error logging in');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
