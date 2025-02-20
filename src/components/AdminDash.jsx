import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ReportIcon from '@mui/icons-material/Report';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import ProfileMenu from './common/ProfileMenu';

export default function AdminDash() {
  const modules = [
    {
      title: "Election Management",
      path: "/election-management",
      icon: <HowToVoteIcon className="text-white text-2xl" />,
      bgColor: "bg-[#FFE4BA]",
      iconBg: "bg-[#FF8A00]"
    },
    {
      title: "Complaint Review",
      path: "/complaint-review",
      icon: <ReportIcon className="text-white text-2xl" />,
      bgColor: "bg-[#B8D8BA]",
      iconBg: "bg-[#4A7B4C]"
    },
    {
      title: "Facility Booking Request",
      path: "/facility-booking-request",
      icon: <AssignmentIcon className="text-white text-2xl" />,
      bgColor: "bg-[#FFD6D6]",
      iconBg: "bg-[#FF4D4D]"
    },
    {
      title: "Budge & Fund Administration",
      path: "/budget-admin",
      icon: <AccountBalanceWalletIcon className="text-white text-2xl" />,
      bgColor: "bg-[#D4E6F1]",
      iconBg: "bg-[#2E86C1]"
    },
    {
      title: "Event & Budget Management",
      path: "/event-management",
      icon: <EventNoteIcon className="text-white text-2xl" />,
      bgColor: "bg-[#E8DAEF]",
      iconBg: "bg-[#8E44AD]"
    },
    {
      title: "Academic Integrity Record",
      path: "/academic-integrity",
      icon: <VerifiedUserIcon className="text-white text-2xl" />,
      bgColor: "bg-[#FCF3CF]",
      iconBg: "bg-[#F1C40F]"
    },
    {
      title: "Health & Leave Notification",
      path: "/health-leave",
      icon: <LocalHospitalIcon className="text-white text-2xl" />,
      bgColor: "bg-[#FADBD8]",
      iconBg: "bg-[#E74C3C]"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header - Better mobile optimization */}
      <header className="bg-gradient-to-r from-blue-200 to-blue-300 p-3 sm:p-4">
        <div className="container mx-auto">
          {/* Top row with logo and title - Always visible */}
          <div className="flex items-center justify-between mb-3 sm:mb-0">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="bg-white p-1.5 sm:p-2 rounded-lg shadow-sm">
                <SchoolIcon className="text-blue-500 text-2xl sm:text-4xl" />
              </div>
              <h1 className="text-base sm:text-2xl font-semibold text-black">
                Sanjivani College of Engineering
              </h1>
            </div>
            
            {/* Icons for mobile - Right aligned */}
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

      {/* Search Bar - Better mobile optimization */}
      <div className="container mx-auto mt-4 sm:mt-8 px-3 sm:px-4">
        <div className="relative w-full max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search Module"
            className="w-full p-2 sm:p-3 pl-9 sm:pl-12 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 text-sm sm:text-base"
          />
          <SearchIcon className="absolute left-2.5 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg sm:text-xl" />
        </div>
      </div>

      {/* Modules Grid - Better mobile optimization */}
      <div className="container mx-auto mt-4 sm:mt-8 px-2 sm:px-4 pb-6 sm:pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6 max-w-6xl mx-auto">
          {modules.map((module, index) => (
            <Link 
              key={index}
              to={module.path} 
              className={`${module.bgColor} rounded-lg p-2.5 sm:p-4 flex flex-col items-center hover:shadow-lg transition-all hover:-translate-y-1 w-full`}
            >
              <div className={`${module.iconBg} p-2 sm:p-3 rounded-full mb-2 sm:mb-3`}>
                {React.cloneElement(module.icon, {
                  className: "text-white text-lg sm:text-2xl"
                })}
              </div>
              <h2 className="text-xs sm:text-base font-medium text-black text-center leading-tight px-1">
                {module.title}
              </h2>
            </Link>
          ))}
        </div>
      </div>

      {/* This will render the nested routes */}
      <Outlet />
    </div>
  );
} 