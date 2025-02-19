import React from 'react';
import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      {/* Background Triangles */}
      <div className="absolute left-0 top-0 w-[55%] h-[50%] bg-[#FF8A00] transform -translate-x-[50%] -translate-y-[35%] rotate-[30deg]"></div>
      <div className="absolute left-0 top-[30%] w-[45%] h-[45%] bg-[#00CED1] transform -translate-x-[50%] rotate-[30deg]"></div>
      <div className="absolute left-0 bottom-[-10%] w-[40%] h-[40%] bg-[#FF8A00] transform -translate-x-[50%] rotate-[30deg]"></div>

      <div className="z-10 flex flex-col items-center w-full max-w-md px-6">
        {/* Login Title */}
        <div className="text-center mb-10">
          <h1 className="text-7xl font-black text-black">Login</h1>
          <div className="h-1.5 w-24 bg-[#FF8A00] mx-auto mt-2"></div>
        </div>

        {/* Login Form */}
        <div className="w-full bg-[#FFE4BA] rounded-[40px] p-12 shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Email field */}
            <div className="relative group">
              <input 
                type="email" 
                required
                placeholder="Email"
                className="w-full py-3 bg-transparent border-b-2 border-gray-400 focus:outline-none text-xl placeholder-black/70 focus:border-[#FF8A00] transition-colors"
              />
              <EmailIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black/70 text-2xl" />
            </div>

            {/* Password field */}
            <div className="relative group">
              <input 
                type="password" 
                required
                placeholder="Password"
                className="w-full py-3 bg-transparent border-b-2 border-gray-400 focus:outline-none text-xl placeholder-black/70 focus:border-[#FF8A00] transition-colors"
              />
              <LockOutlinedIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black/70 text-2xl" />
            </div>

            {/* Select Option field */}
            <div className="relative group">
              <select 
                required
                className="w-full py-3 bg-transparent border-b-2 border-gray-400 focus:outline-none text-xl text-black/70 appearance-none cursor-pointer focus:border-[#FF8A00] transition-colors"
              >
                <option value="" disabled selected>Select Option</option>
                <option value="admin">Admin</option>
                <option value="faculty">Faculty</option>
                <option value="student">Student</option>
              </select>
              <ArrowDropDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black/70 text-2xl pointer-events-none" />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a href="/forgot-password" className="text-black/70 text-lg hover:text-[#FF8A00] transition-colors">
                Forgot Password ?
              </a>
            </div>

            {/* Login Button */}
            <div className="flex justify-center pt-4">
              <button 
                type="submit"
                className="bg-[#FF8A00] text-white px-16 py-3 rounded-full text-xl transform hover:scale-105 hover:shadow-lg transition-all duration-300 active:scale-95"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
