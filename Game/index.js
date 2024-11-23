import * as THREE from "three";
import "./Extensions";

import Controls from "./Controls";
import Stats from "three/examples/jsm/libs/stats.module.js";
import PlayableCharacter from "./PlayableCharacter";
import ThirdPersonCamera from "./ThirdPersonCamera";
import ModelsLoader from "./Loaders/ModelsLoader";
import SoundLoader from "./Loaders/SoundLoader";
import Casino from "./Casino";
import PointerLock from "./PointerLock";
import Collisions from "./Collisions";
import CommandManager from "./CommandManager";
import Neons from "./Neons";
import Raycaster from "./Raycaster";
import InteractionHandler from "./InteractionHandler";
import CamerasManager from "./CamerasManager";
import ZoomCamera from "./ZoomCamera";

import RendererComposer from "./RendererComposer";
import RemotePlayers from "@Common/Remote/Players";
import Players from "./Players";
import RemoteBlackjack from "@Common/Remote/Blackjack";
import UIRenderer from "./UIRenderer";
import BlackjackController from "./Modes/Blackjack/BlackjackController";
import BlackjackCommands from "./Modes/Blackjack/BlackjackCommands";
import CasualMan from "./Models/CasualMan";

class Game {
  constructor({
    onPause,
    keyConfig,
    repo,
    onAtmClick,
    onAtmExit,
    showTooltip,
    hideTooltip,
    dispatchBlackjackUI,
  }) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.clock = new THREE.Clock();
    this._onPause = onPause;
    this.keyConfig = keyConfig;
    window.keyConfig = keyConfig;
    this._repo = repo;
    window.repo = this._repo;

    this.onAtmClick = onAtmClick;
    this.onAtmExit = onAtmExit;

    this.showTooltip = showTooltip;
    this.hideTooltip = hideTooltip;
    this.dispatchBlackjackUI = dispatchBlackjackUI;
  }

  initUIRenderer() {
    this.uiRenderer = new UIRenderer();
    window.uiRenderer = this.uiRenderer;
  }

  initUIScene() {
    this.uiScene = new THREE.Scene();
    window.uiScene = this.uiScene;
  }

  initClient() {
    // rename
    this.players = new Players();
    window.scene.add(this.players.playersGroup);
    window.uiScene.add(this.players.nicknamesGroup);
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
    const model = new CasualMan();
    window.scene.add(model);

    this.player = new PlayableCharacter({
      model,
      thirdPersonCamera: this.thirdPersonCamera,
      onMovement: (position) => {
        this._repo.get("players").updatePosition(position);
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
    window.npcs.forEach((npc) => npc.updateMixer(delta)); // todo
    this.neonsManager.update(this.clock.getElapsedTime());
    this.camerasManager.update(delta);
  }

  animate() {
    this.stats.begin();

    this.update();
    this.render();
    this.uiRenderer.render(this.uiScene, this.camerasManager.getActiveCamera());
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

  initBlackjack() {
    this._repo.add("blackjack_1", RemoteBlackjack, { id: "blackjack_1" });
    this._repo.add("blackjack_2", RemoteBlackjack, { id: "blackjack_2" });
    this._repo.add("blackjack_3", RemoteBlackjack, { id: "blackjack_3" });

    this.blackjackController = new BlackjackController({
      dispatchBlackjackUI: this.dispatchBlackjackUI,
    });

    new BlackjackCommands(this.blackjackController);

    window.blackjackController = this.blackjackController;
  }

  initInteractionHandler() {
    this.interactionHandler = new InteractionHandler();

    this.interactionHandler.registerInteraction(
      "blackjack_table",
      "mouseOver",
      (data) => {
        if (data.distance > 6) return;
        if (!this.commandManager.checkIfModeEnabled("movement")) return;

        this.showTooltip("wanna join blackjack game?");
      }
    );

    this.interactionHandler.registerInteraction("atm", "mouseOver", (data) => {
      const pos = new THREE.Vector3()
        .copy(data.object.position)
        .add(new THREE.Vector3(0, 3, 0));

      if (data.distance > 5) return;
      if (!this.commandManager.checkIfModeEnabled("movement")) return;

      this.showTooltip("use?");
    });

    this.interactionHandler.registerInteraction(
      "blackjack_table",
      "mouseClick",
      (data) => {
        if (this.commandManager.getMode().includes("blackjack")) return;
        if (data.distance > 6) return;

        const obj = data.object.parent;
        this.commandManager.setMode(["blackjack"]);
        this.interactionHandler.setState(false);

        const sessionId = this._repo.get("blackjack_1").sessionId;

        this.blackjackController.join({
          object3d: obj,
          roomId: "blackjack_1", // todo from data
          playerId: sessionId,
          afterJoin: (seatPosition) => {
            this.player.switchCameraMode("first-person");
            this.player.moveTo(seatPosition);
          },
        });
      }
    );

    this.interactionHandler.registerInteraction("atm", "mouseClick", (data) => {
      if (data.distance > 5) return;

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
    window.commandManager = this.commandManager;

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
    // this.commandManager.addCommand("zoom", "scrollIn", ["wheelDown"], () => {
    //   this.camerasManager.getCamera("zoom").zoomBy(0.06);
    // });
    // this.commandManager.addCommand("zoom", "scrollOut", ["wheelUp"], () => {
    //   this.camerasManager.getCamera("zoom").zoomBy(-0.06);
    // });
    this.commandManager.addCommand("zoom", "exit", keys.zoom.exit, () => {
      this.camerasManager.setActiveCamera("thirdPerson", true, () => {
        this.commandManager.setMode("movement");
        this.interactionHandler.setState(true);
        this.player.switchCameraMode("third-person");
      });
    });
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
          this.hideTooltip();
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
        this.hideTooltip();
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
    this.initUIScene();
    await this.initModels();
    await this.initSounds();

    this.initCollisions();
    this.initStats();
    this.initInteractionHandler();

    this.initCamerasManager();
    this.initThirdPersonCamera();
    this.initAudioListener();
    this.initZoomCamera();
    this.initPlayer();
    this.initClient();
    this.initRenderer();
    this.initUIRenderer();
    this.initCasino();
    this.initNeons();

    this.initCommandsManager();
    this.addCommands();
    this.initBlackjack();

    this.initOnScreenResize();
    this.initControls();
    this.initRaycaster();

    this.pointerLock.requestPointerLock();
  }
}

export default Game;
