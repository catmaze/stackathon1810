/* eslint-disable complexity */
// import { I, J, L, O, S, T, Z } from './tetrominoes.js';

// pieces

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
  [[0, 1, 0], [0, 1, 1], [0, 0, 1]]
];
const T = [
  [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
  [[0, 1, 0], [0, 1, 1], [0, 1, 0]],
  [[0, 0, 0], [1, 1, 1], [0, 1, 0]],
  [[0, 1, 0], [1, 1, 0], [0, 1, 0]]
];
const Z = [
  [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
  [[0, 0, 1], [0, 1, 1], [0, 1, 0]]
];
const PIECES = [
  [Z, 'purple'],
  [S, 'purple'],
  [T, 'purple'],
  [O, 'purple'],
  [L, 'purple'],
  [I, 'purple'],
  [J, 'purple']
];
// const PIECES = [
//   [Z, 'red'],
//   [S, 'green'],
//   [T, 'yellow'],
//   [O, 'blue'],
//   [L, 'purple'],
//   [I, 'cyan'],
//   [J, 'orange']
// ];
const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const speedElement = document.getElementById('speed');

let gameOver = false;
let p;
let score = 0;
const ROW = 20;
const COL = 10;
const SQ = 20;
const VACANT = 'WHITE';

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

class Piece {
  constructor(tetromino, color) {
    this.tetromino = tetromino;
    this.color = color;

    this.directionIndex = 0;
    this.activeTetromino = this.tetromino[this.directionIndex];

    this.x = 3;
    this.y = -2;
    this.gravity = 0.2;
  }

  // draw piece on board
  draw() {
    this.fill(this.color);
  }

  unDraw() {
    this.fill(VACANT);
  }

  fill(color) {
    for (let r = 0; r < this.activeTetromino.length; r++) {
      for (let c = 0; c < this.activeTetromino.length; c++) {
        if (this.activeTetromino[r][c]) {
          drawSquare(this.x + c, this.y + r, color);
        }
      }
    }
  }

  // move piece right
  moveRight() {
    if (!this.collision(1, 0, this.activeTetromino)) {
      this.unDraw();
      this.x++;
      this.draw();
    }
  }

  // move piece left
  moveLeft() {
    if (!this.collision(-1, 0, this.activeTetromino)) {
      this.unDraw();
      this.x--;
      this.draw();
    }
  }

  // move piece down
  moveDown() {
    if (!this.collision(0, 1, this.activeTetromino)) {
      this.unDraw();
      this.y++;
      this.draw();
    } else {
      this.lock();
      p = randomPiece();
    }
  }

  // rotate
  rotate() {
    let nextPattern = this.tetromino[
      (this.directionIndex + 1) % this.tetromino.length
    ];
    let kick = 0;

    if (this.collision(0, 0, nextPattern)) {
      if (this.x > COL / 2) {
        // hit right wall
        kick = -1;
      } else {
        // left wall
        kick = 1;
      }
    }

    if (!this.collision(kick, 0, nextPattern)) {
      this.unDraw();
      this.x += kick;
      this.directionIndex = (this.directionIndex + 1) % this.tetromino.length;
      this.activeTetromino = this.tetromino[this.directionIndex];
      this.draw();
    }
  }

  collision(x, y, piece) {
    for (let r = 0; r < piece.length; r++) {
      for (let c = 0; c < piece.length; c++) {
        // if empty, skip
        if (!piece[r][c]) {
          continue;
        }
        let newX = this.x + c + x;
        let newY = this.y + r + y;

        if (newX < 0 || newX >= COL || newY >= ROW) {
          return true;
        }
        if (newY < 0) {
          continue;
        }
        if (board[newY][newX] != VACANT) {
          return true;
        }
      }
    }
    return false;
  }

  lock() {
    for (let r = 0; r < this.activeTetromino.length; r++) {
      for (let c = 0; c < this.activeTetromino.length; c++) {
        if (!this.activeTetromino[r][c]) {
          continue;
        }
        // game over
        if (this.y + r < 0) {
          gameOver = true;
          document.getElementsByTagName("BODY")[0].style.backgroundColor = "red";
          document.getElementById("canvas-container").style.display = "none";
          document.getElementById('instructions').textContent = ''
          document.getElementById('speed-label').textContent = 'Max speed reached: '
          break;
        }
        board[this.y + r][this.x + c] = this.color;
      }
    }

    //remove full rows
    for (let r = 0; r < ROW; r++) {
      let isRowFull = true;
      for (let c = 0; c < COL; c++) {
        isRowFull = isRowFull && board[r][c] != VACANT;
      }
      if (isRowFull) {
        // if row full, move above rows down
        for (let y = r; y > 1; y--) {
          for (let c = 0; c < COL; c++) {
            board[y][c] = board[y - 1][c];
          }
        }

        // top row board[0][...] has not row above it
        for (let c = 0; c < COL; c++) {
          board[0][c] = VACANT;
        }
        score += 10;
      }
    }
    // update board
    drawBoard();
    scoreElement.innerHTML = `Score: ${score}`;
  }
  dropSpeed(score) {
    if(score < 10) {
      speedElement.textContent= '10 Km/h';
      return 300
    } else if (score < 20 ) {
      speedElement.textContent= '15 Km/h';
      return 200
    } else if (score < 30) {
      speedElement.textContent= '30 Km/h';
      return 100
    } else if (score < 40) {
      speedElement.textContent= '60 Km/h';
      return 50
    } else if (score < 50 ){
      speedElement.textContent= "It's over 5000!!!!";
      return 20
    }
  }
}

function randomPiece() {
  let r = Math.floor(Math.random() * PIECES.length); // 0 -> 6
  return new Piece(PIECES[r][0], PIECES[r][1]);
}

p = randomPiece();

p.draw();

// keyboard controls

document.addEventListener('keydown', CONTROL);

// mobile controls
// assumes desktop first
if (typeof window.orientationSensor === 'undefined') {
  document.getElementById('web-instructions').style.display = 'block';
} else {
  // if mobile
  document.getElementById('mobile-controls').style.display = 'block';
  document.getElementById('move-d').addEventListener('mousedown', () => p.moveDown())
  document.getElementById('move-l').addEventListener('mousedown', () => p.moveLeft())
  document.getElementById('move-r').addEventListener('mousedown', () => p.moveRight())
  document.getElementById('rotate').addEventListener('mousedown', () => p.rotate())
}

let dropStart = Date.now();

function drop() {
  let now = Date.now();
  let delta = now - dropStart;
  if (delta > p.dropSpeed(score)) {
    p.moveDown();
    dropStart = Date.now();
  }
  if (!gameOver) {
    requestAnimationFrame(drop);
  }
}

function CONTROL(event) {
  if (event.keyCode === 37) {
    p.moveLeft();
    dropStart = Date.now();
  } else if (event.keyCode === 38) {
    p.rotate();
    dropStart = Date.now();
  } else if (event.keyCode === 39) {
    p.moveRight();
    dropStart = Date.now();
  } else if (event.keyCode === 40) {
    p.moveDown();
  }
}
drop();
