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
    if (this.history.length > 5) this.history.length = 5;

    const newBucket = new Bucket({
      x: this.x - (CONFIG.HISTORY_BUCKET_SIZE * 2 + 10),
      y: this.y,
      w: CONFIG.HISTORY_BUCKET_SIZE,
      h: CONFIG.HISTORY_BUCKET_SIZE,
      c: this.getBucketColor(multiplier),
      text: multiplier,
    });
    newBucket.moveIn();
    this.buckets.unshift(newBucket);

    this.buckets.forEach((bucket, i) => {
      if (i === 0) return;
      bucket.animateNewY(
        this.y +
          i * CONFIG.HISTORY_BUCKET_SIZE +
          i * CONFIG.HISTORY_BUCKET_SPACING
      );
    });

    if (this.buckets.length > 5) {
      this.buckets.pop();
    }
  }

  draw(ctx) {
    this.buckets.forEach((bucket) => bucket.draw(ctx));
  }
}

export default History;
