import Bucket from "./Bucket";
import Ball from "./Ball";
import Peg from "./Peg";
import Money from "./Money";

import { generateBucketColors } from "./helpers";
import Balance from "./Balance";
import GameLoop from "./GameLoop";
import History from "./History";

import CONFIG from "./Config";

export class PlinkoGame extends GameLoop {
  constructor({ multipliers, difficulty }) {
    super();
    this.rows = multipliers[difficulty].length * 2 - 2;
    this.multipliers = multipliers;
    this.difficulty = difficulty;
  }

  createCanvas = () => {
    const gradient = `radial-gradient(circle at center bottom, #000033, #000000)`;
    this.canvas = document.createElement("canvas");
    this.canvas.style.background = gradient;
    this.ctx = this.canvas.getContext("2d");
  };

  updateCanvasSize = () => {
    const BOTTOM_PEG_COUNT = this.rows + CONFIG.PEG_START_FROM - 1;
    const width = BOTTOM_PEG_COUNT * this.getSpacing();
    const height = (this.rows + 1) * this.getSpacing() + CONFIG.BUCKET_HEIGHT;
    this.canvas.width = width;
    this.canvas.height = height;
  };

  createBalance = () => {
    this.balance = new Balance({
      balance: 0,
      x: this.canvas.width - 10,
      y: 20,
    });
  };

  createHistory = () => {
    this.history = new History({
      x: this.canvas.width - 10,
      y: 100,
      rows: this.rows,
      multipliers: this.multipliers[this.difficulty],
    });
  };

  init = () => {
    this.createCanvas();
    this.updateCanvasSize();
    this.createBalance();
    this.createHistory();

    this.pegs = this.generatePegs();
    this.buckets = this.generateBuckets();
    this.balls = [];
    this.money = [];

    this.gameLoop();
  };

  setDifficulty = (difficulty) => {
    this.difficulty = difficulty;
    this.buckets = this.generateBuckets();
    this.history.multipliers = this.multipliers[difficulty];
  };

  getCenter = () => parseInt(this.canvas.width / 2);

  getSpacing = () =>
    CONFIG.BALL_RADIUS * 2 +
    CONFIG.PEG_RADIUS +
    Math.round(CONFIG.BALL_RADIUS / 2);

  getTargetBucket(multiplier) {
    const matchingBuckets = this.buckets.filter((bucket) => {
      return bucket.text.toString() === multiplier.toString();
    });
    const randomBucket =
      matchingBuckets[Math.floor(Math.random() * matchingBuckets.length)];
    return randomBucket;
  }

  dropBall = ({ multiplier, payout, bet }) => {
    this.balance.addToBalance(-bet);

    const center = this.getCenter();

    const targetBucket = this.getTargetBucket(multiplier);
    const targetX = targetBucket.x + targetBucket.w / 2;
    const targetY = targetBucket.y + targetBucket.h / 2;

    const ball = new Ball({
      x: center,
      r: CONFIG.BALL_RADIUS,
      y: 0,
      vx: (0.001 + Math.random() * 0.001) * (targetX > center ? 1 : -1),
      targetX,
      targetY,
      payout,
      onFinish: (finishedBall) => {
        this.money.push(
          new Money({
            x: targetX,
            y: targetY,
            value: finishedBall.payout,
          })
        );
        this.balance.addToBalance(finishedBall.payout);
        this.balls = this.balls.filter((b) => b !== finishedBall);
        targetBucket.setHit();
        this.history.addMultiplier(targetBucket.text);
      },
      onStep: (currentBall) => this.onBallUpdate(currentBall),
    });
    this.balls.push(ball);
  };

  nudgeBall(ball) {
    if (typeof ball.targetX === "number") {
      const heightFactor = Math.min(ball.y / this.canvas.height, 1);
      const minNudge = 0.001;
      const maxNudge = 0.02;
      const nudgeStrength = minNudge + (maxNudge - minNudge) * heightFactor;
      const diffX = ball.targetX - ball.x;
      ball.vx += diffX * nudgeStrength;
    }
  }

  onBallUpdate(ball) {
    ball.vy += 0.4;
    this.checkPegCollisions(ball);

    // Apply friction
    const friction = 0.98;
    ball.vx *= friction;
  }

  checkPegCollisions(ball) {
    for (const peg of this.pegs) {
      const dx = ball.x - peg.x;
      const dy = ball.y - peg.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < ball.r + peg.r) {
        // Calculate normal vector
        const normalX = dx / dist;
        const normalY = dy / dist;

        // Reflect velocity about normal vector (perfect reflection)
        const dot = ball.vx * normalX + ball.vy * normalY;
        ball.vx = ball.vx - 2 * dot * normalX;
        ball.vy = ball.vy - 2 * dot * normalY;
        ball.vx *= 0.8;
        ball.vy *= 0.8;

        this.nudgeBall(ball);

        const overlap = ball.r + peg.r - dist;

        ball.x += normalX * overlap;
        ball.y += normalY * overlap;

        peg.setHit();
      }
    }
  }

  generatePegs = () => {
    const pegs = [];
    const spacing = this.getSpacing();
    const center = this.getCenter();

    for (let i = 0; i < this.rows; i++) {
      const plinkoInRow = CONFIG.PEG_START_FROM + i;
      const grayValue = 255 - Math.round((i / this.rows) * 50);
      const c = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
      for (let j = 0; j < plinkoInRow; j++) {
        const x = center + spacing * (0.5 + j - plinkoInRow / 2);
        const y = spacing * (i + 1);
        pegs.push(new Peg({ x, y, r: CONFIG.PEG_RADIUS, c }));
      }
    }

    return pegs;
  };

  getBucketColor = (multipliers, multiplier) => {
    const colors = generateBucketColors(multipliers.length);

    const index = multipliers.indexOf(multiplier);
    return colors[index];
  };

  generateBuckets = () => {
    const textRows = Object.values(this.multipliers[this.difficulty]);
    const buckets = [];
    const bucketCount = this.rows + CONFIG.PEG_START_FROM - 2;
    const bucketSpacing = 4;
    const spacing = this.getSpacing();
    const w = spacing - bucketSpacing;

    const getIndex = (n, i) => {
      const length = 2 * n + 1;
      const pos = i % length;
      return pos <= n ? n - pos : pos - n;
    };

    for (let i = 0; i < bucketCount; i++) {
      const index = getIndex(Math.floor(bucketCount / 2), i);
      const text = textRows[index];
      const h = CONFIG.BUCKET_HEIGHT;
      const y = spacing * (this.rows + 0.5);
      const x = spacing * i + spacing / 2 + bucketSpacing / 2;
      const c = this.getBucketColor(this.multipliers[this.difficulty], text);
      const bucket = new Bucket({ x, y, w, h, c, text });
      buckets.push(bucket);
    }

    return buckets;
  };

  update = () => {
    for (const ball of this.balls) ball.move();

    for (let i = 0; i < this.money.length; i++) {
      const money = this.money[i];
      if (money.dead) {
        this.money.splice(i, 1);
        i--;
        continue;
      }
      money.move();
    }
  };

  draw = () => {
    const drawables = [
      ...this.pegs,
      ...this.buckets,
      ...this.balls,
      ...this.money,
      this.history,
      this.balance,
    ];
    for (const obj of drawables) obj.draw(this.ctx);
  };
}
