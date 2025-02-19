import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
  const navigate = useNavigate();
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#87CEEB] to-[#B0E0E6] p-4">
      <div className="w-full max-w-2xl bg-[#E6F7FF] rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
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
  );
}