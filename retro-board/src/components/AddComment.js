import React, { useState } from 'react';
import { addComment } from '../services/api';

const AddComment = ({ boardId, columnId, onCommentAdded }) => {
  const [comment, setComment] = useState('');

  const token = localStorage.getItem('token');

  const handleAdd = async () => {
    if (!comment) return;

    try {
      // Add comment and get the response back
      const commentData = await addComment(boardId, columnId, comment, token);
      
      // Clear the comment input field
      setComment('');

      // Notify parent about the new comment
      onCommentAdded(commentData);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default AddComment;
