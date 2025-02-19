import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function ForgotScreen() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword === formData.confirmPassword) {
      navigate('/login');
    } else {
      alert('Passwords do not match!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      {/* Background Triangles */}
      <div className="absolute left-0 top-0 w-[55%] h-[50%] bg-[#FF8A00] transform -translate-x-[50%] -translate-y-[35%] rotate-[30deg]"></div>
      <div className="absolute left-0 top-[30%] w-[45%] h-[45%] bg-[#00CED1] transform -translate-x-[50%] rotate-[30deg]"></div>
      <div className="absolute left-0 bottom-[-10%] w-[40%] h-[40%] bg-[#FF8A00] transform -translate-x-[50%] rotate-[30deg]"></div>
      <div className="z-10 flex flex-col items-center w-full max-w-md px-6">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-7xl font-black text-black">Reset Password</h1>
          <div className="h-1.5 w-24 bg-[#FF8A00] mx-auto mt-2"></div>
        </div>

        {/* Form */}
        <div className="w-full bg-[#FFE4BA] rounded-[40px] p-12 shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Email field */}
            <div className="relative group">
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
                className="w-full py-3 bg-transparent border-b-2 border-gray-400 focus:outline-none text-xl placeholder-black/70 focus:border-[#FF8A00] transition-colors"
              />
              <EmailIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black/70 text-2xl" />
            </div>

            {/* New Password */}
            <div className="relative group">
              <input 
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
                placeholder="New Password"
                className="w-full py-3 bg-transparent border-b-2 border-gray-400 focus:outline-none text-xl placeholder-black/70 focus:border-[#FF8A00] transition-colors"
              />
              <LockOutlinedIcon className="absolute right-10 top-1/2 transform -translate-y-1/2 text-black/70 text-2xl" />
              <div 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? 
                  <VisibilityOffIcon className="text-black/70 text-2xl" /> : 
                  <VisibilityIcon className="text-black/70 text-2xl" />
                }
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative group">
              <input 
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm Password"
                className="w-full py-3 bg-transparent border-b-2 border-gray-400 focus:outline-none text-xl placeholder-black/70 focus:border-[#FF8A00] transition-colors"
              />
              <LockOutlinedIcon className="absolute right-10 top-1/2 transform -translate-y-1/2 text-black/70 text-2xl" />
              <div 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showConfirmPassword ? 
                  <VisibilityOffIcon className="text-black/70 text-2xl" /> : 
                  <VisibilityIcon className="text-black/70 text-2xl" />
                }
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button 
                type="submit"
                className="bg-[#FF8A00] text-white px-16 py-3 rounded-full text-xl transform hover:scale-105 hover:shadow-lg transition-all duration-300 active:scale-95"
              >
                Reset Password
              </button>
            </div>

            {/* Back to Login */}
            <div className="text-center">
              <button 
                type="button"
                onClick={() => navigate('/login')}
                className="text-black/70 hover:text-[#FF8A00] transition-colors"
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 