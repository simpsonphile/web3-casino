class MovementCommands {
  constructor() {
    this.keys = window.keyConfigStore.getState().keyConfig.keyConfig;

    this.addCommands();

    // move these to sep class
    this.activeKeys = {
      up: false,
      down: false,
      left: false,
      right: false,
    };

    window.deltaUpdater.add(() => {
      window.player.updateMovementState({ ...this.activeKeys });
    });
  }

  setKey(key, state) {
    if (key in this.activeKeys) {
      this.activeKeys[key] = !!state;
    }
  }

  addCommands() {
    window.commandManager.addCommand(
      "movement",
      "up",
      this.keys.movement.up,
      () => this.setKey("up", true),
      () => this.setKey("up", false)
    );
    window.commandManager.addCommand(
      "movement",
      "left",
      this.keys.movement.left,
      () => this.setKey("left", true),
      () => this.setKey("left", false)
    );
    window.commandManager.addCommand(
      "movement",
      "right",
      this.keys.movement.right,
      () => this.setKey("right", true),
      () => this.setKey("right", false)
    );
    window.commandManager.addCommand(
      "movement",
      "down",
      this.keys.movement.down,
      () => this.setKey("down", true),
      () => this.setKey("down", false)
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
