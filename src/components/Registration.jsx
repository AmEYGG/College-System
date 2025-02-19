import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SchoolIcon from '@mui/icons-material/School';
import ProfileMenu from './common/ProfileMenu';

export default function Registration() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: '',
    year: '',
    position: '',
    additionalDetails: '',
    photo: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: file
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
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

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-gray-600">
          {location.pathname === '/election/register' ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-500">Home</Link>
              <span>/</span>
              <Link to="/election" className="hover:text-blue-500">Election</Link>
              <span>/</span>
              <span className="text-black">Candidate Registration</span>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-500">Login</Link>
              <span>/</span>
              <span className="text-black">Register</span>
            </>
          )}
        </div>
      </div>

      {/* Registration Form Container */}
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Form Header */}
          <div className="bg-[#4DA9DD] py-8 px-10">
            <h1 className="text-5xl font-bold text-center text-black">Registration Form</h1>
            <h2 className="text-2xl text-center text-black mt-3">A Student Election</h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-10 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="form-group">
                <label className="block text-xl font-medium text-black mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-[#A9C1D1] rounded-lg border-2 border-transparent focus:border-[#4DA9DD] transition-all outline-none text-black placeholder-gray-600"
                  placeholder="Enter your full name"
                />
              </div>

              {/* E-mail */}
              <div className="form-group">
                <label className="block text-xl font-medium text-black mb-2">E-mail</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-[#A9C1D1] rounded-lg border-2 border-transparent focus:border-[#4DA9DD] transition-all outline-none text-black placeholder-gray-600"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Department */}
              <div className="form-group">
                <label className="block text-xl font-medium text-black mb-2">Department</label>
                <select 
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-[#A9C1D1] rounded-lg border-2 border-transparent focus:border-[#4DA9DD] transition-all outline-none text-black appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select Department</option>
                  <option value="cse">Computer Science</option>
                  <option value="it">Information Technology</option>
                  <option value="mech">Mechanical</option>
                  <option value="civil">Civil</option>
                </select>
              </div>

              {/* Year */}
              <div className="form-group">
                <label className="block text-xl font-medium text-black mb-2">Year</label>
                <select 
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-[#A9C1D1] rounded-lg border-2 border-transparent focus:border-[#4DA9DD] transition-all outline-none text-black appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select Year</option>
                  <option value="1">First Year</option>
                  <option value="2">Second Year</option>
                  <option value="3">Third Year</option>
                  <option value="4">Fourth Year</option>
                </select>
              </div>
            </div>

            {/* Position Applying For */}
            <div className="form-group">
              <label className="block text-xl font-medium text-black mb-2">Position Applying For</label>
              <select 
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="w-full p-3 bg-[#A9C1D1] rounded-lg border-2 border-transparent focus:border-[#4DA9DD] transition-all outline-none text-black appearance-none cursor-pointer"
              >
                <option value="" disabled>Select Position</option>
                <option value="president">President</option>
                <option value="secretary">Secretary</option>
                <option value="treasurer">Treasurer</option>
                <option value="treasurer">Ladies Representative</option>
              </select>
            </div>

            {/* Additional Details */}
            <div className="form-group">
              <label className="block text-xl font-medium text-black mb-2">Additional Details</label>
              <textarea 
                name="additionalDetails"
                value={formData.additionalDetails}
                onChange={handleChange}
                required
                className="w-full p-3 bg-[#A9C1D1] rounded-lg border-2 border-transparent focus:border-[#4DA9DD] transition-all outline-none text-black placeholder-gray-600 h-32 resize-none"
                placeholder="Enter additional details"
              ></textarea>
            </div>

            {/* Upload Photo */}
            <div className="flex justify-center mt-8">
              <label className="bg-[#D3D3D3] px-10 py-3 rounded-lg cursor-pointer hover:bg-gray-300 transition-all transform hover:scale-105 active:scale-95">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                Upload Photo
              </label>
            </div>

            {/* Register Button */}
            <div className="flex justify-center pt-6">
              <button 
                type="submit"
                className="bg-[#4DA9DD] text-black px-20 py-3 rounded-lg text-xl font-medium hover:bg-[#3998CC] transition-all transform hover:scale-105 active:scale-95"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}