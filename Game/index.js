import * as THREE from "three";
import Controls from "./Controls";
import Stats from "three/examples/jsm/libs/stats.module.js";
import PlayableCharacter from "./PlayableCharacter";
import BusinessMan from "./Models/BusinessMan";
import ThirdPersonCamera from "./ThirdPersonCamera";
import ModelsLoader from "./Loaders/ModelsLoader";
import SoundLoader from "./Loaders/SoundLoader";
import FontLoader from "./Loaders/FontLoader";
import Casino from "./Casino";
import PointerLock from "./PointerLock";
import Collisions from "./Collisions";
import CommandManager from "./CommandManager";
import Neons from "./Neons";
import Raycaster from "./Raycaster";
import InteractionHandler from "./InteractionHandler";
import Tooltip from "./Tooltip";
import CamerasManager from "./CamerasManager";
import ZoomCamera from "./ZoomCamera";

import RendererComposer from "./RendererComposer";
import RemotePlayers from "@Common/Remote/Players";
import Players from "./Players";
import Blackjack from "./Modes/Blackjack";
import RemoteBlackjack from "@Common/Remote/Blackjack";

class Game {
  constructor({ onPause, keyConfig, repo, onAtmClick, onAtmExit }) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.clock = new THREE.Clock();
    this._onPause = onPause;
    this.keyConfig = keyConfig;
    this._repo = repo;
    window.repo = this._repo;

    this.onAtmClick = onAtmClick;
    this.onAtmExit = onAtmExit;
  }

  initClient() {
    // rename
    this.players = new Players();
    window.scene.add(this.players.playersGroup);
    this._repo.add("players", RemotePlayers, {
      onMainPlayerData: (room, data) => {
        const { position } = data;
        this.player.moveTo(position);
      },
      onNewPlayer: (room, data) => {
        const { id, nickname, position } = data;
        this.players.createNewPlayer(id, nickname, position);
      },
      onDeletePlayer: (room, id) => this.players.deletePlayer(id),
      onFirstPlayersData: (room, allPlayers) => {
        const { [room.sessionId]: you, ...players } = allPlayers;
        this.players.createNewPlayers(players);
      },
      onPlayerData: (room, players) => this.players.updatePlayers(players),
    });

    this._repo.get("players").connect();
  }

  resumeGame() {
    this.commandManager.setToPrevMode();
    this.pointerLock.requestPointerLock();
  }

  updateKeyConfig(type, key, values) {
    this.keyConfig.update(type, key, values);
  }

  initCamerasManager() {
    this.camerasManager = new CamerasManager();
    window.camerasManager = this.camerasManager;
  }

  initZoomCamera() {
    window.camerasManager.addCamera(
      "zoom",
      new ZoomCamera({
        fov: 70,
        aspect: this.width / this.height,
        near: 0.01,
        far: 1024,
      })
    );
  }

  initCollisions() {
    this.collisions = new Collisions();
    window.collisions = this.collisions;
  }

  async initModels() {
    this.models = new ModelsLoader();

    await this.models.load();
    window.models = this.models.models;
  }

  async initSounds() {
    this.sounds = new SoundLoader();
    await this.sounds.load();

    window.sounds = this.sounds.soundBuffers;
  }

  async initFonts() {
    this.fonts = new FontLoader();
    await this.fonts.load();

    window.fonts = this.fonts.get();
  }

  initCasino() {
    this.casino = new Casino();
  }

  initThirdPersonCamera() {
    this.thirdPersonCamera = new ThirdPersonCamera({
      fov: 70,
      aspect: this.width / this.height,
      near: 0.01,
      far: 1024,
    });

    window.camerasManager.addCamera("thirdPerson", this.thirdPersonCamera);
  }

  initAudioListener() {
    this.audioListener = new THREE.AudioListener();
    this.camerasManager.getCamera("thirdPerson").add(this.audioListener);
    window.audioListener = this.audioListener;
  }

  async initPlayer() {
    const model = new BusinessMan();
    window.scene.add(model);

    this.player = new PlayableCharacter({
      model,
      thirdPersonCamera: this.thirdPersonCamera,
      onMovement: (position) => {
        this._repo.get("players").updatePosition(position);

        if (!this.interactionTooltip.textMesh) return;

        this.interactionTooltip.textMesh.lookAt(position);
      },
      onRotation: (rotation) => {
        this._repo.get("players").updateRotation(rotation);
      },
      onAnimation: (animation) => {
        this._repo.get("players").updateAnimation(animation);
      },
    });

    this.thirdPersonCamera.target = this.player.model;
    window.player = this.player;
  }

  initScene() {
    this.scene = new THREE.Scene();
    window.scene = this.scene;
    this.scene.background = new THREE.Color(0x000022);
  }

  initStats() {
    this.stats = new Stats(1);

    document.body.appendChild(this.stats.dom);
  }

  initOnScreenResize() {
    window.addEventListener("resize", () => {
      this.renderer.resize();
      const aspect = this.width / this.height;
      this.camerasManager.updateCamerasAspect(aspect);
    });
  }

  render() {
    this.renderer.render();
  }

  initNeons() {
    this.neonsManager = new Neons();
  }

  update() {
    const delta = this.clock.getDelta();
    this.player.update(delta);
    this.player.model.updateMixer(delta);
    this.players.update(delta);
    this.neonsManager.update(this.clock.getElapsedTime());
    this.camerasManager.update(delta);
  }

  animate() {
    this.stats.begin();

    this.update();
    this.render();
    this.stats.end();
  }

  initRenderer() {
    this.renderer = new RendererComposer({
      scene: window.scene,
      camera: this.camerasManager.getActiveCamera(),
    });

    this.renderer.setAnimationLoop(this.animate.bind(this));
    this.camerasManager.setOnCameraChange((manager) => {
      this.renderer.setRenderPassCamera(manager.getActiveCamera());
    });
  }

  initInteractionHandlerTooltip() {
    this.interactionTooltip = new Tooltip(this.scene);
  }

  initBlackjack() {
    this._repo.add("blackjack_1", RemoteBlackjack, { id: "blackjack_1" });
    this.blackjack = new Blackjack();
  }

  initInteractionHandler() {
    this.interactionHandler = new InteractionHandler();

    this.interactionHandler.registerInteraction(
      "blackjack_table",
      "mouseOver",
      (data) => {
        const pos = new THREE.Vector3()
          .copy(data.object.parent.position)
          .add(new THREE.Vector3(0, 1, 0));

        if (data.distance > 4) return;
        if (!this.commandManager.checkIfModeEnabled("movement")) return;

        if (this.interactionTooltip.checkIfLoaded()) {
          this.interactionTooltip.updatePosition(pos);
        } else {
          this.interactionTooltip.loadText("Wanna join?", pos);
        }

        const targetPos = new THREE.Vector3().copy(this.player.model.position);
        targetPos.y = 2;

        this.interactionTooltip.textMesh.lookAt(targetPos);
      }
    );

    this.interactionHandler.registerInteraction("atm", "mouseOver", (data) => {
      const pos = new THREE.Vector3()
        .copy(data.object.position)
        .add(new THREE.Vector3(0, 3, 0));

      if (data.distance > 4) return;
      if (!this.commandManager.checkIfModeEnabled("movement")) return;

      if (this.interactionTooltip.checkIfLoaded()) {
        this.interactionTooltip.updatePosition(pos);
      } else {
        this.interactionTooltip.loadText("use?", pos);
      }

      const targetPos = new THREE.Vector3().copy(this.player.model.position);
      targetPos.y = 2;

      this.interactionTooltip.textMesh.lookAt(targetPos);
    });

    this.interactionHandler.registerInteraction(
      "blackjack_table",
      "mouseClick",
      (data) => {
        if (data.distance > 4) return;

        const obj = data.object.parent;
        this.camerasManager.getCamera("zoom").setTarget(obj.position);
        this.camerasManager.setActiveCamera("zoom", true, () => {
          this.commandManager.setMode(["zoom", "blackjack"]);
          this.interactionHandler.setState(false);
          this.blackjack.join({ object3d: obj, roomId: "blackjack_1" });
        });
      }
    );

    this.interactionHandler.registerInteraction("atm", "mouseClick", (data) => {
      if (data.distance > 9) return;

      const obj = data.object;
      this.camerasManager.getCamera("zoom").setTarget(obj.position);
      this.camerasManager.setActiveCamera("zoom", true, () => {
        this.commandManager.setMode(["zoom", "atm"]); // mode zoom and atm
        this.interactionHandler.setState(false);
        this.onAtmClick();
      });
    });
  }

  initCommandsManager() {
    this.commandManager = new CommandManager();

    window.camerasManager.setOnCameraTransitioning(() => {
      this.commandManager.setMode("cameraTransition");
    });
  }

  addCommands() {
    const keys = this.keyConfig.get();
    this.commandManager.resetCommands();
    this.commandManager.addCommand(
      "movement",
      "up",
      keys.movement.up,
      this.player.goForward.bind(this.player),
      this.player.beIdle.bind(this.player)
    );
    this.commandManager.addCommand(
      "movement",
      "left",
      keys.movement.left,
      this.player.goLeft.bind(this.player),
      this.player.beIdle.bind(this.player)
    );
    this.commandManager.addCommand(
      "movement",
      "right",
      keys.movement.right,
      this.player.goRight.bind(this.player),
      this.player.beIdle.bind(this.player)
    );
    this.commandManager.addCommand(
      "movement",
      "down",
      keys.movement.down,
      this.player.goBackward.bind(this.player),
      this.player.beIdle.bind(this.player)
    );
    this.commandManager.addCommand(
      "movement",
      "run",
      keys.movement.run,
      this.player.setRun.bind(this.player),
      this.player.setWalk.bind(this.player)
    );
    this.commandManager.addCommand("zoom", "scrollIn", ["wheelDown"], () => {
      this.camerasManager.getCamera("zoom").zoomBy(0.02);
    });
    this.commandManager.addCommand("zoom", "scrollOut", ["wheelUp"], () => {
      this.camerasManager.getCamera("zoom").zoomBy(-0.02);
    });
    this.commandManager.addCommand("zoom", "exit", keys.zoom.exit, () => {
      this.camerasManager.setActiveCamera("thirdPerson", true, () => {
        this.commandManager.setMode("movement");
        this.interactionHandler.setState(true);
      });
    });
    this.commandManager.addCommand(
      "blackjack",
      "hit",
      keys.blackjack.hit,
      () => {
        console.log("player hit");
      }
    );
    this.commandManager.addCommand(
      "blackjack",
      "stand",
      keys.blackjack.stand,
      () => {
        console.log("player stand");
      }
    );
  }

  initRaycaster() {
    this.raycaster = new Raycaster();
  }

  initControls() {
    this.controls = new Controls({
      onKeyDown: (keys) => {
        this.commandManager.executeDown(keys);
      },
      onKeyUp: (key) => {
        this.commandManager.executeUp(key);
      },
      onMouseMove: (event) => {
        this.player.rotateBy(event.movementX, event.movementY);

        const intersect = this.raycaster.getIntersectsFromRaycaster()[0];
        const obj = intersect?.object;
        if (this.interactionHandler.isObjectInteractive(obj)) {
          this.interactionHandler.runObjectInteraction(
            obj,
            "mouseOver",
            intersect
          );
        } else {
          this.interactionTooltip.removeText();
        }
      },
      onMouseClick: (event) => {
        const intersect = this.raycaster.getIntersectsFromRaycaster()[0];
        const obj = intersect?.object;
        if (!obj) return;
        this.interactionHandler.runObjectInteraction(
          obj,
          "mouseClick",
          intersect
        );
        this.interactionTooltip.removeText();
      },
      onWheel: (dir) => {
        if (dir === "up") {
          this.commandManager.executeDown("wheelUp");
        } else {
          this.commandManager.executeDown("wheelDown");
        }
      },
    });

    this.pointerLock = new PointerLock({
      domElement: this.renderer.domElement,
      onChange: (state) => {
        this.controls.setControlsEnabled.bind(this.controls)(state);
        if (!state) {
          this._onPause();
          this.commandManager.setMode("menu");
        }
      },
    });
    this.pointerLock.init();
  }

  async init() {
    this.initScene();
    await this.initModels();
    await this.initSounds();
    await this.initFonts();

    this.initCollisions();
    this.initStats();
    this.initInteractionHandlerTooltip();
    this.initInteractionHandler();

    this.initCamerasManager();
    this.initThirdPersonCamera();
    this.initAudioListener();
    this.initZoomCamera();
    this.initPlayer();
    this.initClient();
    this.initRenderer();
    this.initBlackjack();
    this.initCasino();
    this.initNeons();

    this.initCommandsManager();
    this.addCommands();

    this.initOnScreenResize();
    this.initControls();
    this.initRaycaster();

    this.pointerLock.requestPointerLock();
  }
}

export default Game;
