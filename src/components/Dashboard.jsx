import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ReportIcon from '@mui/icons-material/Report';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SchoolIcon from '@mui/icons-material/School';
import ProfileMenu from './common/ProfileMenu';

export default function Dashboard() {
  const modules = [
    {
      title: "Election",
      path: "/election",
      icon: <HowToVoteIcon className="text-white text-2xl" />,
      bgColor: "bg-[#FFE4BA]",
      iconBg: "bg-[#FF8A00]"
    },
    {
      title: "Facility Booking",
      path: "/facility-booking",
      icon: <CalendarMonthIcon className="text-white text-2xl" />,
      bgColor: "bg-[#D4E6F1]",
      iconBg: "bg-[#2E86C1]"
    },
    {
      title: "Complaints",
      path: "/complaints",
      icon: <ReportIcon className="text-white text-2xl" />,
      bgColor: "bg-[#FADBD8]",
      iconBg: "bg-[#E74C3C]"
    },
    {
      title: "Application",
      path: "/application",
      icon: <AddCircleIcon className="text-white text-2xl" />,
      bgColor: "bg-[#E8DAEF]",
      iconBg: "bg-[#8E44AD]"
    },
    {
      title: "Budget Tracking",
      path: "/budget",
      icon: <AccountBalanceWalletIcon className="text-white text-2xl" />,
      bgColor: "bg-[#D5F5E3]",
      iconBg: "bg-[#27AE60]"
    },
    {
      title: "Academic Integrity",
      path: "/academic-integrity",
      icon: <VerifiedUserIcon className="text-white text-2xl" />,
      bgColor: "bg-[#FCF3CF]",
      iconBg: "bg-[#F1C40F]"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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
              <HomeIcon className="text-black text-xl sm:text-2xl cursor-pointer hover:text-blue-600 transition-colors" />
              <div className="relative">
                <NotificationsIcon className="text-black text-xl sm:text-2xl cursor-pointer hover:text-blue-600 transition-colors" />
                <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-2 h-2"></span>
              </div>
              <ProfileMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
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

      {/* Modules Grid - Smaller cards */}
      <div className="container mx-auto mt-4 sm:mt-8 px-2 sm:px-4 pb-6 sm:pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-5 max-w-4xl mx-auto">
          {modules.map((module, index) => (
            <Link 
              key={index}
              to={module.path} 
              className={`${module.bgColor} rounded-lg p-2 sm:p-3.5 flex flex-col items-center justify-center hover:shadow-lg transition-all hover:-translate-y-1 sm:hover:scale-102 active:scale-95 h-[100px] sm:h-[130px]`}
            >
              <div className={`${module.iconBg} p-1.5 sm:p-2.5 rounded-full mb-1.5 sm:mb-2`}>
                {React.cloneElement(module.icon, {
                  className: "text-white text-base sm:text-xl"
                })}
              </div>
              <h2 className="text-xs sm:text-sm font-medium text-black text-center leading-tight px-1">
                {module.title}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
