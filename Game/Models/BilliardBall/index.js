import * as THREE from "three";

class BilliardBall extends THREE.Object3D {
  constructor({ type, color, name }) {
    if (!["solid", "half"].includes(type)) {
      throw new Error(`Billiard ball type "${type}" does not exist.`);
    }

    if (!color) {
      throw new Error(`Billiard ball type "${type}" has no ${color} property.`);
    }

    super();

    const ball = window.models.billiardBalls.scene
      .getObjectByName(type)
      .clone();

    if (type === "solid") {
      ball.material = ball.material.clone();
      ball.material.color.set(color);
      ball.material.needsUpdate = true;
    } else if (type === "half") {
      ball.traverse((child) => {
        if (child?.material?.name === "half-color") {
          child.material = child.material.clone();
          child.material.color.set(color);
          child.material.needsUpdate = true;
        }
      });
    }

    this.name = `billiard-ball-${type}-${name}`;

    ball.position.set(0, 0, 0);
    this.add(ball);
  }
}

export default BilliardBall;
