// import { I, J, L, O, S, T, Z } from './tetrominoes';

// draw square
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
drawSquare(1, 1, 'red');
