class GameLoop {
  constructor() {
    this.lastFrameTime = 0;
    this.fps = 60;
    this.frameDuration = 1000 / this.fps;
  }

  gameLoop = (currentTime) => {
    const deltaTime = currentTime - this.lastFrameTime;
    if (deltaTime >= this.frameDuration) {
      this.update();
      this.lastFrameTime = currentTime;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.draw();
    }
    requestAnimationFrame(this.gameLoop);
  };

  stop = () => {
    this.gameLoop = () => {};
  };
}

export default GameLoop;
