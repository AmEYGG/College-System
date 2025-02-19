import React, { createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Registration from './components/Registration';
import ForgotScreen from './components/ForgotScreen';
import ElectionScreen from './components/ElectionScreen';

// Create and export the UserContext
export const UserContext = createContext();

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/election" element={<ElectionScreen />} />
        <Route path="/facility-booking" element={<div>Facility Booking Page</div>} />
        <Route path="/complaints" element={<div>Complaints Page</div>} />
        <Route path="/application" element={<div>Application Page</div>} />
        <Route path="/budget" element={<div>Budget Tracking Page</div>} />
        <Route path="/academic-integrity" element={<div>Academic Integrity Page</div>} />
        <Route path="/forgot-password" element={<ForgotScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
