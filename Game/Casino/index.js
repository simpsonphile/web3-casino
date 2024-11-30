class Casino {
  constructor() {
    this.loadLevel();
  }

  loadLevel() {
    const scene = window.models.world.scene.clone();
    scene.traverse((child, i) => {
      if (child.isLight) {
        child.intensity = child.intensity / 4000;
      }
    });

    window.scene.add(scene);
  }
}
export default Casino;
