import React, { useState } from 'react';
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photo: file,
          photoPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.fullName || !formData.email || !formData.department || !formData.year || !formData.position || !formData.photo) {
      setError('Please fill all required fields and upload a photo.');
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key !== 'photoPreview') {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await fetch('http://localhost:5000/api/registerCandidate', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong!');
      }

      alert('Registration successful!');
      navigate('/election');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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
<<<<<<< HEAD
              <NotificationsIcon className="text-black text-xl cursor-pointer hover:text-blue-600 transition-colors" />
              <AccountCircleIcon className="text-black text-xl cursor-pointer hover:text-blue-600 transition-colors" />
=======
              <div className="relative">
                <NotificationsIcon className="text-black text-xl cursor-pointer hover:text-blue-600 transition-colors" />
                <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-1.5 h-1.5"></span>
              </div>
              <ProfileMenu />
>>>>>>> afbfa6377a713866e9750d4c09a9f10cd589cafc
            </div>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-[#4DA9DD] py-8 px-10">
            <h1 className="text-5xl font-bold text-center text-black">Registration Form</h1>
            <h2 className="text-2xl text-center text-black mt-3">A Student Election</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-6">
            {error && <p className="text-red-500 text-center">{error}</p>}

            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required className="w-full p-3 bg-gray-100 rounded-lg"/>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-mail" required className="w-full p-3 bg-gray-100 rounded-lg"/>
            
            <select name="department" value={formData.department} onChange={handleChange} required className="w-full p-3 bg-gray-100 rounded-lg">
              <option value="" disabled>Select Department</option>
              <option value="cse">Computer Science</option>
              <option value="it">Information Technology</option>
              <option value="mech">Mechanical</option>
              <option value="civil">Civil</option>
            </select>
            
            <select name="year" value={formData.year} onChange={handleChange} required className="w-full p-3 bg-gray-100 rounded-lg">
              <option value="" disabled>Select Year</option>
              <option value="1">First Year</option>
              <option value="2">Second Year</option>
              <option value="3">Third Year</option>
              <option value="4">Fourth Year</option>
            </select>

            <select name="position" value={formData.position} onChange={handleChange} required className="w-full p-3 bg-gray-100 rounded-lg">
              <option value="" disabled>Select Position</option>
              <option value="president">President</option>
              <option value="secretary">Secretary</option>
              <option value="treasurer">Treasurer</option>
              <option value="ladies_representative">Ladies Representative</option>
            </select>

            <textarea name="additionalDetails" value={formData.additionalDetails} onChange={handleChange} placeholder="Additional Details (optional)" className="w-full p-3 bg-gray-100 rounded-lg h-24"></textarea>
            
            <input type="file" accept="image/*" onChange={handleFileChange} required/>
            {formData.photoPreview && <img src={formData.photoPreview} alt="Preview" className="mt-3 w-32 h-32 object-cover rounded-lg border"/>}

            <button type="submit" disabled={loading} className="bg-blue-500 text-white px-20 py-3 rounded-lg text-xl font-medium hover:bg-blue-600 transition-all">
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
