import CANNON from "cannon";
import * as THREE from "three";

const LINEAR_THRESHOLD = 0.1;
// const ANGULAR_THRESHOLD = 0.05;
const ROLLING_FRICTION = 0.004;

class BilliardPhysics {
  constructor({
    onBallToBallCollision = () => {},
    onBallInTheHole = () => {},
    onNoMotion = () => {},
  } = {}) {
    this.onBallToBallCollision = onBallToBallCollision;
    this.onBallInTheHole = onBallInTheHole;
    this.onNoMotion = onNoMotion;

    this.world = new CANNON.World();
    this.world.gravity.set(0, -9.82, 0);
    this.materials = {
      ball: new CANNON.Material("ball"),
      bumper: new CANNON.Material("bumper"),
      ground: new CANNON.Material("ground"),
    };

    const contactBallBall = new CANNON.ContactMaterial(
      this.materials.ball,
      this.materials.ball,
      {
        friction: 0.01,
        restitution: 0.8,
      }
    );

    // Ball vs Cloth (bumpers)
    const contactBallBumper = new CANNON.ContactMaterial(
      this.materials.bumper,
      this.materials.ball,
      {
        friction: 0.4,
        restitution: 0.8,
      }
    );

    const contactBallGround = new CANNON.ContactMaterial(
      this.materials.ground,
      this.materials.ball,
      {
        friction: 0.4,
        restitution: 0,
      }
    );

    this.world.addContactMaterial(contactBallBall);
    this.world.addContactMaterial(contactBallBumper);
    this.world.addContactMaterial(contactBallGround);

    // this.world._visualizerInit(window.scene);

    this.boundUpdate = this.update.bind(this);

    window.deltaUpdater.add(this.boundUpdate);

    this.objects = {};
  }

  addBall(ball) {
    const shape = new CANNON.Sphere(0.028575); // radius of a billiard ball
    const body = new CANNON.Body({
      mass: 0.17, // mass of a billiard ball
      position: new CANNON.Vec3(
        ball.position.x,
        ball.position.y,
        ball.position.z
      ),
      material: this.materials.ball,
    });

    body.addShape(shape);

    this.world.addBody(body);
    ball.physicsBody = body; // store the physics body in the ball object
    this.objects[ball.name] = ball;
    body.name = ball.name;

    body.addEventListener("collide", (event) => {
      const otherBody = event.body;

      if (otherBody.name.includes("billiard-ball")) {
        this.onBallToBallCollision(body, otherBody);
      }
    });
  }

  addBalls(balls) {
    balls.forEach((ball) => this.addBall(ball));
  }

  addShape(shape, material) {
    const pos = new THREE.Vector3();
    shape.getWorldPosition(pos);

    const body = new CANNON.Body({
      mass: 0,
      position: new CANNON.Vec3(pos.x, pos.y, pos.z),
      quaternion: shape.quaternion,
      material: this.materials.bumper,
    });

    body.name = shape.name;

    body.addThreeShape(shape);
    this.world.addBody(body);
    this.objects[shape.name] = body;
  }

  addBumperShape(shape) {
    this.addShape(shape, this.materials.bumper);
  }

  getShapeSize(shape) {
    const size = new THREE.Vector3();
    shape.getWorldScale(size);
    return size;
  }

  addGroundShape(shape) {
    this.groundY = shape.localToWorld(new THREE.Vector3(0, 0, 0)).y;
    this.groundSize = this.getShapeSize(shape);

    this.addShape(shape, this.materials.ground);
  }

  hitBall(ball, point, strength) {
    const direction = ball.position
      .clone()
      .sub(point)
      .normalize()
      .multiplyScalar(strength);

    const force = new CANNON.Vec3(direction.x, 0, direction.z);
    if (ball.physicsBody) {
      const impulse = new CANNON.Vec3(force.x, force.y, force.z);
      this.ballsAreSleeping = false;
      ball.physicsBody.applyImpulse(impulse, ball.physicsBody.position);
    } else {
      console.warn("Ball does not have a physics body.");
    }
  }

  update(deltaTime) {
    if (this.ballsAreSleeping) return;

    this.world.step(1 / 120, deltaTime, 10);

    let sleepCount = 0;

    Object.values(this.objects).forEach((child) => {
      if (!child?.physicsBody) return;

      const body = child.physicsBody;
      child.position.copy(body.position);
      child.quaternion.copy(body.quaternion);

      const speed = body.velocity.length();

      if (speed === 0) {
        sleepCount++;
        return;
      }

      if (speed > 0) {
        const frictionForce = body.velocity.scale(-ROLLING_FRICTION);
        body.velocity.vadd(frictionForce, body.velocity);
      }

      if (speed < LINEAR_THRESHOLD) {
        body.velocity.set(0, 0, 0);
        body.angularVelocity.set(0, 0, 0);
      }

      if (
        child.name.includes("billiard-ball") &&
        !child.isInHole &&
        this.checkIfBallBellow(child)
      ) {
        this.onBallInTheHole(child);
        child.isInHole = true;
      }
    });

    if (this.checkIfBallsMoving(sleepCount)) {
      this.ballsAreSleeping = true;
      this.onNoMotion();
    } else {
      this.ballsAreSleeping = false;
    }

    this.world.updateDebugVisuals();
  }

  checkIfBallsMoving(sleepCount) {
    return (
      sleepCount >=
      Object.values(this.objects)
        .filter((o) => o.physicsBody)
        .filter((o) => !o.isInHole).length
    );
  }

  checkIfBallBellow(ball) {
    return ball.position.y + 0.056 < this.groundY;
  }

  disposeWorld() {
    this.world = new CANNON.World();
    window.deltaUpdater.remove(this.boundUpdate);
  }

  removeBall(ball) {
    if (ball.name in this.objects) {
      delete this.objects[ball.name];
    }
  }
}

export default BilliardPhysics;
