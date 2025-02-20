import React, { createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Registration from './components/Registration';
import ForgotScreen from './components/ForgotScreen';
import ElectionScreen from './components/ElectionScreen';
import AdminDash from './components/AdminDash';
import DoctorDash from './components/DoctorDash';
import ComplaintInfo from './components/ComplaintInfo';
import ApplicationInfo from './components/ApplicationInfo';
import BookingForm from './components/BookingForm';
import LeaveForm from './components/LeaveForm';
import HealthForm from './components/HealthForm';
import ViewPatients from './components/ViewPatients';
import VotingInfo from './components/VotingInfo';

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
        <Route path="/election/register" element={<Registration />} />
        <Route path="/election/voting" element={<VotingInfo />} />
        <Route path="/facility-booking" element={<BookingForm />} />
        <Route path="/complaints" element={<ComplaintInfo />} />
        <Route path="/application" element={<ApplicationInfo />} />
        <Route path="/application/leave" element={<LeaveForm />} />
        <Route path="/budget" element={<div>Budget Tracking Page</div>} />
        <Route path="/academic-integrity" element={<div>Academic Integrity Page</div>} />
        <Route path="/forgot-password" element={<ForgotScreen />} />
        <Route path="/admin-dashboard" element={<AdminDash />} />
        <Route path="/doctor-dashboard" element={<DoctorDash />} />
        <Route path="/doctor-dashboard/add-patient" element={<HealthForm />} />
        <Route path="/doctor-dashboard/view-patients" element={<ViewPatients />} />
      </Routes>
    </Router>
  );
}

export default App;
