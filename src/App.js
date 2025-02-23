import React from 'react';
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
import AdminElection from './components/AdminElection';
import Positions from './components/Positions';
import ViewComplaint from './components/ViewComplaint';
import ViewProfile from './components/ViewProfile';
import ManageCandidates from './components/ManageCandidates';
import FacilityRequest from './components/FacilityRequest';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
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
          <Route path="/admin/election" element={<AdminElection />} />
          <Route path="/admin/election/positions" element={<Positions />} />
          <Route path="/admin/manage-candidates" element={<ManageCandidates />} />
          <Route path="/admin/facility-booking-request" element={<FacilityRequest />} />
          <Route path="/doctor-dashboard" element={<DoctorDash />} />
          <Route path="/doctor-dashboard/add-patient" element={<HealthForm />} />
          <Route path="/doctor-dashboard/view-patients" element={<ViewPatients />} />
          <Route path="/admin/view-complaints" element={<ViewComplaint />} />
          <Route path="/profile" element={<ViewProfile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
