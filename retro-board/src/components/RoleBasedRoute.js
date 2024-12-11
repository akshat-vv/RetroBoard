// src/components/RoleBasedRedirect.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RoleBasedRedirect = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  useEffect(() => {
    if (token) {
      if (role === 'admin') {
        console.log("HELLo");
        navigate('/dashboard');
      } else if (role === 'user') {
        console.log('akshat')
        navigate('/dashboard');
      }
    } else {
      console.log("HERE");
      navigate('/login');
    }
  }, [navigate, token, role]);

  return null;// You can also add a loading indicator here
};

export default RoleBasedRedirect;
