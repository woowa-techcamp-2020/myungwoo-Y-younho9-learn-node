class Paddle {
  constructor() {
    this.height = 10;
    this.width = 75;
    this.x = (canvas.width - this.width) / 2;
  }

  move(rightPressed, leftPressed) {
    if (rightPressed && this.x < canvas.width - this.width) {
      this.x += 7;
    } else if (leftPressed && this.x > 0) {
      this.x -= 7;
    }
  }

  resetPosition() {
    this.x = (canvas.width - this.width) / 2;
  }
}
