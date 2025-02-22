import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import FacultyProfile from './common/FacultyProfile';

export default function AdminDash() {
  const [searchTerm, setSearchTerm] = useState('');

  const modules = [
    { title: "Election Management", path: "/admin/election", icon: <HowToVoteIcon />, bgColor: "bg-[#FFE4BA]", iconBg: "bg-[#FF8A00]" },
    { title: "Complaint Review", path: "/admin/view-complaints", icon: <ReportProblemIcon />, bgColor: "bg-[#B8D8BA]", iconBg: "bg-[#4A7B4C]" },
    { title: "Facility Booking Request", path: "/admin/facility-booking-request", icon: <AssignmentIcon />, bgColor: "bg-[#FFD6D6]", iconBg: "bg-[#FF4D4D]" },
    { title: "Budget & Fund Administration", path: "/budget-admin", icon: <AccountBalanceWalletIcon />, bgColor: "bg-[#D4E6F1]", iconBg: "bg-[#2E86C1]" },
    { title: "Event & Budget Management", path: "/event-management", icon: <EventNoteIcon />, bgColor: "bg-[#E8DAEF]", iconBg: "bg-[#8E44AD]" },
    { title: "Academic Integrity Record", path: "/academic-integrity", icon: <VerifiedUserIcon />, bgColor: "bg-[#FCF3CF]", iconBg: "bg-[#F1C40F]" },
    { title: "Health & Leave Notification", path: "/health-leave", icon: <LocalHospitalIcon />, bgColor: "bg-[#FADBD8]", iconBg: "bg-[#E74C3C]" },
  ];

  const filteredModules = modules.filter(module => module.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-200 to-blue-300 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <SchoolIcon className="text-blue-500 text-4xl" />
            <h1 className="text-2xl font-semibold text-black">Sanjivani College of Engineering</h1>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/dashboard">
              <HomeIcon className="text-black text-2xl hover:text-blue-600 transition-colors" />
            </Link>
            <NotificationsIcon className="text-black text-2xl hover:text-blue-600 transition-colors" />
            <FacultyProfile />
          </div>
        </div>
      </header>
      
      <div className="container mx-auto mt-4 px-4">
        <div className="relative w-full max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search Module"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 text-base"
          />
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        </div>
      </div>

      <div className="container mx-auto mt-6 px-4 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {filteredModules.length > 0 ? (
            filteredModules.map((module, index) => (
              <Link key={index} to={module.path} className={`${module.bgColor} rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition-all hover:-translate-y-1 w-full`}>
                <div className={`${module.iconBg} p-3 rounded-full mb-3`}>{React.cloneElement(module.icon, { className: "text-white text-2xl" })}</div>
                <h2 className="text-base font-medium text-black text-center leading-tight px-1">{module.title}</h2>
              </Link>
            ))
          ) : (
            <p className="text-center col-span-4 text-gray-500">No modules found</p>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
