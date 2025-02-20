import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ProfileMenu from './common/ProfileMenu';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    organization: '',
    leaderName: '',
    contactNo: '',
    reason: '',
    date: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-200 to-blue-300 p-3">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-white p-1.5 rounded-lg shadow-sm">
                <SchoolIcon className="text-blue-500 text-2xl" />
              </div>
              <h1 className="text-base font-semibold text-black">
                Sanjivani College of Engineering
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Link to="/dashboard">
                <HomeIcon className="text-black text-xl cursor-pointer hover:text-blue-600 transition-colors" />
              </Link>
              <div className="relative">
                <NotificationsIcon className="text-black text-xl cursor-pointer hover:text-blue-600 transition-colors" />
                <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-1.5 h-1.5"></span>
              </div>
              <ProfileMenu />
            </div>
          </div>
        </div>
      </header>

      {/* After the header section */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Link to="/dashboard" className="hover:text-blue-500">Home</Link>
          <span>/</span>
          <span className="text-black">Facility Booking</span>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
            <h2 className="text-2xl font-bold text-white text-center tracking-wide">
              Facility Booking Form
            </h2>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Organization Input */}
              <div className="relative group">
                <BusinessIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600 text-xl" />
                <input
                  type="text"
                  name="organization"
                  placeholder="Organization Name"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl
                    focus:outline-none focus:border-blue-500 transition-colors
                    hover:border-blue-400 text-gray-700"
                  required
                />
              </div>

              {/* Leader Name Input */}
              <div className="relative group">
                <PersonIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600 text-xl" />
                <input
                  type="text"
                  name="leaderName"
                  placeholder="Leader Name"
                  value={formData.leaderName}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl
                    focus:outline-none focus:border-blue-500 transition-colors
                    hover:border-blue-400 text-gray-700"
                  required
                />
              </div>

              {/* Contact Number Input */}
              <div className="relative group">
                <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600 text-xl" />
                <input
                  type="tel"
                  name="contactNo"
                  placeholder="Contact Number"
                  value={formData.contactNo}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl
                    focus:outline-none focus:border-blue-500 transition-colors
                    hover:border-blue-400 text-gray-700"
                  required
                />
              </div>

              {/* Reason Input */}
              <div className="relative group">
                <DescriptionIcon className="absolute left-3 top-4 text-blue-600 text-xl" />
                <textarea
                  name="reason"
                  placeholder="Reason for Booking"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl
                    focus:outline-none focus:border-blue-500 transition-colors
                    hover:border-blue-400 text-gray-700 resize-none h-32"
                  required
                />
              </div>

              {/* Date Selection */}
              <div className="relative group">
                <CalendarTodayIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600 text-xl" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl
                    focus:outline-none focus:border-blue-500 transition-colors
                    hover:border-blue-400 text-gray-700"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl text-lg font-semibold
                    hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-0.5 transition-all duration-150
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                    shadow-lg hover:shadow-xl active:shadow-md"
                >
                  Submit Booking
                </button>
              </div>
            </form>

            {/* Additional Information */}
            <div className="mt-6 text-center space-y-2">
              <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-600">
                <p className="font-medium">Important Note:</p>
                <p>Please ensure all details are correct before submission.</p>
                <p>You will receive a confirmation email once approved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 