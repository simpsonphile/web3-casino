import gsap from "gsap";

class Bucket {
  constructor({ x, y, w, h, c, text }) {
    this.x = x;
    this.y = y;
    this.baseY = y;
    this.dropY = y + 10;
    this.moveInX = x + w + 10;
    this.w = w;
    this.h = h;
    this.c = c;
    this.text = text;
  }

  animateHit() {
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

  moveIn() {
    gsap.fromTo(
      this,
      { x: this.x },
      {
        x: this.moveInX,
        duration: 0.1,
        ease: "power1.inOut",
        onComplete: () => {
          this.moveIn = false;
        },
      }
    );
  }

  animateNewY(y) {
    gsap.to(this, {
      y: y,
      duration: 0.1,
      delay: 0.05,
      ease: "power1.inOut",
      onComplete: () => {
        this.y = y;
      },
    });
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.c;
    ctx.fillStyle = this.c;
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.stroke();
    ctx.font = "12px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${this.text}x`, this.x + this.w / 2, this.y + this.h / 2);
  }
}

export default Bucket;
