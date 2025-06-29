import Bucket from "./Bucket";
import Ball from "./Ball";
import Plinko from "./Plinko";
import Money from "./Money";

import {
  generateBucketColors,
  generateBallPath,
  interpolateXWithMomentum,
  interpolateYWithMomentum,
} from "./helpers";
import Balance from "./Balance";

const DIFFICULTY_ENUM = {
  0: "easy",
  1: "medium",
  2: "hard",
  easy: 0,
  medium: 1,
  hard: 2,
};

export class PlinkoGame {
  constructor({
    // parentElementQuery,
    startFrom = 3,
    rows = 10,
    w,
    h,
    multipliers,
    difficulty,
  }) {
    // this.parentElementQuery = parentElementQuery;
    this.startFrom = startFrom;
    this.rows = rows;
    this.w = w;
    this.h = h;
    this.multipliers = multipliers;
    this.difficulty = difficulty;
    this.balance = new Balance({ balance: 0, x: this.w - 10, y: 20 });
  }

  createCanvas = () => {
    const gradient = `radial-gradient(circle at center bottom, #000033, #000000)`;
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    this.canvas.style.background = gradient;
    // document.querySelector(this.parentElementQuery).appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
  };

  init = () => {
    this.createCanvas();
    this.plinkos = this.generatePlinkos();
    this.buckets = this.generateBuckets();
    this.balls = [];
    this.money = [];

    this.lastFrameTime = 0;
    this.fps = 60;
    this.frameDuration = 1000 / this.fps;
    this.gameLoop();
  };

  stop = () => {
    this.gameLoop = () => {};
  };

  setDifficulty = (difficulty) => {
    this.difficulty = difficulty;
    this.buckets = this.generateBuckets();
  };

  getCenter = () => parseInt(this.canvas.width / 2);

  getSpacing = () => this.canvas.width / (this.rows + this.startFrom - 1);

  dropBall = ({ multiplier, difficulty, payout, bet }) => {
    this.balance.addToBalance(-bet);
    const path = generateBallPath({
      rows: this.rows,
      multiplier,
      multipliers: this.multipliers[difficulty],
    });
    const spacing = this.getSpacing();
    const center = this.getCenter();

    const cornerXs = path
      .map((p) => (spacing / 2) * (p === "R" ? 1 : -1))
      .reduce((p, c) => [...p, c + p[p.length - 1]], [center]);
    const cornerYs = Array.from(
      { length: this.rows + 3 },
      (_, i) => i * spacing + spacing - 14
    );
    const dxs = interpolateXWithMomentum(cornerXs);
    const dxy = interpolateYWithMomentum(cornerYs);

    const ball = new Ball({
      x: center,
      y: spacing,
      dxs,
      dxy,
      payout,
    });
    this.balls.push(ball);
  };

  generatePlinkos = () => {
    const plinkos = [];
    const spacing = this.getSpacing();
    const center = this.getCenter();

    for (let i = 0; i < this.rows; i++) {
      const plinkoInRow = this.startFrom + i;
      const grayValue = 255 - Math.round((i / this.rows) * 50);
      const c = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
      for (let j = 0; j < plinkoInRow; j++) {
        const x = center + spacing * (0.5 + j - plinkoInRow / 2);
        const y = spacing * (i + 1);
        plinkos.push(new Plinko({ x, y, c }));
      }
    }

    return plinkos;
  };

  generateBuckets = () => {
    const textRows = Object.values(this.multipliers);
    const buckets = [];
    const bucketCount = this.rows + this.startFrom - 2;
    const bucketSpacing = 4;
    const spacing = this.getSpacing();
    const colors = generateBucketColors(Math.ceil(bucketCount / 2));
    const w = spacing - bucketSpacing;

    const getColorIndex = (n, i) => {
      const length = 2 * n + 1;
      const pos = i % length;
      return pos <= n ? n - pos : pos - n;
    };

    for (let i = 0; i < textRows.length; i++) {
      const texts = textRows[i];

      const h = 30;
      const y = spacing * (this.rows + 0.5) + i * (h + bucketSpacing);

      for (let j = 0; j < bucketCount; j++) {
        const x = spacing * j + spacing / 2 + bucketSpacing / 2;
        const c =
          DIFFICULTY_ENUM[i] === this.difficulty
            ? colors[getColorIndex(Math.floor(bucketCount / 2), j)]
            : "rgb(111,111,111)";
        const text = texts[getColorIndex(Math.floor(bucketCount / 2), j)];
        const bucket = new Bucket({ x, y, w, h, c, text });
        buckets.push(bucket);
      }
    }

    return buckets;
  };

  drawPlinkos = () => {
    this.plinkos.forEach((plinko) => {
      plinko.draw(this.ctx);
    });
  };

  drawBuckets = () => {
    this.buckets.forEach((bucket) => {
      bucket.draw(this.ctx);
    });
  };

  drawBalls = () => {
    for (let i = 0; i < this.balls.length; i++) {
      const ball = this.balls[i];
      if (ball.dead) {
        this.money.push(
          new Money({
            x: ball.particle.x,
            y: ball.particle.y,
            value: ball.payout,
          })
        );
        this.balance.addToBalance(ball.payout);
        this.balls.splice(i, 1);
        i--;
        continue;
      }
      ball.move();
      ball.draw(this.ctx);
    }
  };

  drawGrid = () => {
    this.ctx.fillStyle = "red";
    for (let i = 0; i < this.canvas.width; i += this.getSpacing() / 2) {
      this.ctx.rect(i, 0, 1, 600);
      this.ctx.rect(0, i, 600, 1);
    }
    this.ctx.fill();
  };

  drawMoney = () => {
    for (let i = 0; i < this.money.length; i++) {
      const money = this.money[i];
      if (money.dead) {
        this.money.splice(i, 1);
        i--;
        continue;
      }
      money.move();
      money.draw(this.ctx);
    }
  };

  draw = () => {
    this.drawPlinkos();
    this.drawBuckets();
    this.drawBalls();
    this.drawMoney();
    this.balance.draw(this.ctx);
    // this.drawGrid();
  };

  gameLoop = (currentTime) => {
    const deltaTime = currentTime - this.lastFrameTime;
    if (deltaTime >= this.frameDuration) {
      this.lastFrameTime = currentTime;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.draw();
    }
    requestAnimationFrame(this.gameLoop);
  };
}
