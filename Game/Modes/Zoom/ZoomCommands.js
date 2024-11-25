class ZoomCommands {
  constructor() {
    this.keys = window.keyConfig.get();

    this.addCommands();
  }

  addCommands() {
    // window.commandManager.addCommand("zoom", "scrollIn", ["wheelDown"], () => {
    //   window.camerasManager.getCamera("zoom").zoomBy(0.06);
    // });
    // window.commandManager.addCommand("zoom", "scrollOut", ["wheelUp"], () => {
    //   window.camerasManager.getCamera("zoom").zoomBy(-0.06);
    // });
    window.commandManager.addCommand(
      "zoom",
      "exit",
      this.keys.zoom.exit,
      () => {
        window.camerasManager.setActiveCamera("thirdPerson", true, () => {
          window.commandManager.setMode("movement");
          window.interactionHandler.setState(true);
          window.player.switchCameraMode("third-person");
        });
      }
    );
  }
}

export default ZoomCommands;
