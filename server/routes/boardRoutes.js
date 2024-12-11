const express = require('express');
const { createBoard, addCard, getBoard, getAllBoards, deleteCard, likeCard } = require('../controllers/boardController');
const { authenticate, authorizeRole } = require('../middlewares/authMiddleware');
const router = express.Router();

// Create board - admin only
router.post('/create', authenticate, authorizeRole('admin'), createBoard);

router.get('/board/:boardId', getBoard );

router.get('/allBoards', getAllBoards);

// Add card - for authenticated users
router.post('/:boardId/card', authenticate, addCard);

router.delete('/:boardId/card/:cardId', deleteCard)

router.post('/:boardId/card/:cardId/like', authenticate, likeCard);

module.exports = router;
