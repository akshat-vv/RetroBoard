// src/components/Dashboard.js
import React from 'react';
import CreateBoard from './CreateBoard'
import { Button } from '@mui/material';
import AllBoards from './AllBoards';
import GoToBoardComponent from './GoToBoardComponent';

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login';
  };

  const role = localStorage.getItem('role');
  const name = localStorage.getItem('name');

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome {name} to the Dashboard</h1>
      <p>This is a protected route and only accessible if you're logged in.</p>
      {role === 'user' && <GoToBoardComponent/>}
      {role ==='admin' && <CreateBoard />}
      {
        role === 'admin' && <AllBoards />
      }
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
