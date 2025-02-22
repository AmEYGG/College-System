import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SchoolIcon from '@mui/icons-material/School';
import ProfileMenu from './common/ProfileMenu';
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function Voting() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    // Fetch posts and candidates from localStorage or API
    const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    setPosts(storedPosts);
  }, []);

  const handlePostSelect = (post) => {
    setSelectedPost(post);
    const storedCandidates = JSON.parse(localStorage.getItem('candidates') || '[]');
    const filteredCandidates = storedCandidates.filter(candidate => candidate.post === post);
    setCandidates(filteredCandidates);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
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
          <span className="text-black">Voting</span>
        </div>
      </div>

      {/* Posts Selection */}
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Select a Post to Vote</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md cursor-pointer" onClick={() => handlePostSelect(post)}>
              <AssignmentIcon className="text-blue-500 text-2xl mb-2" />
              <h3 className="text-lg font-semibold">{post}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Candidates Section */}
      {selectedPost && (
        <div className="container mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Candidates for {selectedPost}</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2">Candidates:</h3>
            {candidates.length > 0 ? (
              candidates.map((candidate, index) => (
                <div key={index} className="border-b py-2">
                  <h4 className="font-semibold">{candidate.name}</h4>
                  <p>{candidate.description}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No candidates available for this post.</p>
            )}
          </div>
          <hr className="my-4" />
          <h3 className="text-lg font-bold text-center">Other Candidates</h3>
          <div className="bg-white p-6 rounded-lg shadow-md">
            {candidates.length > 0 ? (
              candidates.map((candidate, index) => (
                <div key={index} className="border-b py-2">
                  <h4 className="font-semibold">{candidate.name}</h4>
                  <p>{candidate.description}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No other candidates available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 