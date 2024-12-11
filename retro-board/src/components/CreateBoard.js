// src/components/CreateBoard.js

import React, { useState } from 'react';
import { TextField, Button, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createBoard } from '../services/api';

const CreateBoard = () => {
  const [boardTitle, setBoardTitle] = useState('');
  const [columns, setColumns] = useState('');
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleCreateBoard = async () => {
    if (!boardTitle || !columns) {
      setMessage('All fields are required');
      return;
    }

    const boardData = {
      title: boardTitle,
      columns: columns.split(',').map((col) => {
        return {
          title: col,
          cards: []
        }
      }),
    };

    try {
      const newBoard = await createBoard(boardData, token);
      setMessage(`Board created successfully! Board ID: ${newBoard._id}`);
      navigate(`/board/${newBoard._id}`);
    } catch (error) {
      setMessage('Error creating board. Try again later.');
    }
  };

  return (
    <Container>
      <h2>Create a New Board</h2>
      <TextField
        label="Board Title"
        variant="outlined"
        fullWidth
        value={boardTitle}
        onChange={(e) => setBoardTitle(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Columns (comma-separated)"
        variant="outlined"
        fullWidth
        value={columns}
        onChange={(e) => setColumns(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateBoard}
        fullWidth
      >
        Create Board
      </Button>
      {message && <p>{message}</p>}
    </Container>
  );
};

export default CreateBoard;
