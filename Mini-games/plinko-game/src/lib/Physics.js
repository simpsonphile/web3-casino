import Config from "./Config.js";

class Physics {
  constructor({ pegs, canvas }) {
    this.pegs = pegs || [];
    this.canvas = canvas || document.createElement("canvas");
    this.gravity = Config.GRAVITY_STRENGTH;
    this.friction = Config.FRICTION_STRENGTH;
  }

  applyGravity(ball) {
    ball.vy += this.gravity;
  }

  applyFriction(ball) {
    ball.vx *= this.friction;
    // ball.vy *= this.friction;
  }

  nudgeBall(ball) {
    if (typeof ball.targetX === "number") {
      const heightFactor = Math.min(ball.y / this.canvas.height, 1);
      const minNudge = 0.001;
      const maxNudge = 0.05;
      const nudgeStrength = minNudge + (maxNudge - minNudge) * heightFactor;
      const diffX = ball.targetX - ball.x;
      ball.vx += diffX * nudgeStrength;

      const minXVel = 0.02;
      const minYVel = 0.4;
      const maxXVel = 1;

      if (Math.abs(ball.vx) < minXVel) {
        ball.vx += Math.sign(diffX || 1) * minXVel * 0.5;
      }

      // Optionally, ensure vy is not too low (to avoid vertical sticking)
      if (Math.abs(ball.vy) < minYVel * 0.5) {
        ball.vy += (Math.random() - 0.5) * minYVel * 0.5;
      }

      // Clamp vx to maxXVel
      if (Math.abs(ball.vx) > maxXVel) {
        ball.vx = Math.sign(ball.vx) * maxXVel;
      }
    }
  }

  checkPegCollisions(ball) {
    let maxOverlap = 0;
    let closestPeg = null;
    let normalX = 0;
    let normalY = 0;

    for (const peg of this.pegs) {
      const dx = ball.x - peg.x;
      const dy = ball.y - peg.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const overlap = ball.r + peg.r - dist;
      if (overlap <= 0) continue;
      if (overlap > maxOverlap) {
        maxOverlap = overlap;
        closestPeg = peg;
        normalX = dx / dist;
        normalY = dy / dist;
      } else {
        normalX = 1;
        normalY = 0;
      }

      if (closestPeg && maxOverlap > 0) {
        // Reflect velocity about normal vector (perfect reflection)
        const dot = ball.vx * normalX + ball.vy * normalY;
        ball.vx = ball.vx - 2 * dot * normalX;
        ball.vy = ball.vy - 2 * dot * normalY;

        // Apply some damping to the velocity
        ball.vx *= 0.8;
        ball.vy *= 0.6;

        // Nudge the ball away from the peg
        this.nudgeBall(ball);

        // Move the ball out of the overlap
        ball.x += 1.2 * normalX * maxOverlap;
        ball.y += 1.2 * normalY * maxOverlap;

        closestPeg?.animateHit();
      }
    }
  }
}

export default Physics;
