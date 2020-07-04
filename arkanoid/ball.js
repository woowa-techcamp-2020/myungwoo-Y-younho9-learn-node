class Ball {
  constructor({ speed, size }) {
    this.x = canvas.width / 2;
    this.y = canvas.height - 30;
    this.dx = speed;
    this.dy = -speed;
    this.speed = speed;
    this.radius = size;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  isHitWall() {
    return (
      this.x + this.dx > canvas.width - this.radius ||
      this.x + this.dx < this.radius
    );
  }

  isHitCeiling() {
    return this.y + this.dy < this.radius;
  }

  isHitFloor() {
    return this.y + this.dy > canvas.height - this.radius;
  }

  isHitPaddle(paddle) {
    return this.x > paddle.x && this.x < paddle.x + paddle.width;
  }

  reflectX() {
    this.dx = -this.dx;
  }

  reflectY() {
    this.dy = -this.dy;
  }

  resetPosition() {
    this.x = canvas.width / 2;
    this.y = canvas.height - 30;
  }

  speedUp() {
    this.speed++;
    this.dx = this.speed;
    this.dy = -this.speed;
  }
}
