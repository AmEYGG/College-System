import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SchoolIcon from '@mui/icons-material/School';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import ProfileMenu from './common/ProfileMenu';

export default function ApplicationInfo() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const toggleNotificationPanel = () => {
    setIsNotificationOpen(prev => !prev);
  };

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
                <NotificationsIcon 
                  className="text-black text-xl cursor-pointer hover:text-blue-600 transition-colors" 
                  onClick={toggleNotificationPanel} 
                />
                {isNotificationOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4">
                    <h3 className="font-bold">Notifications</h3>
                    <p>No new notifications</p>
                  </div>
                )}
              </div>
              <ProfileMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Link to="/dashboard" className="hover:text-blue-500">Home</Link>
          <span>/</span>
          <span className="text-black">Applications</span>
        </div>
      </div>

      {/* Main Content - Only Leave Application Card */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4 max-w-sm mx-auto">
          {/* Leave Application Card */}
          <Link 
            to="/application/leave" 
            className="bg-[#E8DAEF] rounded-lg p-5 flex flex-col items-center hover:shadow-lg transition-all transform hover:-translate-y-1 w-full"
          >
            <div className="bg-[#8E44AD] p-3 rounded-full mb-2.5">
              <EventBusyIcon className="text-white text-2xl" />
            </div>
            <h2 className="text-lg font-semibold text-black mb-1">Leave Application</h2>
            <p className="text-center text-gray-600 text-sm">Apply for leave</p>
          </Link>
        </div>
      </div>
    </div>
  );
} 