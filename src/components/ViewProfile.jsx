import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SchoolIcon from '@mui/icons-material/School';
import ProfileMenu from './common/ProfileMenu';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function ViewProfile() {
  const user = {
    fullName: 'John Doe',
    address: '123 Main St, City, Country',
    email: 'john.doe@example.com',
    department: 'Computer Science',
    year: '3',
    div: 'A',
    phone: '123-456-7890',
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 w-full">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-white p-1.5 rounded-lg shadow-sm">
              <SchoolIcon className="text-blue-500 text-2xl" />
            </div>
            <h1 className="text-xl font-semibold text-white">Sanjivani College of Engineering</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <HomeIcon className="text-white text-xl cursor-pointer hover:text-blue-200 transition-colors" />
            </Link>
            <div className="relative">
              <NotificationsIcon className="text-white text-xl cursor-pointer hover:text-blue-200 transition-colors" />
            </div>
            <ProfileMenu />
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center gap-2 text-gray-600">
          <Link to="/dashboard" className="hover:text-blue-500">Home</Link>
          <span>/</span>
          <span className="text-black">Profile</span>
        </div>
      </div>

      {/* Profile Details */}
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-3xl font-bold mb-4 text-center text-blue-600">User Profile</h2>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300 max-w-lg mx-auto text-center">
          <AccountCircleIcon className="text-blue-500 text-6xl mb-4" />
          <table className="min-w-full text-left">
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-semibold text-gray-800"><PersonIcon className="inline mr-2" /> Full Name:</td>
                <td className="border px-4 py-2">{user.fullName}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold text-gray-800"><LocationOnIcon className="inline mr-2" /> Address:</td>
                <td className="border px-4 py-2">{user.address}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold text-gray-800"><EmailIcon className="inline mr-2" /> College Email:</td>
                <td className="border px-4 py-2">{user.email}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold text-gray-800"><BusinessIcon className="inline mr-2" /> Department:</td>
                <td className="border px-4 py-2">{user.department}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold text-gray-800"><CalendarTodayIcon className="inline mr-2" /> Year:</td>
                <td className="border px-4 py-2">{user.year}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold text-gray-800">Division:</td>
                <td className="border px-4 py-2">{user.div}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold text-gray-800"><PhoneIcon className="inline mr-2" /> Phone Number:</td>
                <td className="border px-4 py-2">{user.phone}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
