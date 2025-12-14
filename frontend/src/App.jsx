import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Navbar from './components/Navbar';

function App() {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Login */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" /> : <Login />
          }
        />

        {/* Register */}
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/" /> : <Register />
          }
        />

        {/* Admin Panel */}
        <Route
          path="/admin"
          element={
            !isAuthenticated ? (
              <Navigate to="/login" />
            ) : !isAdmin ? (
              <Navigate to="/" />
            ) : (
              <AdminPanel />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
