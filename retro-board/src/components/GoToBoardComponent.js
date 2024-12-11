import { Button, InputLabel, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const GoToBoardComponent = () => {

const [boardId, setBoardId] = useState('');
const navigate = useNavigate();

const goToBoard = (boardId)=>{
    navigate(`/board/${boardId}`);
}

  return (
    <div>
        <TextField id="outlined-basic" label="Board Id" variant="outlined" value={boardId} onChange={(e) => setBoardId(e.target.value)} />
        <Button variant="contained" onClick={()=>goToBoard(boardId)}>Go</Button>
    </div>
  )
}

export default GoToBoardComponent