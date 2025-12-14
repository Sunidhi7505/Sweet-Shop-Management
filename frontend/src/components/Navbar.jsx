import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h2 className="logo">🍬 Sweet Shop</h2>

      <div className="nav-links">
        <Link to="/">Dashboard</Link>

        {!isAuthenticated && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {isAdmin && <Link to="/admin">Admin</Link>}

        {isAuthenticated && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
