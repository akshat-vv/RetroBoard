// src/services/api.js

import axios from 'axios';

const API_URL = 'http://localhost:8081/api'; // Backend server URL

// Create a new board
export const createBoard = async (boardData, token) => {
  try {
    const response = await axios.post(`${API_URL}/boards/create`, boardData, {
      headers: {
        Authorization: `Bearer ${token}`, // Passing token for authentication
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating board:", error.response?.data || error.message);
    throw error;
  }
};

// Get board details
export const getBoard = async (boardId) => {
  try {
    const response = await axios.get(`${API_URL}/boards/board/${boardId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching board:", error);
    throw error;
  }
};

export const getAllBoards = async()=>{
  try{
    const response = await axios.get(`${API_URL}/boards/allBoards`);
    return response.data;
  }catch(error){
    console.log("ERROR");
    throw error;
  }
}

// Add a comment to a board
export const addComment = async (boardId, columnId, content,  token) => {
  try {
    const response = await axios.post(
      `${API_URL}/boards/${boardId}/card`,
      { columnId, content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

export const deleteComment = async (boardId, columnId, commentId, token) => {
  try {
    const response = await axios.delete(
      `${API_URL}/boards/${boardId}/card/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { columnId, commentId },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
}

export const likeCard = async (boardId, columnId, commentId, token, userId) => {
  try {
    const response = await axios.post(
      `${API_URL}/boards/${boardId}/card/${commentId}/like`,
      { columnId, commentId, userId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error Liking comment:", error);
    throw error;
  }
};


// Share a board (For simplicity, we can share a link or use any method for sharing)
export const shareBoard = async (boardId) => {
  const boardUrl = `${API_URL}/boards/${boardId}`;
  // For simplicity, just return the URL to be shared
  return boardUrl;
};
