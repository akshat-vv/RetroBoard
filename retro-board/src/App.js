// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Board from "./components/Board";
import RoleBasedRedirect from "./components/RoleBasedRoute";
import { isTokenExpired } from './utils/auth';
import { useEffect } from 'react';
import UserDashboard from "./components/UserDashboard";

function App() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (isTokenExpired(token)) {
  //     localStorage.removeItem('token'); // Clear the expired token
  //     navigate("/login", { replace: true }); // Redirect to login page
  //   }
  // }, [navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protect the dashboard route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="admin">
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/userDashboard"
        element={
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/board/:boardId"
        element={
          <ProtectedRoute role="user">
            <Board />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<RoleBasedRedirect />} />
    </Routes>
  );
}

export default App;
