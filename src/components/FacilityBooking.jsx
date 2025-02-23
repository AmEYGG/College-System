import React, { useState } from 'react';
import axios from 'axios';

const FACILITIES = ['Auditorium', 'Seminar Hall', 'Sports Ground', 'Conference Room'];

export default function FacilityBooking() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
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
      const response = await axios.post('/api/facilities/book', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        setSuccess(true);
        setFormData({
          organizationName: '',
          leaderName: '',
          contactNumber: '',
          facility: '',
          bookingReason: '',
          bookingDate: ''
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting booking request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Facility Booking Form</h2>
      
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Organization Name</label>
          <input
            type="text"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Leader Name</label>
          <input
            type="text"
            name="leaderName"
            value={formData.leaderName}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Contact Number</label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Select Facility</label>
          <select
            name="facility"
            value={formData.facility}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Select a facility</option>
            {FACILITIES.map(facility => (
              <option key={facility} value={facility}>{facility}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Reason for Booking</label>
          <textarea
            name="bookingReason"
            value={formData.bookingReason}
            onChange={handleChange}
            className="w-full border rounded p-2"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Booking Date</label>
          <input
            type="date"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
            className="w-full border rounded p-2"
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Submitting...' : 'Submit Booking'}
        </button>
      </form>

      <div className="mt-6 text-sm text-gray-600">
        <p className="font-semibold">Important Note:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Please ensure all details are correct before submission.</li>
          <li>You will receive a confirmation email once approved.</li>
          <li>Bookings are subject to availability and approval.</li>
        </ul>
      </div>
    </div>
  );
} 