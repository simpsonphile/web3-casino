class Money {
  constructor({ x, y, value }) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.dead = false;
    this.framesLeft = 40;
  }

  move() {
    if (!this.framesLeft) {
      this.dead = true;
      return;
    }

    this.x += 0.25;
    this.y -= 1;

    this.framesLeft--;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = `rgba(0,255,0, ${(1 / 40) * this.framesLeft})`;
    ctx.font = "14px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`+${this.value}`, this.x, this.y);
  }
}

export default Money;
