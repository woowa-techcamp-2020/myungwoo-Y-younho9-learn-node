class Game {
  constructor({
    score = 0,
    lives = 3,
    brickOpt = { row: 5, column: 3 },
    ballOpt = { speed: 2, size: 10 },
  }) {
    this.rightPressed = false;
    this.leftPressed = false;
    this.brickRowCount = brickOpt.row;
    this.brickColumnCount = brickOpt.column;
    this.score = score;
    this.lives = lives;
    this.ballOpt = ballOpt;
    this.ball = new Ball(ballOpt);
    this.paddle = new Paddle();
    this.bricks = this.buildBricks();
    this.addHandlers();
  }

  buildBricks() {
    const bricks = [];
    for (let c = 0; c < this.brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < this.brickRowCount; r++) {
        bricks[c][r] = new Brick({ x: 0, y: 0, status: 1 });
      }
    }
    return bricks;
  }

  addHandlers() {
    document.addEventListener('keydown', keyDownHandler.bind(this), false);
    document.addEventListener('keyup', keyUpHandler.bind(this), false);
    document.addEventListener('mousemove', mouseMoveHandler.bind(this), false);

    function keyDownHandler(e) {
      if (e.key == 'Right' || e.key == 'ArrowRight') {
        this.rightPressed = true;
      } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        this.leftPressed = true;
      }
    }

    function keyUpHandler(e) {
      if (e.key == 'Right' || e.key == 'ArrowRight') {
        this.rightPressed = false;
      } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        this.leftPressed = false;
      }
    }

    function mouseMoveHandler(e) {
      let relativeX = e.clientX - canvas.offsetLeft;
      if (relativeX > 0 && relativeX < canvas.width) {
        this.paddle.x = relativeX - this.paddle.width / 2;
      }
    }
  }

  collisionDetection() {
    for (let c = 0; c < this.brickColumnCount; c++) {
      for (let r = 0; r < this.brickRowCount; r++) {
        let hit = this.bricks[c][r].detectCollision(this.ball);
        if (hit) {
          this.score++;
          if (this.score == this.brickRowCount * this.brickColumnCount) {
            alert('YOU WIN, CONGRATS!');
            document.location.reload();
          }
        }
      }
    }
  }

  drawBall() {
    ctx.beginPath();
    ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
    this.ball.move();
  }

  drawPaddle() {
    ctx.beginPath();
    ctx.rect(
      this.paddle.x,
      canvas.height - this.paddle.height,
      this.paddle.width,
      this.paddle.height,
    );
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
    this.paddle.move(this.rightPressed, this.leftPressed);
  }

  drawBricks() {
    for (let c = 0; c < this.brickColumnCount; c++) {
      for (let r = 0; r < this.brickRowCount; r++) {
        let brick = this.bricks[c][r];
        if (brick.status == 1) {
          brick.x = r * (brick.width + brick.padding) + brick.offsetLeft;
          brick.y = c * (brick.height + brick.padding) + brick.offsetTop;
          ctx.beginPath();
          ctx.rect(brick.x, brick.y, brick.width, brick.height);
          ctx.fillStyle = '#0095DD';
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('Score: ' + this.score, 8, 20);
  }

  drawLives() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('Lives: ' + this.lives, canvas.width - 65, 20);
  }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawBricks();
    this.drawBall();
    this.drawPaddle();
    this.drawScore();
    this.drawLives();
    this.collisionDetection();

    if (this.ball.isHitWall()) {
      this.ball.reflectX();
    }
    if (this.ball.isHitCeiling()) {
      this.ball.reflectY();
    }
    if (this.ball.isHitFloor()) {
      if (this.ball.isHitPaddle(this.paddle)) {
        this.ball.reflectY();
      } else {
        this.lives--;
        if (!this.lives) {
          alert('GAME OVER');
          document.location.reload();
        } else {
          this.ball.resetPosition();
          this.ball.speedUp();
          this.paddle.resetPosition();
        }
      }
    }

    requestAnimationFrame(() => this.draw());
  }
}
