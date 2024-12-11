function setupSocket(io) {
    io.on('connection', (socket) => {
      console.log('User connected:', socket.id);
  
      socket.on('joinBoard', (boardId) => {
        socket.join(boardId);
      });
  
      socket.on('leaveBoard', (boardId) => {
        socket.leave(boardId);
      });
  
      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });
  }
  
  module.exports = { setupSocket };
  