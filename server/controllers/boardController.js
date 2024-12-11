const Board = require('../models/Board');

const createBoard = async (req, res) => {
  const { title, columns, createdBy } = req.body;
  console.log(title, columns);
  const board = new Board({ title, columns, createdBy: req.user.id });
  await board.save();
  res.status(201).json(board);
};

const getAllBoards = async (req, res) => {
  try {
    const boards = await Board.find(); // Fetch all boards
    res.json(boards);
  } catch (error) {
    console.error("Error retrieving boards:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getBoard = async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }
    res.json(board);
  } catch (error) {
    console.error("Error retrieving board:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const addCard = async (req, res) => {
  const { boardId } = req.params;
  const { columnId, content } = req.body;

  const board = await Board.findById(boardId);
  if (!board) return res.status(404).json({ message: 'Board not found' });

  const column = board.columns.id(columnId);
  if (!column) return res.status(404).json({ message: 'Column not found' });

  const card = { content, createdBy: req.user.id };
  column.cards.push(card);
  await board.save();

  // req.io.to(boardId).emit('cardAdded', card);  // Broadcast new card to all clients on board
  res.status(201).json(card);
};

const deleteCard = async (req, res) => {
  const {boardId} = req.params;
  const {columnId, commentId } = req.body; // Changed from commentId to cardId for clarity
  try {
    const board = await Board.findById(boardId);
    if (!board) return res.status(404).json({ message: 'Board not found' });
    console.log(board, columnId);
    const column = board.columns.id(columnId);
    if (!column) return res.status(404).json({ message: 'Column not found' });

    const card = column.cards.id(commentId);
    if (!card) return res.status(404).json({ message: 'Card not found' });

    column.cards.pull(card);
    await board.save();

    res.status(204).send(); // Changed to 204 No Content for successful deletion
  } catch (error) {
    res.status(500).json({ message: 'Error deleting card', error: error.message });
  }
};


const likeCard = async (req, res) =>{
  const {boardId} = req.params;
  const {columnId, commentId, userId } = req.body;
  
  try{
    const board = await Board.findById(boardId);
    if (!board) return res.status(404).json({ message: 'Board not found' });

    const column = board.columns.id(columnId);
    if (!column) return res.status(404).json({ message: 'Column not found' });

    const card = column.cards.id(commentId);
    if (!card) return res.status(404).json({ message: 'Card not found' });

    if (!card.likes.includes(userId)) {
      card.likes.push(userId);
    } else {
      return res.status(200).json({ message: 'Card already liked' });
    }

    await board.save();

    res.status(201).json(card);

  }catch(error){
    res.status(500).json({ message: 'Error Liking card', error: error.message });
  }
};

module.exports = { createBoard, addCard, getBoard, getAllBoards, deleteCard, likeCard};
