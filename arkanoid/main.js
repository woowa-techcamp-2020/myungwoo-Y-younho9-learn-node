const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const option = {
  score: 0,
  lives: 3,
  brickOpt: { row: 11, column: 15 },
  ballOpt: { speed: 8, size: 10 },
};

const game = new Game(option);
game.draw();
