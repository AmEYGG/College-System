import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SchoolIcon from '@mui/icons-material/School';
import ProfileMenu from './common/ProfileMenu';
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function Voting() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(localStorage.getItem('selectedPosition') || '');
  const [candidates, setCandidates] = useState([]);
  const [votedCandidate, setVotedCandidate] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    // Fetch posts from local storage
    const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    setPosts(storedPosts);

    // Fetch candidates from local storage
    const storedCandidates = JSON.parse(localStorage.getItem('candidates') || '[]');
    setCandidates(storedCandidates);
  }, []);

  const handlePostSelect = (post) => {
    setSelectedPost(post);
    localStorage.setItem('selectedPosition', post);
  };

  const handleVote = (candidate) => {
    if (!hasVoted) {
      setVotedCandidate(candidate.name);
      setHasVoted(true);
      alert(`You voted for ${candidate.name}`);
    }
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

        {/* Display the selected position in a textbox */}
        {selectedPost && (
          <div className="mb-4 flex justify-center">
            <div className="w-full max-w-md p-3 text-lg font-bold text-center bg-gray-200 border border-gray-300 rounded-lg">
              Candidates applied for: {selectedPost}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post, index) => (
            <div 
              key={index} 
              className={`bg-white p-4 rounded-lg shadow-md cursor-pointer transition
                ${selectedPost === post ? 'bg-blue-100 border-2 border-blue-500' : 'hover:bg-gray-100'}`}
              onClick={() => handlePostSelect(post)}
            >
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {candidates.filter(candidate => candidate.position === selectedPost).length > 0 ? (
              candidates
                .filter(candidate => candidate.position === selectedPost)
                .map((candidate, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img 
                      src={candidate.image} 
                      alt={candidate.name} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{candidate.name}</h3>
                      <p className="text-gray-600 mb-1">{candidate.department} - Year {candidate.collegeYear}</p>
                      <p className="text-gray-700 mt-2">{candidate.description}</p>
                      <button 
                        className={`mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition 
                          ${hasVoted ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => handleVote(candidate)}
                        disabled={hasVoted}
                      >
                        {votedCandidate === candidate.name ? 'Voted' : 'Vote'}
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              <div className="col-span-full text-center text-gray-600 py-8">
                No candidates available for this post.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
