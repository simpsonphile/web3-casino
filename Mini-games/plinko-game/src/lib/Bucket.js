import gsap from "gsap";

class Bucket {
  constructor({ x, y, w, h, c, text }) {
    this.x = x;
    this.y = y;
    this.baseY = y;
    this.dropY = y + 10;
    this.w = w;
    this.h = h;
    this.c = c;
    this.text = text;
  }

  setHit() {
    if (this.hit) return;
    this.hit = true;
    gsap.fromTo(
      this,
      { y: this.y },
      {
        y: this.dropY,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
        onComplete: () => {
          this.y = this.baseY;
          this.hit = false;
        },
      }
    );
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.c;
    ctx.fillStyle = this.c;
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.stroke();
    // ctx.closePath();
    ctx.font = "12px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${this.text}x`, this.x + this.w / 2, this.y + this.h / 2);
  }
}

export default Bucket;
