import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SchoolIcon from '@mui/icons-material/School';
import ProfileMenu from './common/ProfileMenu';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ViewComplaint() {
  const [complaints, setComplaints] = useState([]);

  // Fetch complaints from localStorage
  useEffect(() => {
    const storedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    setComplaints(storedComplaints);
  }, []);

  const handleApprove = (index) => {
    const updatedComplaints = [...complaints];
    updatedComplaints[index].status = 'approved';
    localStorage.setItem('complaints', JSON.stringify(updatedComplaints));
    toast.success('Complaint approved successfully!');
    setComplaints(updatedComplaints);
  };

  const handleReject = (index) => {
    const updatedComplaints = [...complaints];
    updatedComplaints[index].status = 'rejected';
    localStorage.setItem('complaints', JSON.stringify(updatedComplaints));
    toast.error('Complaint rejected successfully!');
    setComplaints(updatedComplaints);
  };

  return (
    <div className="min-h-screen bg-white">
      <ToastContainer />
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-200 to-blue-300 p-3">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-white p-1.5 rounded-lg shadow-sm">
              <SchoolIcon className="text-blue-500 text-2xl" />
            </div>
            <h1 className="text-base font-semibold text-black">Sanjivani College of Engineering</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <HomeIcon className="text-black text-xl cursor-pointer hover:text-blue-600 transition-colors" />
            </Link>
            <div className="relative">
              <NotificationsIcon className="text-black text-xl cursor-pointer hover:text-blue-600 transition-colors" />
            </div>
            <ProfileMenu />
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Link to="/admin-dashboard" className="hover:text-blue-500">Admin Dashboard</Link>
          <span>/</span>
          <span className="text-black">View Complaints</span>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="container mx-auto px-4 py-4">
        <h2 className="text-2xl font-bold mb-4">Complaints</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Complaint Category</th>
              <th className="border px-4 py-2">Subject</th>
              <th className="border px-4 py-2">Reason</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{complaint.complaintType}</td>
                <td className="border px-4 py-2">{complaint.subject}</td>
                <td className="border px-4 py-2">{complaint.description}</td>
                <td className="border px-4 py-2">
                  <button 
                    onClick={() => handleApprove(index)} 
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handleReject(index)} 
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 