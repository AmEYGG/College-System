import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PollIcon from '@mui/icons-material/Poll';
import SchoolIcon from '@mui/icons-material/School';

export default function ElectionScreen() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-200 to-blue-300 p-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <SchoolIcon className="text-blue-500 text-4xl" />
            </div>
            <h1 className="text-2xl font-semibold text-black">Sanjivani College of Engineering</h1>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/dashboard">
              <HomeIcon className="text-black text-2xl cursor-pointer hover:text-blue-600 transition-colors" />
            </Link>
            <NotificationsIcon className="text-black text-2xl cursor-pointer hover:text-blue-600 transition-colors" />
            <div className="bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-colors">
              <AccountCircleIcon className="text-white text-2xl" />
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Link to="/dashboard" className="hover:text-blue-500">Home</Link>
          <span>/</span>
          <span className="text-black">Election</span>
        </div>
      </div>

      {/* Main Content - Adjusted for smaller cards */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          {/* Registration Form Card */}
          <Link 
            to="/election/register" 
            className="bg-[#FFE4BA] rounded-xl p-6 flex flex-col items-center hover:shadow-lg transition-all transform hover:-translate-y-1 max-w-[250px] mx-auto w-full"
          >
            <div className="bg-[#FF8A00] p-3 rounded-full mb-3">
              <AssignmentIcon className="text-white text-3xl" />
            </div>
            <h2 className="text-lg font-semibold text-black mb-1">Registration form</h2>
            <p className="text-center text-gray-600 text-sm">Register as a candidate</p>
          </Link>

          {/* Voting Card */}
          <Link 
            to="/election/voting" 
            className="bg-[#FFE4BA] rounded-xl p-6 flex flex-col items-center hover:shadow-lg transition-all transform hover:-translate-y-1 max-w-[250px] mx-auto w-full"
          >
            <div className="bg-[#FF8A00] p-3 rounded-full mb-3">
              <HowToVoteIcon className="text-white text-3xl" />
            </div>
            <h2 className="text-lg font-semibold text-black mb-1">Voting</h2>
            <p className="text-center text-gray-600 text-sm">Cast your vote</p>
          </Link>

          {/* Live Result Tracking Card */}
          <Link 
            to="/election/results" 
            className="bg-[#FFE4BA] rounded-xl p-6 flex flex-col items-center hover:shadow-lg transition-all transform hover:-translate-y-1 max-w-[250px] mx-auto w-full"
          >
            <div className="bg-[#FF8A00] p-3 rounded-full mb-3">
              <PollIcon className="text-white text-3xl" />
            </div>
            <h2 className="text-lg font-semibold text-black mb-1">Live Result Tracking</h2>
            <p className="text-center text-gray-600 text-sm">View real-time results</p>
          </Link>
        </div>
      </div>
    </div>
  );
} 