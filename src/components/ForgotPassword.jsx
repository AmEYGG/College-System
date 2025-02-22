import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: email, 2: new password
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ college_email: email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setStep(2); // Move to password reset step
    } catch (error) {
      console.error("Email Verification Error:", error);
      setError(error.message || "Email verification failed");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      console.log("Sending reset request with:", {
        college_email: email,
        newPassword
      });

      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          college_email: email,
          newPassword
        }),
      });

      // Log the raw response
      console.log("Response status:", res.status);
      const data = await res.json();
      console.log("Response data:", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      alert("Password reset successful! Please login with your new password.");
      navigate("/login");
    } catch (error) {
      console.error("Password Reset Error:", error);
      setError(error.message || "Password reset failed");
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

        {/* Form Container */}
        <div className="w-full bg-[#FFE4BA] rounded-[40px] p-12 shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
          {step === 1 ? (
            // Email Form
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="relative group">
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                  placeholder="Enter your email"
                  className="w-full py-3 bg-transparent border-b-2 border-gray-400 focus:outline-none text-xl placeholder-black/70 focus:border-[#FF8A00] transition-colors"
                />
                <EmailIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black/70 text-2xl" />
              </div>

              {error && <p className="text-red-600 text-center">{error}</p>}

              <div className="flex justify-center pt-4">
                <button 
                  type="submit"
                  className="bg-[#FF8A00] text-white px-16 py-3 rounded-full text-xl transform hover:scale-105 hover:shadow-lg transition-all duration-300 active:scale-95"
                >
                  Verify Email
                </button>
              </div>
            </form>
          ) : (
            // Password Reset Form
            <form onSubmit={handlePasswordReset} className="space-y-6">
              <div className="relative group">
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  required
                  placeholder="New Password"
                  className="w-full py-3 bg-transparent border-b-2 border-gray-400 focus:outline-none text-xl placeholder-black/70 focus:border-[#FF8A00] transition-colors"
                />
                <span 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </span>
              </div>

              <div className="relative group">
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  required
                  placeholder="Confirm Password"
                  className="w-full py-3 bg-transparent border-b-2 border-gray-400 focus:outline-none text-xl placeholder-black/70 focus:border-[#FF8A00] transition-colors"
                />
              </div>

              {error && <p className="text-red-600 text-center">{error}</p>}

              <div className="flex justify-center pt-4">
                <button 
                  type="submit"
                  className="bg-[#FF8A00] text-white px-16 py-3 rounded-full text-xl transform hover:scale-105 hover:shadow-lg transition-all duration-300 active:scale-95"
                >
                  Reset Password
                </button>
              </div>
            </form>
          )}

          {/* Back to Login Link */}
          <div className="text-center mt-6">
            <button 
              onClick={() => navigate("/login")}
              className="text-black/70 text-lg hover:text-[#FF8A00] transition-colors"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 