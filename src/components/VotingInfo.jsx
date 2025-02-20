import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SchoolIcon from '@mui/icons-material/School';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import ProfileMenu from './common/ProfileMenu';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function VotingInfo() {
  const [votedCandidates, setVotedCandidates] = useState(new Set());
  const [candidates, setCandidates] = useState([]);

  // Load candidates from localStorage
  useEffect(() => {
    const loadCandidates = () => {
      const savedCandidates = JSON.parse(localStorage.getItem('candidates') || '[]');
      setCandidates(savedCandidates);
    };

    // Initial load
    loadCandidates();

    // Set up interval to check for new candidates
    const interval = setInterval(loadCandidates, 1000); // Check every second

    // Clean up interval
    return () => clearInterval(interval);
  }, []);

  const handleVote = (candidateId) => {
    if (votedCandidates.has(candidateId)) {
      // Show error notification if already voted
      toast.error('You can vote only one time. Violation of the rules is not allowed here', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored"
      });
    } else {
      // Add to voted set and show success notification
      setVotedCandidates(prev => new Set([...prev, candidateId]));
      toast.success('Success. Your voting has been done successfully', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored"
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Add ToastContainer for notifications */}
      <ToastContainer />
      
      {/* Header - Made more responsive */}
      <header className="bg-gradient-to-r from-blue-200 to-blue-300 p-2 sm:p-3">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="bg-white p-1 sm:p-1.5 rounded-lg shadow-sm">
                <SchoolIcon className="text-blue-500 text-xl sm:text-2xl" />
              </div>
              <h1 className="text-sm sm:text-base font-semibold text-black">
                Sanjivani College of Engineering
              </h1>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <Link to="/dashboard">
                <HomeIcon className="text-black text-lg sm:text-xl cursor-pointer hover:text-blue-600 transition-colors" />
              </Link>
              <div className="relative">
                <NotificationsIcon className="text-black text-lg sm:text-xl cursor-pointer hover:text-blue-600 transition-colors" />
                <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-1.5 h-1.5"></span>
              </div>
              <ProfileMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb - Adjusted spacing */}
      <div className="container mx-auto px-3 py-2 sm:px-4 sm:py-4">
        <div className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base text-gray-600">
          <Link to="/dashboard" className="hover:text-blue-500">Home</Link>
          <span>/</span>
          <Link to="/election" className="hover:text-blue-500">Election</Link>
          <span>/</span>
          <span className="text-black">Voting</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-6">
        {candidates.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No candidates registered yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 max-w-7xl mx-auto">
            {candidates.map((candidate) => (
              <div 
                key={candidate.id} 
                className="bg-black rounded-lg sm:rounded-xl overflow-hidden shadow-md sm:shadow-lg 
                  transform hover:scale-102 transition-all duration-300 hover:shadow-xl max-w-xs mx-auto w-full"
              >
                {/* Image Container - Adjusted size */}
                <div className="aspect-[3/2.5] sm:aspect-[4/3] overflow-hidden relative group">
                  <img 
                    src={candidate.image}
                    alt={candidate.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/500x500?text=Candidate";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Info Section - More compact */}
                <div className="p-3 sm:p-4 text-white">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-blue-400">{candidate.name}</h3>
                  <div className="space-y-1.5">
                    <div className="flex items-center text-xs sm:text-sm">
                      <span className="text-gray-400 w-20">Department:</span>
                      <span className="ml-1 text-white">{candidate.department}</span>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm">
                      <span className="text-gray-400 w-20">College Year:</span>
                      <span className="ml-1 text-white">{candidate.collegeYear}</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-gray-400 text-xs sm:text-sm">About:</span>
                      <p className="text-gray-300 text-xs mt-1 line-clamp-2">{candidate.about}</p>
                    </div>
                  </div>

                  {/* Vote Button - More compact */}
                  <button 
                    onClick={() => handleVote(candidate.id)}
                    className={`w-full mt-3 py-2 rounded-md font-medium text-sm
                      transition-all duration-300 flex items-center justify-center gap-1.5
                      transform hover:-translate-y-0.5 active:translate-y-0
                      ${votedCandidates.has(candidate.id) 
                        ? 'bg-green-500 hover:bg-green-600 shadow-md shadow-green-500/30' 
                        : 'bg-blue-500 hover:bg-blue-600 shadow-md shadow-blue-500/30'
                      }`}
                  >
                    <HowToVoteIcon className="text-base sm:text-lg" />
                    <span>{votedCandidates.has(candidate.id) ? 'VOTED' : 'VOTE'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 