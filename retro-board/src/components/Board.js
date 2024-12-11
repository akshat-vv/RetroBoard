import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteComment, getBoard, likeCard } from '../services/api';
import './Board.css';
import AddComment from './AddComment';
import { Button } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const Board = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const token = localStorage.getItem('token');
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [myColumn, setColumn] = useState("");
  const userId = localStorage.getItem('userId');

  const fetchBoard = async () => {
    try {
      const fetchedBoard = await getBoard(boardId);
      setBoard(fetchedBoard);
    } catch (error) {
      console.error('Error fetching board:', error);
    }
  };
  
  useEffect(() => {
    fetchBoard();
  }, [boardId]);

  const handleAddButtonClick = (columnId) => {
    setColumn(columnId);
    setShowCommentSection(true);
  };

  // Handle adding a new comment and updating the board state
  const handleNewComment = (newComment) => {
    // setBoard((prevBoard) => {
    //   const updatedColumns = prevBoard.columns.map((column) => {
    //     if (column._id === myColumn) {
    //       return { ...column, cards: [...column.cards, newComment] };
    //     }
    //     return column;
    //   });
    //   return { ...prevBoard, columns: updatedColumns };
    // });
    // setShowCommentSection(false); // Hide the comment input section after adding
    fetchBoard();
  };

  const handleDeleteButton = async (columnId, cardId) => {
    await deleteComment(boardId, columnId, cardId, token);
    setTimeout(()=>{
      fetchBoard()
    },500)
  }

  const handleLikeButton = async (columnId, cardId) =>{
    await likeCard(boardId, columnId, cardId, token, userId);
    setTimeout(()=>{
      fetchBoard()
    },500)
  }

  if (!board) return <div>Loading...</div>;

  return (
    <div className="board">
      <div onClick={()=>window.history.back()}>
        Back
      </div>
      <h2>{board.title}</h2>
      <div className="columns">
        {board.columns.map((column, index) => (
          <div key={index} className="column">
            <h3>{column.title}</h3>
            <AddComment
                boardId={boardId}
                columnId={column._id}
                onCommentAdded={handleNewComment}
            />
            {column.cards.map((card, cardIndex) => (
              <div className='cardContainer'>
              <div key={cardIndex} className="card">
                {card.content} 
                <div>
                <FavoriteBorderOutlinedIcon onClick={()=>handleLikeButton(column._id,card._id)}/>
                  {card.likes.length}
                </div>

              </div>
              <Button onClick={()=>handleDeleteButton(column._id,card._id)}>Delete</Button>
              <Button variant="contained" >Like</Button>
              </div>
            ))}
            {/* <button className="add-card-btn" onClick={() => handleAddButtonClick(column._id)}>
              + Add Card
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
