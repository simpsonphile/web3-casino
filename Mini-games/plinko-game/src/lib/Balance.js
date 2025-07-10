class Balance {
  constructor({ balance, x, y }) {
    this.balance = balance;
    this.x = x;
    this.y = y;
  }

  addToBalance(value) {
    this.animationFramesLeft = 20;
    this.animationType = value > 0 ? "positive" : "negative";
    this.balance += value;
  }

  draw(ctx) {
    const v = this.animationFramesLeft
      ? Math.floor((this.animationFramesLeft / 20) * 128) + 128
      : 255;

    this.c =
      this.animationType === "positive"
        ? `rgb(0, ${v}, 0)`
        : this.animationType === "negative"
          ? `rgb(${v}, 0, 0)`
          : "rgb(255,255,255)";
    this.animationFramesLeft =
      this.animationFramesLeft <= 0 ? 0 : this.animationFramesLeft - 1;
    this.animationType =
      this.animationFramesLeft <= 0 ? -1 : this.animationType;
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.font = "20px Arial";
    ctx.textAlign = "end";
    ctx.textBaseline = "middle";
    ctx.fillText(`${this.balance}TOK`, this.x, this.y);
  }
}

export default Balance;
