class Bucket {
  constructor({ x, y, w, h, c, text }) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
    this.text = text;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.c;
    ctx.fillStyle = this.c;
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.stroke();
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${this.text}x`, this.x + this.w / 2, this.y + this.h / 2);
  }
}

export default Bucket;
