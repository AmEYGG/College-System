import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EventIcon from '@mui/icons-material/Event';
import SubjectIcon from '@mui/icons-material/Subject';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import MedicationIcon from '@mui/icons-material/Medication';

export default function HealthForm() {
  const [formData, setFormData] = useState({
    studentName: '',
    classDiv: '',
    rollNo: '',
    mobileNo: '',
    reportDate: '',
    symptoms: '',
    temperature: '',
    currentMedication: '',
    previousHistory: '',
    emergencyContact: '',
    hostelStudent: 'no',
    consultedDoctor: 'no',
    severity: 'mild'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 flex flex-col">
      {/* Header */}
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
                <NotificationsIcon className="text-black text-xl cursor-pointer hover:text-blue-600 transition-colors" />
                <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-1.5 h-1.5"></span>
              </div>
              <div className="bg-blue-500 rounded-full p-1 cursor-pointer hover:bg-blue-600 transition-colors">
                <AccountCircleIcon className="text-white text-xl" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Link to="/dashboard" className="hover:text-blue-500">Home</Link>
          <span>/</span>
          <Link to="/application" className="hover:text-blue-500">Applications</Link>
          <span>/</span>
          <span className="text-black">Health Report</span>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-5">
            <h2 className="text-2xl font-bold text-white text-center tracking-wide">
              Student Health Report Form
            </h2>
            <p className="text-red-100 text-center mt-1 text-sm">
              This form will be sent to your class coordinator
            </p>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Basic Details Section */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative group">
                  <PersonIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-red-600 text-xl" />
                  <input
                    type="text"
                    name="studentName"
                    placeholder="Full Name"
                    value={formData.studentName}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl
                      focus:outline-none focus:border-red-500 transition-colors
                      hover:border-red-400 text-gray-700"
                    required
                  />
                </div>
                <div className="relative group">
                  <input
                    type="text"
                    name="classDiv"
                    placeholder="Class/Division"
                    value={formData.classDiv}
                    onChange={handleChange}
                    className="w-full pl-4 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl
                      focus:outline-none focus:border-red-500 transition-colors
                      hover:border-red-400 text-gray-700"
                    required
                  />
                </div>
              </div>

              {/* Roll No and Mobile */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="rollNo"
                  placeholder="Roll Number"
                  value={formData.rollNo}
                  onChange={handleChange}
                  className="w-full pl-4 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl
                    focus:outline-none focus:border-red-500 transition-colors
                    hover:border-red-400 text-gray-700"
                  required
                />
                <input
                  type="tel"
                  name="mobileNo"
                  placeholder="Mobile Number"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  className="w-full pl-4 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl
                    focus:outline-none focus:border-red-500 transition-colors
                    hover:border-red-400 text-gray-700"
                  required
                />
              </div>

              {/* Report Date */}
              <div className="relative group">
                <EventIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-red-600 text-xl" />
                <input
                  type="date"
                  name="reportDate"
                  value={formData.reportDate}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl
                    focus:outline-none focus:border-red-500 transition-colors
                    hover:border-red-400 text-gray-700"
                  required
                />
              </div>

              {/* Symptoms */}
              <div className="relative group">
                <LocalHospitalIcon className="absolute left-3 top-4 text-red-600 text-xl" />
                <textarea
                  name="symptoms"
                  placeholder="Describe your symptoms in detail"
                  value={formData.symptoms}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl
                    focus:outline-none focus:border-red-500 transition-colors
                    hover:border-red-400 text-gray-700 resize-none h-24"
                  required
                />
              </div>

              {/* Temperature and Current Medication */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative group">
                  <ThermostatIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-red-600 text-xl" />
                  <input
                    type="text"
                    name="temperature"
                    placeholder="Body Temperature"
                    value={formData.temperature}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl
                      focus:outline-none focus:border-red-500 transition-colors
                      hover:border-red-400 text-gray-700"
                  />
                </div>
                <div className="relative group">
                  <MedicationIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-red-600 text-xl" />
                  <input
                    type="text"
                    name="currentMedication"
                    placeholder="Current Medication"
                    value={formData.currentMedication}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl
                      focus:outline-none focus:border-red-500 transition-colors
                      hover:border-red-400 text-gray-700"
                  />
                </div>
              </div>

              {/* Previous Medical History */}
              <div className="relative group">
                <SubjectIcon className="absolute left-3 top-4 text-red-600 text-xl" />
                <textarea
                  name="previousHistory"
                  placeholder="Any previous medical history (if applicable)"
                  value={formData.previousHistory}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl
                    focus:outline-none focus:border-red-500 transition-colors
                    hover:border-red-400 text-gray-700 resize-none h-20"
                />
              </div>

              {/* Emergency Contact */}
              <div className="relative group">
                <input
                  type="tel"
                  name="emergencyContact"
                  placeholder="Emergency Contact Number"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  className="w-full pl-4 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl
                    focus:outline-none focus:border-red-500 transition-colors
                    hover:border-red-400 text-gray-700"
                  required
                />
              </div>

              {/* Radio Options */}
              <div className="space-y-4">
                {/* Hostel Student */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium">Are you a hostel student?</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hostelStudent"
                        value="yes"
                        checked={formData.hostelStudent === 'yes'}
                        onChange={handleChange}
                        className="form-radio text-red-600 focus:ring-red-500"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hostelStudent"
                        value="no"
                        checked={formData.hostelStudent === 'no'}
                        onChange={handleChange}
                        className="form-radio text-red-600 focus:ring-red-500"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                {/* Consulted Doctor */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium">Have you consulted a doctor?</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="consultedDoctor"
                        value="yes"
                        checked={formData.consultedDoctor === 'yes'}
                        onChange={handleChange}
                        className="form-radio text-red-600 focus:ring-red-500"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="consultedDoctor"
                        value="no"
                        checked={formData.consultedDoctor === 'no'}
                        onChange={handleChange}
                        className="form-radio text-red-600 focus:ring-red-500"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                {/* Severity Level */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium">Severity Level</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="severity"
                        value="mild"
                        checked={formData.severity === 'mild'}
                        onChange={handleChange}
                        className="form-radio text-yellow-500 focus:ring-yellow-500"
                      />
                      <span>Mild</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="severity"
                        value="moderate"
                        checked={formData.severity === 'moderate'}
                        onChange={handleChange}
                        className="form-radio text-orange-500 focus:ring-orange-500"
                      />
                      <span>Moderate</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="severity"
                        value="severe"
                        checked={formData.severity === 'severe'}
                        onChange={handleChange}
                        className="form-radio text-red-600 focus:ring-red-500"
                      />
                      <span>Severe</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-xl text-lg font-semibold
                    hover:from-red-700 hover:to-red-800 transform hover:-translate-y-0.5 transition-all duration-150
                    focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 
                    shadow-lg hover:shadow-xl active:shadow-md"
                >
                  Submit Health Report
                </button>
              </div>
            </form>

            {/* Additional Information */}
            <div className="mt-6 text-center space-y-2">
              <div className="bg-red-50 rounded-xl p-4 text-sm text-red-600">
                <p className="font-medium">Important Note:</p>
                <p>Your class coordinator will be notified immediately.</p>
                <p>Please ensure all medical details are accurate.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 