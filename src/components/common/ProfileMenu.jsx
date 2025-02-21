import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import { Popover, Divider } from '@mui/material';
import axios from 'axios';

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    navigate('/login');
  };

  const open = Boolean(anchorEl);

  // Fetch User Data by Role
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace 'student@example.com' with actual email stored in localStorage or state
        const email = localStorage.getItem('userEmail');  
        const response = await axios.get(`http://localhost:5000/api/users/getUserByRole?role=Student&email=${email}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <div 
        onClick={handleClick}
        className="bg-blue-500 rounded-full p-1.5 cursor-pointer hover:bg-blue-600 transition-all duration-300 hover:shadow-lg"
      >
        <AccountCircleIcon className="text-white text-2xl" />
      </div>
      
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          className: 'mt-2 rounded-xl shadow-xl'
        }}
      >
        <div className="w-80 bg-white rounded-xl">
          {/* Profile Header */}
          <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-full shadow-lg">
                <AccountCircleIcon className="text-blue-600 text-3xl" />
              </div>
              <div className="text-white">
                <h3 className="text-xl font-bold">{userData.fullName || "Student Name"}</h3>
                <p className="text-sm text-blue-100">{userData.role || "Student"}</p>
              </div>
            </div>
          </div>

          {/* User Details */}
          <div className="px-6 py-4 bg-gray-50">
            <div className="flex items-center gap-3 text-gray-600">
              <EmailIcon className="text-gray-400" />
              <span className="text-sm">{userData.email || "Student Email"}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 mt-2">
              <SchoolIcon className="text-gray-400" />
              <span className="text-sm">{userData.department || "Student Department"}</span>
            </div>
          </div>

          <Divider />

          {/* Menu Items */}
          <div className="p-3">
            <Link 
              to="/profile"
              onClick={handleClose}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              <PersonIcon className="text-blue-500" />
              <div>
                <span className="font-medium">User Profile</span>
                <p className="text-xs text-gray-500">View and edit your details</p>
              </div>
            </Link>
            
            <Link 
              to="/change-password"
              onClick={handleClose}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              <LockIcon className="text-blue-500" />
              <div>
                <span className="font-medium">Change Password</span>
                <p className="text-xs text-gray-500">Update your password</p>
              </div>
            </Link>

            <Divider className="my-2" />

            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <LogoutIcon className="text-red-500" />
              <div className="text-left">
                <span className="font-medium">Log Out</span>
                <p className="text-xs text-red-400">Sign out of your account</p>
              </div>
            </button>
          </div>
        </div>
      </Popover>
    </>
  );
}
