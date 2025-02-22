import React from 'react';
import { Link } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PeopleIcon from '@mui/icons-material/People';
import PollIcon from '@mui/icons-material/Poll';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SchoolIcon from '@mui/icons-material/School';
import FacultyProfile from './common/FacultyProfile';

export default function AdminElection() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-200 to-blue-300 p-3 sm:p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="bg-white p-1.5 sm:p-2 rounded-lg shadow-sm">
              <SchoolIcon className="text-blue-500 text-2xl sm:text-4xl" />
            </div>
            <h1 className="text-base sm:text-2xl font-semibold text-black">
              Sanjivani College of Engineering
            </h1>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-6">
            <Link to="/dashboard">
              <HomeIcon className="text-black text-xl sm:text-2xl cursor-pointer hover:text-blue-600 transition-colors" />
            </Link>
            <div className="relative">
              <NotificationsIcon 
                className="text-black text-xl cursor-pointer hover:text-blue-600 transition-colors" 
              />
            </div>
            <FacultyProfile />
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Link to="/admin-dashboard" className="hover:text-blue-500">Admin Dashboard</Link>
          <span>/</span>
          <span className="text-black">Election Management</span>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-center mb-6">Admin Election Management</h1>
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap justify-center gap-4"> {/* Flex wrap for side by side */}
          {/* Add Position Card */}
          <Link 
            to="/admin/election/positions" 
            className="bg-[#FFE4BA] rounded-lg p-5 flex flex-col items-center hover:shadow-lg transition-all transform hover:-translate-y-1"
          >
            <div className="bg-[#FF8A00] p-3 rounded-full mb-2.5">
              <AddCircleIcon className="text-white text-2xl" />
            </div>
            <h2 className="text-lg font-semibold text-black mb-1">Add Position</h2>
            <p className="text-center text-gray-600 text-sm">Add new positions for candidates</p>
          </Link>

          {/* Manage Candidates Card */}
          <Link 
            to="/admin/manage-candidates" 
            className="bg-[#D4E6F1] rounded-lg p-5 flex flex-col items-center hover:shadow-lg transition-all transform hover:-translate-y-1"
          >
            <div className="bg-[#2E86C1] p-3 rounded-full mb-2.5">
              <PeopleIcon className="text-white text-2xl" />
            </div>
            <h2 className="text-lg font-semibold text-black mb-1">Manage Candidates</h2>
            <p className="text-center text-gray-600 text-sm">View and manage registered candidates</p>
          </Link>

          {/* Live Result Card */}
          <Link 
            to="/admin/election/live-results" 
            className="bg-[#FADBD8] rounded-lg p-5 flex flex-col items-center hover:shadow-lg transition-all transform hover:-translate-y-1"
          >
            <div className="bg-[#E74C3C] p-3 rounded-full mb-2.5">
              <PollIcon className="text-white text-2xl" />
            </div>
            <h2 className="text-lg font-semibold text-black mb-1">Live Results</h2>
            <p className="text-center text-gray-600 text-sm">View real-time election results</p>
          </Link>
        </div>
      </div>
    </div>
  );
}