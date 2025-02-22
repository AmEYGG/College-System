import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ProfileMenu from './common/ProfileMenu';

export default function BookingForm() {
  const facilities = [
    { value: 'ground', label: 'Sports Ground' },
    { value: 'classroom', label: 'Classroom' },
    { value: 'auditorium', label: 'Auditorium' },
    { value: 'lab', label: 'Computer Lab' },
    { value: 'seminar', label: 'Seminar Hall' }
  ];

  const [formData, setFormData] = useState({
    organization: '',
    leaderName: '',
    contactNo: '',
    facility: '',
    reason: '',
    date: ''
  });

  const [requests, setRequests] = useState([]);
  const [isStatusPanelOpen, setIsStatusPanelOpen] = useState(false);

  useEffect(() => {
    // Fetch existing requests from local storage
    const fetchRequests = () => {
      const existingRequests = JSON.parse(localStorage.getItem('facilityRequests') || '[]');
      setRequests(existingRequests);
    };

    fetchRequests();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequest = {
      name: formData.leaderName,
      facility: formData.facility,
      date: formData.date,
      status: 'pending' // Default status
    };

    const existingRequests = JSON.parse(localStorage.getItem('facilityRequests') || '[]');
    existingRequests.push(newRequest);
    localStorage.setItem('facilityRequests', JSON.stringify(existingRequests));

    alert('Your booking request has been submitted successfully!');
    e.target.reset();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleStatusPanel = () => {
    setIsStatusPanelOpen(prev => !prev);
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
                <NotificationsIcon 
                  className="text-black text-xl cursor-pointer hover:text-blue-600 transition-colors" 
                />
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

              {/* Facility Selection */}
              <div className="relative group">
                <MeetingRoomIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600 text-xl" />
                <select
                  name="facility"
                  value={formData.facility}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl
                    focus:outline-none focus:border-blue-500 transition-colors
                    hover:border-blue-400 text-gray-700 appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select Facility</option>
                  {facilities.map(facility => (
                    <option key={facility.value} value={facility.value}>
                      {facility.label}
                    </option>
                  ))}
                </select>
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

      {/* View Status Button */}
      <div className="mt-4">
        <button
          onClick={toggleStatusPanel}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out"
        >
          View Status
        </button>
      </div>

      {/* Existing Requests Popup Panel */}
      {isStatusPanelOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-11/12 md:w-1/2">
            <h3 className="text-center text-xl font-semibold">Existing Requests</h3>
            <div className="overflow-x-auto mt-4">
              <ul className="mt-4">
                {requests.length > 0 ? (
                  requests.map((request, index) => (
                    <li key={index} className="flex justify-between items-center p-2 border-b">
                      <span>{request.name} - {request.facility} - {request.date}</span>
                      <span className={`font-bold ${request.status === 'approved' ? 'bg-green-200 text-green-800' : request.status === 'rejected' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'} rounded-full px-2 py-1`}>
                        {request.status || 'pending'}
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="text-center py-4">No requests available</li>
                )}
              </ul>
            </div>
            <button
              onClick={toggleStatusPanel}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded transition duration-200 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 