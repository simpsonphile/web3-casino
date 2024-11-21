import BusinessMan from "../Models/BusinessMan";

class Casino {
  // rename
  constructor() {
    this.loadLevel();
  }

  loadLevel() {
    const scene = window.models.world.scene.clone();
    window.npcs = [];
    scene.traverse((child, i) => {
      if (child.isLight) {
        child.intensity = child.intensity / 4000;
      }

      if (child.name.includes("blackjack_npc_position")) {
        const npc = new BusinessMan();
        npc.position.copy(child.position);
        window.scene.add(npc);
        npc.runIdleAnimation();
        console.log(npc);
        npc.rotation.y -= Math.PI / 2;
        window.npcs.push(npc);
      }
    });

    window.scene.add(scene);
  }
}
export default Casino;
