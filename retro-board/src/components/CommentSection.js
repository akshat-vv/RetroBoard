// src/components/CommentSection.js

import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { addComment } from '../services/api';

const CommentSection = ({ boardId, token, columnId }) => {
  const [comment, setComment] = useState('');

  const handleAddComment = async () => {
    if (!comment) return;

    try {
      await addComment(boardId, comment, token);
      setComment('');
      // Optionally, fetch the updated board comments
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div>
      <TextField
        label="Add Comment"
        variant="outlined"
        fullWidth
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddComment}
        fullWidth
      >
        Add Comment
      </Button>
    </div>
  );
};

export default CommentSection;
