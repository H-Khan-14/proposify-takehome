import { useState } from 'react';
import { useAuth } from '../AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    login(username);
  };

  return (
    <div>
      <h2>Login to begin making collaborative notes</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
