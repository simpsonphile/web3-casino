import Particle from './Particle';

class Plinko {
  constructor({ x, y, c }) {
    this.particle = new Particle({
      x,
      y,
      r: 4,
      c,
    });
  }

  setHit() {
    this.hit = true;

    setTimeout(() => {
     this.hit = false; 
    }, 1000);
  }

  draw(ctx) {
    this.particle.draw(ctx);
  }

  bump() {}
}

export default Plinko;
