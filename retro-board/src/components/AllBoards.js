import React, { useEffect, useState } from 'react';
import { getAllBoards } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AllBoards = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllBoard = async () => {
      try {
        const boardData = await getAllBoards();
        setBoards(boardData); // Assuming the response is the boards array
        setLoading(false);
      } catch (error) {
        console.error("Error fetching boards:", error);
        setError("Error fetching boards");
        setLoading(false);
      }
    };

    fetchAllBoard();
  }, []);

  const navigateToBoard = (id) => {
    console.log("ID", id);
    navigate(`/board/${id}`);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>All Boards</h2>
      <ul>
        {boards.map((board) => (
          <li key={board._id} onClick={()=>navigateToBoard(board._id)}>
            {board.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllBoards;
