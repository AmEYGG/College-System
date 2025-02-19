import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ReportIcon from '@mui/icons-material/Report';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SchoolIcon from '@mui/icons-material/School';

export default function Dashboard() {
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
            <HomeIcon className="text-black text-2xl cursor-pointer hover:text-blue-600 transition-colors" />
            <NotificationsIcon className="text-black text-2xl cursor-pointer hover:text-blue-600 transition-colors" />
            <div className="bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-colors">
              <AccountCircleIcon className="text-white text-2xl" />
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="container mx-auto mt-12 px-4">
        <div className="relative w-full max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search Module"
            className="w-full p-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Modules Grid */}
      <div className="container mx-auto mt-12 px-4 pb-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Election */}
          <Link to="/election" className="bg-[#FFF5E9] rounded-lg p-6 flex flex-col items-center hover:shadow-md transition-all hover:-translate-y-1">
            <div className="bg-blue-500 p-4 rounded-full mb-4">
              <HowToVoteIcon className="text-white text-4xl" />
            </div>
            <h2 className="text-xl font-medium text-black">Election</h2>
          </Link>

          {/* Facility Booking */}
          <Link to="/facility-booking" className="bg-[#FFF5E9] rounded-lg p-6 flex flex-col items-center hover:shadow-md transition-all hover:-translate-y-1">
            <div className="bg-cyan-500 p-4 rounded-full mb-4">
              <CalendarMonthIcon className="text-white text-4xl" />
            </div>
            <h2 className="text-xl font-medium text-black">Facility Booking</h2>
          </Link>

          {/* Complaints */}
          <Link to="/complaints" className="bg-[#FFF5E9] rounded-lg p-6 flex flex-col items-center hover:shadow-md transition-all hover:-translate-y-1">
            <div className="bg-red-500 p-4 rounded-full mb-4">
              <ReportIcon className="text-white text-4xl" />
            </div>
            <h2 className="text-xl font-medium text-black">Complaints</h2>
          </Link>

          {/* Application */}
          <Link to="/application" className="bg-[#FFF5E9] rounded-lg p-6 flex flex-col items-center hover:shadow-md transition-all hover:-translate-y-1">
            <div className="bg-gray-500 p-4 rounded-full mb-4">
              <AddCircleIcon className="text-white text-4xl" />
            </div>
            <h2 className="text-xl font-medium text-black">Application</h2>
          </Link>

          {/* Budget Tracking */}
          <Link to="/budget" className="bg-[#FFF5E9] rounded-lg p-6 flex flex-col items-center hover:shadow-md transition-all hover:-translate-y-1">
            <div className="bg-green-500 p-4 rounded-full mb-4">
              <AccountBalanceWalletIcon className="text-white text-4xl" />
            </div>
            <h2 className="text-xl font-medium text-black">Budge Tracking</h2>
          </Link>

          {/* Academic Integrity */}
          <Link to="/academic-integrity" className="bg-[#FFF5E9] rounded-lg p-6 flex flex-col items-center hover:shadow-md transition-all hover:-translate-y-1">
            <div className="bg-orange-500 p-4 rounded-full mb-4">
              <VerifiedUserIcon className="text-white text-4xl" />
            </div>
            <h2 className="text-xl font-medium text-black">Academic Integrity</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
