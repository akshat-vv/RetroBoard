// src/components/ShareBoard.js

import React, { useState } from 'react';
import { Button, Container, TextField } from '@mui/material';
import { shareBoard } from '../services/api';

const ShareBoard = ({ boardId }) => {
  const [shareLink, setShareLink] = useState('');

  const handleShareBoard = async () => {
    try {
      const link = await shareBoard(boardId);
      setShareLink(link);
    } catch (error) {
      console.error("Error sharing board:", error);
    }
  };

  return (
    <Container>
      <Button variant="contained" color="primary" onClick={handleShareBoard}>
        Share Board
      </Button>
      {shareLink && (
        <div>
          <h4>Share this link:</h4>
          <TextField
            value={shareLink}
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
      )}
    </Container>
  );
};

export default ShareBoard;
