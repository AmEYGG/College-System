import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Positions() {
  const [formData, setFormData] = useState({
    club: '',
    position: '',
  });
  const [showPositionInput, setShowPositionInput] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPosition = () => {
    setShowPositionInput(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPosition = {
      club: formData.club,
      position: formData.position,
    };

    // Save the position to localStorage
    const existingPositions = JSON.parse(localStorage.getItem('positions') || '[]');
    localStorage.setItem('positions', JSON.stringify([...existingPositions, newPosition]));

    // Show success message
    toast.success('Position added successfully!');

    // Clear the position input
    setFormData({ club: formData.club, position: '' });
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-center mb-6">Add New Position</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label className="block text-gray-700">Club Name</label>
          <input 
            type="text" 
            name="club" 
            value={formData.club} 
            onChange={handleChange} 
            required 
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter club name"
          />
        </div>
        <button 
          type="button" 
          onClick={handleAddPosition} 
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Add Position
        </button>
        {showPositionInput && (
          <div>
            <label className="block text-gray-700">Position Name</label>
            <input 
              type="text" 
              name="position" 
              value={formData.position} 
              onChange={handleChange} 
              required 
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter position name"
            />
          </div>
        )}
        {showPositionInput && (
          <button 
            type="submit" 
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            Submit Position
          </button>
        )}
      </form>
    </div>
  );
} 