import BilliardCommands from "./BilliardCommands";
import BilliardController from "./BilliardController";
import BilliardInteraction from "./BilliardInteraction";
import BilliardView from "./BilliardView";

class BilliardMode {
  constructor({ game }) {
    this.game = game;
  }

  init() {
    this.initTables();

    this.controller = new BilliardController({
      views: this.views,
    });

    new BilliardCommands(this.controller);
    new BilliardInteraction({ game: this.game, controller: this.controller });
  }

  initTables() {
    this.views = {};
    window.scene.traverse((child) => {
      if (!child.name.includes("billiard-table")) return;

      child.traverse((subChild) => {
        if (subChild.name.includes("physics")) {
          this.hidePhysics(subChild);
        }
      });

      this.views[child.name] = new BilliardView({
        object3d: child,
      });
    });
  }

  hidePhysics(element) {
    element.traverse((child) => {
      if (child.name.includes("physics")) {
        child.traverse((subChild) => {
          subChild.visible = false;
          subChild.layers.set(4);
        });
      }
    });
  }
}

export default BilliardMode;
