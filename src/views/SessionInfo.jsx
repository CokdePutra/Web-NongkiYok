import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/session', {
      method: 'GET',
      credentials: 'include', // Mengizinkan pengiriman cookies dengan permintaan
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Not authorized');
      })
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching session:', error));
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.username}!</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Dashboard;
