import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Login() {
  const navigate = useNavigate();
  
  // State variables for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state before submitting

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Login successful");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      setError(error.message || "Server error. Please try again later");
    }
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email field */}
            <div className="relative group">
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
                placeholder="Email"
                className="w-full py-3 bg-transparent border-b-2 border-gray-400 focus:outline-none text-xl placeholder-black/70 focus:border-[#FF8A00] transition-colors"
              />
              <EmailIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black/70 text-2xl" />
            </div>

            {/* Password field */}
            <div className="relative group">
              <input 
                type={showPassword ? 'text' : 'password'}
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
                placeholder="Password"
                className="w-full py-3 bg-transparent border-b-2 border-gray-400 focus:outline-none text-xl placeholder-black/70 focus:border-[#FF8A00] transition-colors"
              />
              <span 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </span>
            </div>

            {/* Select Option field */}
            <div className="relative group">
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)} 
                required
                className="w-full py-3 bg-transparent border-b-2 border-gray-400 focus:outline-none text-xl text-black/70 appearance-none cursor-pointer focus:border-[#FF8A00] transition-colors"
              >
                <option value="" disabled>Select Option</option>
                <option value="admin">Admin</option>
                <option value="faculty">Faculty</option>
                <option value="student">Student</option>
                <option value="doctor">Doctor</option>
              </select>
              <ArrowDropDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black/70 text-2xl pointer-events-none" />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-600 text-center">{error}</p>}

            {/* Forgot Password */}
            <div className="text-right">
              <a href="/forgot-password" className="text-black/70 text-lg hover:text-[#FF8A00] transition-colors">
                Forgot Password?
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
