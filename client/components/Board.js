import React from 'react';

// import drawSquare from './tetris';

const Board = () => {
  return (
    <div>
      <canvas id="tetris" />
      Score:
      <div id="score">0</div>
    </div>
  );
};

function drawSquare(x, y, color) {
  const canvas = document.getElementById('tetris');
  const context = canvas.getContext('2d');
  const scoreElement = document.getElementById('score');

  const row = 20;
  const col = 20;
  const squareSize = 20;
  const vacant = 'white';

  context.fillStyle = color;
  context.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);

  context.strokeStyle = 'black';
  context.strokeRect(x * squareSize, y * squareSize, squareSize, squareSize);
}
drawSquare(1, 1, 'black');
export default Board;
