// import { I, J, L, O, S, T, Z } from './tetrominoes.js';

// draw square
function drawSquare(x, y, color) {
  const canvas = document.getElementById('tetris');
  const context = canvas.getContext('2d');
  const scoreElement = document.getElementById('score');

  const ROW = 20;
  const COL = 20;
  // square size
  const SQ = 20;
  const VACANT = 'WHITE';

  context.fillStyle = color;
  context.fillRect(x * SQ, y * SQ, SQ, SQ);

  context.strokeStyle = 'black';
  context.strokeRect(x * SQ, y * SQ, SQ, SQ);
}
drawSquare(5, 5, 'red');
drawSquare(5, 3, 'red');
drawSquare(3, 3, 'red');
drawSquare(3, 5, 'red');
