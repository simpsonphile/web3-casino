import Particle from "./Particle";

class Ball extends Particle {
  constructor({ x, y, r, targetX, targetY, payout, onFinish, onStep }) {
    super({ x, y, r, hasGradient: true, c1: "#E56399", c2: "#ea116c" });
    this.vx = 0;
    this.vy = 0;
    this.targetX = targetX;
    this.targetY = targetY;
    this.payout = payout;
    this.onFinish = onFinish;
    this.onStep = onStep;
  }

  move() {
    if (this.y >= this.targetY) {
      this.onFinish(this);
      return;
    }

    this.x += this.vx;
    this.y += this.vy;

    this.onStep(this);
  }
}

export default Ball;
