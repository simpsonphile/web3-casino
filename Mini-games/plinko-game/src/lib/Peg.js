import Particle from "./Particle";
import gsap from "gsap";

class Peg extends Particle {
  constructor({ x, y, r, c }) {
    super({ x, y, r, c });
    this.shadow = new Particle({
      x: this.x,
      y: this.y,
      r: this.r + 8,
      c: "rgba(255,0,0,0)",
    });
  }

  animateHit() {
    this.hit = true;

    gsap.killTweensOf(this.shadow);

    gsap.fromTo(
      this.shadow,
      { alpha: 0 },
      {
        alpha: 0.6,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
        onUpdate: () => {
          this.shadow.c = `rgba(128, 128, 128, ${this.shadow.alpha})`;
        },
        onComplete: () => {
          this.hit = false;
        },
      }
    );

    setTimeout(() => {
      this.hit = false;
    }, 1000);
  }

  draw(ctx) {
    if (this.shadow.alpha > 0) {
      this.shadow.draw(ctx);
    }
    super.draw(ctx);
  }
}

export default Peg;
