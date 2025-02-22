import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminDash from './components/AdminDash';
import StudentDash from './components/StudentDash';
import DoctorDash from './components/DoctorDash';
import ProtectedRoute from './components/ProtectedRoute';
import ProfileMenu from './components/common/ProfileMenu';

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

        {/* Redirect root to login if not authenticated */}
        <Route 
          path="/" 
          element={
            localStorage.getItem('token') ? 
              <Navigate to="/dashboard" /> : 
              <Navigate to="/login" />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App; 