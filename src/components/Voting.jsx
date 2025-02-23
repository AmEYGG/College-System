import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SchoolIcon from '@mui/icons-material/School';
import ProfileMenu from './common/ProfileMenu';
import AssignmentIcon from '@mui/icons-material/Assignment';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Voting() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(localStorage.getItem('selectedPosition') || '');
  const [candidates, setCandidates] = useState([]);
  const [votedCandidate, setVotedCandidate] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [votedPositions, setVotedPositions] = useState(new Set());

  useEffect(() => {
    fetchPosts();
    fetchCandidates();
    fetchVotedPositions();
  }, [selectedPost]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPosts(response.data.data);
    } catch (err) {
      setError('Failed to fetch posts');
      console.error(err);
    }
  };

  const fetchCandidates = async () => {
    if (!selectedPost) return;
    
    try {
      setLoading(true);
      const response = await axios.get(`/api/candidates?position=${selectedPost}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCandidates(response.data.data);
    } catch (err) {
      setError('Failed to fetch candidates');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchVotedPositions = async () => {
    try {
      const response = await axios.get('/api/students/voted-positions', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setVotedPositions(new Set(response.data.votedPositions));
    } catch (err) {
      console.error('Failed to fetch voted positions:', err);
    }
  };

  const handlePostSelect = (post) => {
    setSelectedPost(post);
    localStorage.setItem('selectedPosition', post);
  };

  const handleVote = async (candidate) => {
    if (hasVoted || votedPositions.has(candidate.position)) return;

    try {
      setLoading(true);
      const response = await axios.post('/api/students/vote', {
        candidateId: candidate._id,
        position: selectedPost
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        setVotedCandidate(candidate.name);
        setHasVoted(true);
        setVotedPositions(prev => new Set([...prev, candidate.position]));
        alert(`Successfully voted for ${candidate.name}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cast vote');
      alert(err.response?.data?.message || 'Failed to cast vote');
    } finally {
      setLoading(false);
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
            {candidates.length > 0 ? (
              candidates.map((candidate, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img 
                    src={candidate.image} 
                    alt={candidate.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{candidate.name}</h3>
                    <p className="text-gray-600 mb-1">{candidate.department} - Year {candidate.collegeYear}</p>
                    <p className="text-gray-700 mt-2">{candidate.about}</p>
                    <button 
                      className={`mt-4 w-full py-2 rounded transition ${
                        votedPositions.has(candidate.position)
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                      onClick={() => handleVote(candidate)}
                      disabled={votedPositions.has(candidate.position)}
                    >
                      {votedPositions.has(candidate.position) 
                        ? 'Already Voted for this Position' 
                        : votedCandidate === candidate.name 
                          ? 'Voted' 
                          : 'Vote'
                      }
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

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}
      
      {loading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
}
