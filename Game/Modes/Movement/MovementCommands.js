class MovementCommands {
  constructor() {
    this.keys = window.keyConfig.get();

    this.addCommands();
  }

  addCommands() {
    window.commandManager.addCommand(
      "movement",
      "up",
      this.keys.movement.up,
      window.player.goForward.bind(window.player),
      window.player.beIdle.bind(window.player)
    );
    window.commandManager.addCommand(
      "movement",
      "left",
      this.keys.movement.left,
      window.player.goLeft.bind(window.player),
      window.player.beIdle.bind(window.player)
    );
    window.commandManager.addCommand(
      "movement",
      "right",
      this.keys.movement.right,
      window.player.goRight.bind(window.player),
      window.player.beIdle.bind(window.player)
    );
    window.commandManager.addCommand(
      "movement",
      "down",
      this.keys.movement.down,
      window.player.goBackward.bind(window.player),
      window.player.beIdle.bind(window.player)
    );
    window.commandManager.addCommand(
      "movement",
      "run",
      this.keys.movement.run,
      window.player.setRun.bind(window.player),
      window.player.setWalk.bind(window.player)
    );
  }
}

export default MovementCommands;
