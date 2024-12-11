const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const boardRoutes = require('./routes/boardRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Function to attach Socket.IO instance to each request
function setupSocket(io) {
  app.use((req, res, next) => {
    req.io = io;  // Attach io instance to req
    next();
  });
}

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);

module.exports = { app, setupSocket };
