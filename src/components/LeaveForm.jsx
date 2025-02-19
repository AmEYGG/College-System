import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import SubjectIcon from '@mui/icons-material/Subject';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function LeaveForm() {
  const [formData, setFormData] = useState({
    studentName: '',
    hostelRoom: '',
    classDiv: '',
    mobileNo: '',
    leavingDate: '',
    time: '',
    reason: '',
    visitPlace: '',
    parentInformed: 'no'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e) => {
    const value = e.target.type === 'radio' ? e.target.value : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
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
              <div className="bg-blue-500 rounded-full p-1 cursor-pointer hover:bg-blue-600 transition-colors">
                <AccountCircleIcon className="text-white text-xl" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Link to="/dashboard" className="hover:text-blue-500">Home</Link>
          <span>/</span>
          <Link to="/application" className="hover:text-blue-500">Applications</Link>
          <span>/</span>
          <span className="text-black">Leave Application</span>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-5">
            <h2 className="text-2xl font-bold text-white text-center tracking-wide">
              Student Leave Form
            </h2>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Student Name */}
              <div className="relative group">
                <PersonIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-600 text-xl" />
                <input
                  type="text"
                  name="studentName"
                  placeholder="Name of the Student"
                  value={formData.studentName}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl
                    focus:outline-none focus:border-indigo-500 transition-colors
                    hover:border-indigo-400 text-gray-700"
                  required
                />
              </div>

              {/* Hostel Details Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative group">
                  <LocationOnIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-600 text-xl" />
                  <input
                    type="text"
                    name="hostelRoom"
                    placeholder="Hostel Room No."
                    value={formData.hostelRoom}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl
                      focus:outline-none focus:border-indigo-500 transition-colors
                      hover:border-indigo-400 text-gray-700"
                    required
                  />
                </div>
                <div className="relative group">
                  <input
                    type="text"
                    name="classDiv"
                    placeholder="Class/Div & Roll No."
                    value={formData.classDiv}
                    onChange={handleChange}
                    className="w-full pl-4 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl
                      focus:outline-none focus:border-indigo-500 transition-colors
                      hover:border-indigo-400 text-gray-700"
                    required
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div className="relative group">
                <input
                  type="tel"
                  name="mobileNo"
                  placeholder="Mobile Number"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  className="w-full pl-4 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl
                    focus:outline-none focus:border-indigo-500 transition-colors
                    hover:border-indigo-400 text-gray-700"
                  required
                />
              </div>

              {/* Date and Time Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative group">
                  <EventIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-600 text-xl" />
                  <input
                    type="date"
                    name="leavingDate"
                    value={formData.leavingDate}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl
                      focus:outline-none focus:border-indigo-500 transition-colors
                      hover:border-indigo-400 text-gray-700"
                    required
                  />
                </div>
                <div className="relative group">
                  <AccessTimeIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-600 text-xl" />
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl
                      focus:outline-none focus:border-indigo-500 transition-colors
                      hover:border-indigo-400 text-gray-700"
                    required
                  />
                </div>
              </div>

              {/* Reason */}
              <div className="relative group">
                <SubjectIcon className="absolute left-3 top-4 text-indigo-600 text-xl" />
                <textarea
                  name="reason"
                  placeholder="Reason of visit"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl
                    focus:outline-none focus:border-indigo-500 transition-colors
                    hover:border-indigo-400 text-gray-700 resize-none h-24"
                  required
                />
              </div>

              {/* Place to Visit */}
              <div className="relative group">
                <LocationOnIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-600 text-xl" />
                <input
                  type="text"
                  name="visitPlace"
                  placeholder="Place to be visited"
                  value={formData.visitPlace}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl
                    focus:outline-none focus:border-indigo-500 transition-colors
                    hover:border-indigo-400 text-gray-700"
                  required
                />
              </div>

              {/* Parents Informed Radio */}
              <div className="space-y-2">
                <label className="text-gray-700 font-medium">Have you informed your parents about the visit?</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="parentInformed"
                      value="yes"
                      checked={formData.parentInformed === 'yes'}
                      onChange={handleChange}
                      className="form-radio text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="parentInformed"
                      value="no"
                      checked={formData.parentInformed === 'no'}
                      onChange={handleChange}
                      className="form-radio text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-4 rounded-xl text-lg font-semibold
                    hover:from-indigo-700 hover:to-indigo-800 transform hover:-translate-y-0.5 transition-all duration-150
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 
                    shadow-lg hover:shadow-xl active:shadow-md"
                >
                  Submit Leave Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 