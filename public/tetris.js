// import { I, J, L, O, S, T, Z } from './tetrominoes.js';

const I = [
  [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
  [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]],
  [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]],
  [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]
];

const J = [
  [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
  [[0, 1, 1], [0, 1, 0], [0, 1, 0]],
  [[0, 0, 0], [1, 1, 1], [0, 0, 1]],
  [[0, 1, 0], [0, 1, 0], [1, 1, 0]]
];

const L = [
  [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
  [[0, 1, 0], [0, 1, 0], [0, 1, 1]],
  [[0, 0, 0], [1, 1, 1], [1, 0, 0]],
  [[1, 1, 0], [0, 1, 0], [0, 1, 0]]
];

const O = [[[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]]];

const S = [
  [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
  [[0, 1, 0], [0, 1, 1], [0, 0, 1]],
  [[0, 0, 0], [0, 1, 1], [1, 1, 0]],
  [[1, 0, 0], [1, 1, 0], [0, 1, 0]]
];

const T = [
  [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
  [[0, 1, 0], [0, 1, 1], [0, 1, 0]],
  [[0, 0, 0], [1, 1, 1], [0, 1, 0]],
  [[0, 1, 0], [1, 1, 0], [0, 1, 0]]
];

const Z = [
  [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
  [[0, 0, 1], [0, 1, 1], [0, 1, 0]],
  [[0, 0, 0], [1, 1, 0], [0, 1, 1]],
  [[0, 1, 0], [1, 1, 0], [1, 0, 0]]
];

const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

const ROW = 20;
const COL = 20;
// square size
const SQ = 20;
const VACANT = 'WHITE';
// draw square
function drawSquare(x, y, color) {
  context.fillStyle = color;
  context.fillRect(x * SQ, y * SQ, SQ, SQ);

  context.strokeStyle = 'black';
  context.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

// create board

let board = [];
for (let r = 0; r < ROW; r++) {
  board[r] = [];
  for (let c = 0; c < COL; c++) {
    board[r][c] = VACANT;
  }
}

// draw board
function drawBoard() {
  for (let r = 0; r < ROW; r++) {
    for (let c = 0; c < COL; c++) {
      drawSquare(c, r, board[r][c]);
    }
  }
}

drawBoard();

const PIECES = [
  [Z, 'red'],
  [S, 'green'],
  [T, 'yellow'],
  [O, 'blue'],
  [L, 'purple'],
  [I, 'cyan'],
  [J, 'orange']
];

class Piece {
  constructor(tetromino, color) {
    this.tetromino = tetromino;
    this.color = color;

    this.directionIndex = 0;
    this.activeTetromino = this.tetromino[this.directionIndex];

    this.x = 0;
    this.y = 0;
  }

  // draw piece on board
  draw() {
    for (let r = 0; r < this.activeTetromino.length; r++) {
      for (let c = 0; c < this.activeTetromino.length; c++) {
        if (this.activeTetromino[r][c]) {
          drawSquare(this.x + c, this.y + r, this.color);
        }
      }
    }
    // this.fill(this.color);
  }
}

let p = new Piece(PIECES[0][0], PIECES[0][1]);

p.draw();
// drawSquare(5, 3, 'red');
// drawSquare(3, 3, 'red');
// drawSquare(3, 5, 'red');
