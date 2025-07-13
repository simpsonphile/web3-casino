import Bucket from "./Bucket";
import { generateBucketColors } from "./helpers";

import CONFIG from "./Config";

class History {
  constructor({ x, y, rows, multipliers }) {
    this.x = x;
    this.y = y;
    this.multipliers = multipliers || {};
    this.buckets = [];
    this.bucketCount = rows + CONFIG.PEG_START_FROM - 2;
  }

  getBucketColor = (multiplier, difficulty) => {
    const colors = generateBucketColors(this.multipliers[difficulty].length);

    const index = this.multipliers[difficulty].indexOf(multiplier);
    return colors[index];
  };

  addMultiplier(multiplier, difficulty) {
    const newBucket = new Bucket({
      x: this.x - (CONFIG.HISTORY_BUCKET_SIZE * 2 + 10),
      y: this.y,
      w: CONFIG.HISTORY_BUCKET_SIZE,
      h: CONFIG.HISTORY_BUCKET_SIZE,
      c: this.getBucketColor(multiplier, difficulty),
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
