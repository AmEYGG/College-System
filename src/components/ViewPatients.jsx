import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SchoolIcon from '@mui/icons-material/School';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ProfileMenu from './common/ProfileMenu';

export default function ViewPatients() {
  // Sample patient data
  const patients = [
    {
      id: 1,
      name: "John Doe",
      rollNo: "24UIT1234",
      department: "Computer Engineering",
      lastVisit: "2024-03-15",
      status: "Recovered",
      severity: "low"
    },
    {
      id: 2,
      name: "Jane Smith",
      rollNo: "24UIT1235",
      department: "IT Engineering",
      lastVisit: "2024-03-16",
      status: "Under Treatment",
      severity: "medium"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-200 to-blue-300 p-3 sm:p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="bg-white p-1.5 sm:p-2 rounded-lg shadow-sm">
                <SchoolIcon className="text-blue-500 text-2xl sm:text-4xl" />
              </div>
              <h1 className="text-base sm:text-2xl font-semibold text-black">
                Sanjivani College of Engineering
              </h1>
            </div>
            
            <div className="flex items-center gap-3 sm:gap-6">
              <Link to="/doctor-dashboard">
                <HomeIcon className="text-black text-xl sm:text-2xl cursor-pointer hover:text-blue-600 transition-colors" />
              </Link>
              <div className="relative">
                <NotificationsIcon className="text-black text-xl sm:text-2xl cursor-pointer hover:text-blue-600 transition-colors" />
                <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-2 h-2"></span>
              </div>
              <ProfileMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Link to="/doctor-dashboard" className="hover:text-blue-500">Doctor Dashboard</Link>
          <span>/</span>
          <span className="text-black">View Patients</span>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <FilterListIcon />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Patients Table */}
      <div className="container mx-auto px-4 pb-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Roll No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Visit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{patient.rollNo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{patient.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{patient.lastVisit}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${patient.status === 'Recovered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 