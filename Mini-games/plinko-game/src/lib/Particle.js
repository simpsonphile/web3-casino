class Particle {
  constructor({ x, y, r, c, c1, c2, hasGradient }) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
    this.c1 = c1;
    this.c2 = c2;
    this.hasGradient = hasGradient;
  }

  updateX = (x) => {
    this.x = x;
  };

  updateY = (y) => {
    this.y = y;
  };

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);

    if (this.hasGradient) {
      const gradient = ctx.createRadialGradient(
        this.x,
        this.y,
        2,
        this.x,
        this.y,
        this.r
      );
      gradient.addColorStop(0, this.c1);
      gradient.addColorStop(1, this.c2);
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = this.c;
    }
    ctx.fill();
  }
}

export default Particle;
