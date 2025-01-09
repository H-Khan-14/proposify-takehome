import { useAuth } from '../AuthContext';

const Logout = () => {
  const { logout, user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div>
      <span>Logged in as: {user} </span>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Logout;
