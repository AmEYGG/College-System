import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SchoolIcon from '@mui/icons-material/School';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import SubjectIcon from '@mui/icons-material/Subject';
import CategoryIcon from '@mui/icons-material/Category';
import ProfileMenu from './common/ProfileMenu';

export default function ComplaintInfo() {
  const [formData, setFormData] = useState({
    complaintType: '',
    subject: '',
    description: '',
    anonymous: true,
    priority: 'medium'
  });

  const complaintTypes = [
    { value: 'academic', label: 'Academic Issues' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'hostel', label: 'Hostel Related' },
    { value: 'ragging', label: 'Ragging' },
    { value: 'other', label: 'Other' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 flex flex-col">
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
          <Link to="/dashboard" className="hover:text-orange-500">Home</Link>
          <span>/</span>
          <span className="text-black">File Complaint</span>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-6 py-5">
            <h2 className="text-2xl font-bold text-white text-center tracking-wide">
              File a Complaint
            </h2>
            <p className="text-orange-100 text-center mt-1 text-sm">
              Your complaint will be handled with utmost confidentiality
            </p>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Complaint Type */}
              <div className="relative group">
                <CategoryIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-600 text-xl" />
                <select
                  name="complaintType"
                  value={formData.complaintType}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl
                    focus:outline-none focus:border-orange-500 transition-colors
                    hover:border-orange-400 text-gray-700 appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select Complaint Type</option>
                  {complaintTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div className="relative group">
                <SubjectIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-600 text-xl" />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject of Complaint"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl
                    focus:outline-none focus:border-orange-500 transition-colors
                    hover:border-orange-400 text-gray-700"
                  required
                />
              </div>

              {/* Description */}
              <div className="relative group">
                <ReportProblemIcon className="absolute left-3 top-4 text-orange-600 text-xl" />
                <textarea
                  name="description"
                  placeholder="Describe your complaint in detail"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl
                    focus:outline-none focus:border-orange-500 transition-colors
                    hover:border-orange-400 text-gray-700 resize-none h-32"
                  required
                />
              </div>

              {/* Options */}
              <div className="space-y-4">
                {/* Anonymous Option */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="anonymous"
                    checked={formData.anonymous}
                    onChange={handleChange}
                    className="form-checkbox text-orange-600 rounded focus:ring-orange-500"
                  />
                  <span className="text-gray-700">File this complaint anonymously</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white py-4 rounded-xl 
                    text-lg font-semibold hover:from-orange-700 hover:to-orange-800 
                    transform hover:-translate-y-0.5 transition-all duration-150
                    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 
                    shadow-lg hover:shadow-xl active:shadow-md"
                >
                  Submit Complaint
                </button>
              </div>
            </form>

            {/* Additional Information */}
            <div className="mt-6 text-center space-y-2">
              <div className="bg-orange-50 rounded-xl p-4 text-sm text-orange-600">
                <p className="font-medium">Important Note:</p>
                <p>All complaints are taken seriously and will be investigated thoroughly.</p>
                <p>False complaints may lead to disciplinary action.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 