import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';

const FacilityRequest = () => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchRequests = () => {
      const storedRequests = JSON.parse(localStorage.getItem('facilityRequests') || '[]');
      setRequests(storedRequests);
    };

    fetchRequests();
    const interval = setInterval(fetchRequests, 1000); // Check for updates every second
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleApprove = (index) => {
    const updatedRequests = [...requests];
    updatedRequests[index].status = 'approved';
    localStorage.setItem('facilityRequests', JSON.stringify(updatedRequests));
    setRequests(updatedRequests);
    setMessage('Request approved successfully!');

    setTimeout(() => setMessage(''), 5000); // Clear message after 5 seconds
  };

  const handleReject = (index) => {
    const updatedRequests = [...requests];
    updatedRequests[index].status = 'rejected';
    localStorage.setItem('facilityRequests', JSON.stringify(updatedRequests));
    setRequests(updatedRequests);
    setMessage('Request rejected successfully!');

    setTimeout(() => setMessage(''), 5000); // Clear message after 5 seconds
  };

  return (
    <Container className="py-5 mx-auto max-w-4xl">
      {message && <Alert variant="success">{message}</Alert>}
      <h2 className="text-center mb-4 text-2xl font-bold">Facility Booking Requests</h2>
      <div className="overflow-x-auto">
        <Table responsive bordered hover className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Requestor Name</th>
              <th className="px-4 py-2 text-left">Facility</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((request, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{request.name}</td>
                  <td className="px-4 py-2">{request.facility}</td>
                  <td className="px-4 py-2">{request.date}</td>
                  <td className="px-4 py-2">
                    <span className={`font-bold ${request.status === 'approved' ? 'bg-green-200 text-green-800' : request.status === 'rejected' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'} rounded-full px-2 py-1`}>
                      {request.status || 'pending'}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => handleApprove(index)} 
                        disabled={request.status === 'approved' || request.status === 'rejected'}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded transition duration-200 ease-in-out shadow-md hover:shadow-lg"
                      >
                        Approve
                      </Button>
                      <Button 
                        onClick={() => handleReject(index)} 
                        disabled={request.status === 'approved' || request.status === 'rejected'}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded transition duration-200 ease-in-out shadow-md hover:shadow-lg"
                      >
                        Reject
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">No requests available</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default FacilityRequest; 