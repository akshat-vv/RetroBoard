const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { app, setupSocket } = require('./app');

dotenv.config();
connectDB();

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Setup Socket.IO and attach it to the app
setupSocket(io);

server.listen(process.env.PORT || 8081, () => {
  console.log(`Server running on port ${process.env.PORT || 8081}`);
});
