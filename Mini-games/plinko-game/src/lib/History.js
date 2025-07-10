import Bucket from "./Bucket";
import { generateBucketColors } from "./helpers";

import CONFIG from "./Config";

class History {
  constructor({ x, y, rows, multipliers }) {
    this.x = x;
    this.y = y;
    this.multipliers = multipliers || [];
    this.history = [];
    this.buckets = [];
    this.bucketCount = rows + CONFIG.PEG_START_FROM - 2;
    this.colors = generateBucketColors(multipliers.length);
  }

  getBucketColor = (multiplier) => {
    const index = this.multipliers.indexOf(multiplier);
    return this.colors[index];
  };

  addMultiplier(multiplier) {
    this.history.unshift(multiplier);
    this.history = this.history.slice(0, 5);
    this.createBuckets();
  }

  createBuckets() {
    this.buckets = this.history.map(
      (v, i) =>
        new Bucket({
          x: this.x - 40,
          y: this.y + i * 40 + i * 4,
          w: 40,
          h: 40,
          c: this.getBucketColor(v),
          text: v,
        })
    );
  }

  draw(ctx) {
    this.buckets.forEach((bucket) => bucket.draw(ctx));
  }
}

export default History;
