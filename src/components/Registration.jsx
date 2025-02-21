import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SchoolIcon from '@mui/icons-material/School';
import ProfileMenu from './common/ProfileMenu';

export default function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: '',
    year: '',
    position: '',
    additionalDetails: '',
    photo: null,
    photoPreview: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [positions, setPositions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        alert('File is too large. Please choose an image under 5MB.');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photo: file,
          photoPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.fullName || !formData.email || !formData.department || !formData.year || !formData.position) {
      setError('Please fill all required fields');
      setLoading(false);
      return;
    }

    try {
      // Create candidate object with base64 image
      const newCandidate = {
        id: Date.now(),
        name: formData.fullName,
        department: formData.department,
        collegeYear: formData.year,
        image: formData.photoPreview || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop",
        about: formData.additionalDetails,
        position: formData.position
      };

      // Get existing candidates from localStorage
      const existingCandidates = JSON.parse(localStorage.getItem('candidates') || '[]');
      
      // Add new candidate
      const updatedCandidates = [...existingCandidates, newCandidate];
      
      // Save back to localStorage
      localStorage.setItem('candidates', JSON.stringify(updatedCandidates));

      // Show success message
      alert('Registration successful! Your card will appear in the voting section.');
      
      // Navigate to voting page
      navigate('/election/voting');
    } catch (error) {
      setError(error.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const toggleNotificationPanel = () => {
    setIsNotificationOpen(prev => !prev);
  };

  // Fetch positions from localStorage
  useEffect(() => {
    const storedPositions = JSON.parse(localStorage.getItem('positions') || '[]');
    setPositions(storedPositions);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
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
                  onClick={toggleNotificationPanel} 
                />
                <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-1.5 h-1.5"></span>
                {isNotificationOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4">
                    <h3 className="font-bold">Notifications</h3>
                    <p>No new notifications</p>
                    {/* Add more notification items here */}
                  </div>
                )}
              </div>
              <ProfileMenu />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-3 py-2 sm:px-4 sm:py-4">
        <div className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base text-gray-600">
          <Link to="/dashboard" className="hover:text-blue-500">Home</Link>
          <span>/</span>
          <Link to="/election" className="hover:text-blue-500">Election</Link>
          <span>/</span>
          <span className="text-black">Register</span>
        </div>
      </div>

      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-[#4DA9DD] py-8 px-10">
            <h1 className="text-5xl font-bold text-center text-black">Registration Form</h1>
            <h2 className="text-2xl text-center text-black mt-3">A Student Election</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-6">
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input 
                type="text" 
                name="fullName" 
                value={formData.fullName} 
                onChange={handleChange} 
                placeholder="Full Name" 
                required 
                className="w-full p-3 bg-[#A9C1D1] rounded-lg text-black placeholder-gray-700 font-medium"
              />
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="E-mail" 
                required 
                className="w-full p-3 bg-[#A9C1D1] rounded-lg text-black placeholder-gray-700 font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <select 
                name="department" 
                value={formData.department} 
                onChange={handleChange} 
                required 
                className="w-full p-3 bg-[#A9C1D1] rounded-lg text-black font-medium"
              >
                <option value="" disabled className="text-gray-700">Select Department</option>
                <option value="cse">Computer Science</option>
                <option value="it">Information Technology</option>
                <option value="mech">Mechanical</option>
                <option value="civil">Civil</option>
              </select>

              <select 
                name="year" 
                value={formData.year} 
                onChange={handleChange} 
                required 
                className="w-full p-3 bg-[#A9C1D1] rounded-lg text-black font-medium"
              >
                <option value="" disabled className="text-gray-700">Select Year</option>
                <option value="1">First Year</option>
                <option value="2">Second Year</option>
                <option value="3">Third Year</option>
                <option value="4">Fourth Year</option>
              </select>
            </div>

            <select 
              name="position" 
              value={formData.position} 
              onChange={handleChange} 
              required 
              className="w-full p-3 bg-[#A9C1D1] rounded-lg text-black font-medium"
            >
              <option value="" disabled className="text-gray-700">Select Position</option>
              {positions.map((pos, index) => (
                <option key={index} value={pos.position}>{pos.position} ({pos.club})</option>
              ))}
            </select>

            <textarea 
              name="additionalDetails" 
              value={formData.additionalDetails} 
              onChange={handleChange} 
              placeholder="Additional Details (optional)" 
              className="w-full p-3 bg-[#A9C1D1] rounded-lg h-24 text-black placeholder-gray-700 font-medium"
            />

            <div className="flex flex-col items-center gap-4">
              <label className="bg-[#D3D3D3] px-10 py-3 rounded-lg cursor-pointer hover:bg-gray-300 transition-all">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="hidden"
                  required
                />
                Upload Photo
              </label>
              {formData.photoPreview && (
                <img 
                  src={formData.photoPreview} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded-lg border"
                />
              )}
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#4DA9DD] text-black px-20 py-3 rounded-lg text-xl font-medium 
                hover:bg-[#3998CC] transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
