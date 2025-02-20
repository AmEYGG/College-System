import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SchoolIcon from '@mui/icons-material/School';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';
import ProfileMenu from './common/ProfileMenu';

export default function DoctorDash() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-200 to-blue-300 p-3 sm:p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
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
                <NotificationsIcon className="text-black text-xl sm:text-2xl cursor-pointer hover:text-blue-600 transition-colors" />
                <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-2 h-2"></span>
              </div>
              <ProfileMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-gray-600">
          <span className="text-black">Doctor Dashboard</span>
        </div>
      </div>

      {/* Main Content - Cards */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Add Patient Card */}
          <Link 
            to="/doctor-dashboard/add-patient"
            className="bg-[#FFE4BA] rounded-xl p-6 flex flex-col items-center hover:shadow-lg transition-all transform hover:-translate-y-1 w-full"
          >
            <div className="bg-[#FF8A00] p-3 rounded-full mb-3">
              <PersonAddIcon className="text-white text-3xl" />
            </div>
            <h2 className="text-lg font-semibold text-black mb-1">Add Patient</h2>
            <p className="text-center text-gray-600 text-sm">Register new patients and their health records</p>
          </Link>

          {/* View Patients Card */}
          <Link 
            to="/doctor-dashboard/view-patients"
            className="bg-[#FFE4BA] rounded-xl p-6 flex flex-col items-center hover:shadow-lg transition-all transform hover:-translate-y-1 w-full"
          >
            <div className="bg-[#FF8A00] p-3 rounded-full mb-3">
              <PeopleIcon className="text-white text-3xl" />
            </div>
            <h2 className="text-lg font-semibold text-black mb-1">View Patients</h2>
            <p className="text-center text-gray-600 text-sm">Access and manage patient records</p>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="max-w-4xl mx-auto mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-gray-500 text-sm">Total Patients</h3>
            <p className="text-2xl font-bold text-gray-800">0</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-gray-500 text-sm">Today's Patients</h3>
            <p className="text-2xl font-bold text-gray-800">0</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-gray-500 text-sm">Critical Cases</h3>
            <p className="text-2xl font-bold text-gray-800">0</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-gray-500 text-sm">Pending Reviews</h3>
            <p className="text-2xl font-bold text-gray-800">0</p>
          </div>
        </div>
      </div>
    </div>
  );
} 