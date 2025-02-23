import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SchoolIcon from '@mui/icons-material/School';
import ProfileMenu from './common/ProfileMenu';

const FACILITIES = ['Auditorium', 'Seminar Hall', 'Sports Ground', 'Conference Room'];

export default function BookingForm() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    organizationName: '',
    leaderName: '',
    contactNumber: '',
    facility: '',
    bookingReason: '',
    bookingDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        leaderName: user.full_name || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'leaderName') return; // Prevent changing leader name
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please login to book a facility');
      }

      const response = await fetch('/api/facilities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          organizationName: formData.organizationName,
          leaderName: formData.leaderName,
          contactNumber: formData.contactNumber,
          facility: formData.facility,
          bookingReason: formData.bookingReason,
          bookingDate: formData.bookingDate
        })
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        console.error('Response status:', response.status);
        console.error('Response data:', data);
        throw new Error(data?.message || `Failed to submit booking: ${response.statusText}`);
      }

      if (!data) {
        throw new Error('Invalid server response');
      }

      setSuccess(true);
      setFormData({
        organizationName: '',
        leaderName: user?.full_name || '',
        contactNumber: '',
        facility: '',
        bookingReason: '',
        bookingDate: ''
      });
    } catch (err) {
      console.error('Booking error:', err);
      setError(err.message || 'Failed to submit booking request');
    } finally {
      setLoading(false);
    }
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
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                Booking request submitted successfully! You will receive a confirmation email once approved.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Leader Name
                  </label>
                  <input
                    type="text"
                    name="leaderName"
                    value={formData.leaderName}
                    readOnly
                    className="w-full border border-gray-300 rounded-md p-2 bg-gray-50 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Facility
                  </label>
                  <select
                    name="facility"
                    value={formData.facility}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select a facility</option>
                    {FACILITIES.map(facility => (
                      <option key={facility} value={facility}>{facility}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Booking
                </label>
                <textarea
                  name="bookingReason"
                  value={formData.bookingReason}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Booking Date
                </label>
                <input
                  type="date"
                  name="bookingDate"
                  value={formData.bookingDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Submitting...' : 'Submit Booking Request'}
              </button>
            </form>

            <div className="mt-8 p-4 bg-blue-50 rounded-md">
              <h3 className="font-semibold text-blue-800 mb-2">Important Notes:</h3>
              <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
                <li>Please verify all details before submission</li>
                <li>You will receive a confirmation email after approval</li>
                <li>Booking is subject to facility availability</li>
                <li>Cancellations must be made at least 24 hours in advance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}