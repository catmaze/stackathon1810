import React from 'react';

const Board = () => {
  return (
    <div>
      <canvas id="tetris" />
      Score:
      <div id="score">0</div>
    </div>
  );
};

export default Board;
