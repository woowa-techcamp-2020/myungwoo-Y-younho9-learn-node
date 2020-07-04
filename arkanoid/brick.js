class Brick {
  constructor({ x = 0, y = 0, status = 1 }) {
    this.x = x;
    this.y = y;
    this.status = status;
    this.width = 75;
    this.height = 20;
    this.padding = 10;
    this.offsetTop = 30;
    this.offsetLeft = 30;
  }

  detectCollision(ball) {
    if (this.status == 1) {
      if (
        ball.x > this.x &&
        ball.x < this.x + this.width &&
        ball.y > this.y &&
        ball.y < this.y + this.height
      ) {
        ball.dy = -ball.dy;
        this.status = 0;
        return true;
      }
      return false;
    }
  }
}
