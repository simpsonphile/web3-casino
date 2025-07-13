import Bucket from "./Bucket";
import Ball from "./Ball";
import Peg from "./Peg";
import Money from "./Money";

import { generateBucketColors, generateBucketSoundRates } from "./helpers";
import Balance from "./Balance";
import GameLoop from "./GameLoop";
import History from "./History";
import Physics from "./Physics";
import CONFIG from "./Config";
import { pickInverseWeighted } from "./helpers";

export class PlinkoGame extends GameLoop {
  constructor({ multipliers, difficulty, onBallFinish }) {
    super();
    this.rows = multipliers[difficulty].length * 2 - 2;
    this.multipliers = multipliers;
    this.difficulty = difficulty;

    this.soundRates = generateBucketSoundRates(multipliers[difficulty].length);

    this.onBallFinish = onBallFinish;
  }

  createCanvas = () => {
    const gradient = `radial-gradient(circle at center bottom, #000033, #000000)`;
    this.canvas = document.createElement("canvas");
    this.canvas.style.background = gradient;
    this.ctx = this.canvas.getContext("2d");
  };

  updateCanvasSize = () => {
    const BOTTOM_PEG_COUNT = this.rows + CONFIG.PEG_START_FROM - 1;
    const width = BOTTOM_PEG_COUNT * this.getSpacingHorizontal();
    const height =
      (this.rows + 1) * this.getSpacingVertical() + CONFIG.BUCKET_HEIGHT;
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
      multipliers: this.multipliers,
    });
  };

  init = () => {
    this.createCanvas();
    this.updateCanvasSize();
    this.createBalance();
    this.createHistory();
    this.pegs = this.generatePegs();
    this.physics = new Physics({ pegs: this.pegs, canvas: this.canvas });

    this.buckets = this.generateBuckets();
    this.balls = [];
    this.money = [];

    this.gameLoop();
  };

  setDifficulty = (difficulty) => {
    this.difficulty = difficulty;
    this.buckets = this.generateBuckets();
    this.pegs = this.generatePegs();
    this.physics.pegs = this.pegs;
    this.soundRates = generateBucketSoundRates(
      this.multipliers[difficulty].length
    );
    this.rows = this.multipliers[difficulty].length * 2 - 2;
    this.updateCanvasSize();
  };

  getCenter = () => parseInt(this.canvas.width / 2);

  getSpacingHorizontal = () =>
    CONFIG.BALL_RADIUS * 2 + CONFIG.PEG_RADIUS + CONFIG.PEG_SPACING_BUFFER;

  getSpacingVertical = () =>
    CONFIG.BALL_RADIUS * 2 + CONFIG.PEG_RADIUS + CONFIG.PEG_SPACING_BUFFER_Y;

  getTargetBucket(multiplier) {
    const matchingBuckets = this.buckets.filter((bucket) => {
      return bucket.text.toString() === multiplier.toString();
    });
    const randomBucket =
      matchingBuckets[Math.floor(Math.random() * matchingBuckets.length)];
    return randomBucket;
  }

  dropBall = ({ multiplier, difficulty, bet }) => {
    this.balance.addToBalance(-bet);

    const center = this.getCenter();

    const targetBucket = this.getTargetBucket(multiplier);
    const targetX = targetBucket.x + targetBucket.w / 2;
    const targetY = targetBucket.y + targetBucket.h / 2;

    const ball = new Ball({
      x: center,
      r: CONFIG.BALL_RADIUS,
      y: 0,
      vx: 0,
      targetX,
      targetY,
      payout: bet * multiplier,
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
        targetBucket.animateHit();
        this.history.addMultiplier(targetBucket.text, difficulty);

        this.onBallFinish(
          this.soundRates[this.multipliers[this.difficulty].indexOf(multiplier)]
        );
      },
      onStep: (currentBall) => this.onBallUpdate(currentBall),
    });
    this.balls.push(ball);
  };

  dropFairRandomBall = ({ bet }) => {
    console.log("dropFairRandomBall", bet);
    const multiplier = pickInverseWeighted(this.multipliers[this.difficulty]);
    console.log(multiplier, this.difficulty, bet);
    this.dropBall({ multiplier, difficulty: this.difficulty, bet });
  };

  onBallUpdate(ball) {
    this.physics.applyGravity(ball);
    this.physics.checkPegCollisions(ball);
    this.physics.applyFriction(ball);
  }

  generatePegs = () => {
    const pegs = [];
    const spacingHorizontal = this.getSpacingHorizontal();
    const spacingVertical = this.getSpacingVertical();
    const center = this.getCenter();

    for (let i = 0; i < this.rows; i++) {
      const plinkoInRow = CONFIG.PEG_START_FROM + i;
      const grayValue = 255 - Math.round((i / this.rows) * 50);
      const c = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
      for (let j = 0; j < plinkoInRow; j++) {
        const x = center + spacingHorizontal * (0.5 + j - plinkoInRow / 2);
        const y = spacingVertical * (i + 1);
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
    const spacingHorizontal = this.getSpacingHorizontal();
    const spacingVertical = this.getSpacingVertical();
    const w = spacingVertical - bucketSpacing;

    const getIndex = (n, i) => {
      const length = 2 * n + 1;
      const pos = i % length;
      return pos <= n ? n - pos : pos - n;
    };

    for (let i = 0; i < bucketCount; i++) {
      const index = getIndex(Math.floor(bucketCount / 2), i);
      const text = textRows[index];
      const h = CONFIG.BUCKET_HEIGHT;
      const y = spacingVertical * (this.rows + 0.5);
      const x =
        spacingHorizontal * i + spacingHorizontal / 2 + bucketSpacing / 2;
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
