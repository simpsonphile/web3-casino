import Particle from "./Particle";

class Ball {
  constructor({ x, y, dxs, dxy, payout }) {
    this.dxs = dxs;
    this.movesLeft = this.dxs.length;
    this.dxy = dxy;
    this.payout = payout;

    this.particle = new Particle({
      x,
      y,
      r: 10,
      hasGradient: true,
      c1: "#E56399",
      c2: "#ea116c",
    });
  }

  move() {
    if (this.movesLeft <= 0) {
      this.dead = true;
      return;
    }
    this.particle.updateX(this.dxs.shift());
    this.particle.updateY(this.dxy.shift());
    this.movesLeft -= 1;
  }

  draw(ctx) {
    this.particle.draw(ctx);
  }
}

export default Ball;
