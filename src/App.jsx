import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminDash from './components/AdminDash';
import StudentDash from './components/StudentDash';
import DoctorDash from './components/DoctorDash';
import ForgotPassword from './components/ForgotPassword';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Admin Dashboard - accessible by Admin and Faculty */}
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute allowedRoles={['Admin', 'Faculty']}>
              <AdminDash />
            </ProtectedRoute>
          } 
        />

        {/* Protected Student Dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['Student']}>
              <StudentDash />
            </ProtectedRoute>
          } 
        />

        {/* Protected Doctor Dashboard */}
        <Route 
          path="/doctor-dashboard" 
          element={
            <ProtectedRoute allowedRoles={['Doctor']}>
              <DoctorDash />
            </ProtectedRoute>
          } 
        />

        {/* Forgot Password Route */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Redirect root to login if not authenticated */}
        <Route 
          path="/" 
          element={
            localStorage.getItem('token') ? 
              <Navigate to="/login" /> : 
              <Login />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App; 