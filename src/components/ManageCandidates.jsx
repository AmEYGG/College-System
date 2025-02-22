import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SchoolIcon from '@mui/icons-material/School';
import ProfileMenu from './common/ProfileMenu';

export default function ManageCandidates() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    // Load existing candidates from local storage
    const storedCandidates = JSON.parse(localStorage.getItem('candidates') || '[]');
    setCandidates(storedCandidates);
  }, []);

  const handleDelete = (index) => {
    const updatedCandidates = candidates.filter((_, i) => i !== index);
    setCandidates(updatedCandidates);
    localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
    alert('Candidate deleted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 w-full">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-white p-1.5 rounded-lg shadow-sm">
              <SchoolIcon className="text-blue-500 text-2xl" />
            </div>
            <h1 className="text-xl font-semibold text-white">Sanjivani College of Engineering</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <HomeIcon className="text-white text-xl cursor-pointer hover:text-blue-200 transition-colors" />
            </Link>
            <div className="relative">
              <NotificationsIcon className="text-white text-xl cursor-pointer hover:text-blue-200 transition-colors" />
            </div>
            <ProfileMenu />
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center gap-2 text-gray-600">
          <Link to="/admin/dashboard" className="hover:text-blue-500">Admin Dashboard</Link>
          <span>/</span>
          <Link to="/admin/election" className="hover:text-blue-500">Election Management</Link>
          <span>/</span>
          <span className="text-black">Manage Candidates</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Registered Candidates</h2>
        <div className="bg-white p-4 rounded-lg shadow-md mt-2">
          {candidates.length > 0 ? (
            candidates.map((cand, index) => (
              <div key={index} className="border-b py-2 flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">{cand.name}</h4>
                  <p className="text-gray-600">Post: {cand.post}</p> {/* Display the correct post */}
                </div>
                <button 
                  onClick={() => handleDelete(index)} 
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No candidates registered yet.</p>
          )}
        </div>
      </div>
    </div>
  );
} 