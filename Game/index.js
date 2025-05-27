import * as THREE from "three";
import "./Extensions";

import Controls from "./Controls";
import Stats from "three/examples/jsm/libs/stats.module.js";
import PlayableCharacter from "./PlayableCharacter";
import ModelsLoader from "./Loaders/ModelsLoader";
import SoundLoader from "./Loaders/SoundLoader";
import World from "./World";
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
import CSSRenderer from "./CSSRenderer";
import CasualMan from "./Models/CasualMan";
import MovementCommands from "./Modes/Movement/MovementCommands";
import ZoomCommands from "./Modes/Zoom/ZoomCommands";
import BlackjackMode from "./Modes/Blackjack/BlackjackMode";
import ATMMode from "./Modes/ATM/ATMMode";
import DeltaUpdater from "./DeltaUpdater";
import ActorCamera from "./ActorCamera";
import StairManager from "./StairManager";
import CollisionManager from "./CollisionManager";
import SlotMachineMode from "./Modes/SlotMachine/SlotMachineMode";
import { initStoreRegistry } from "./storeRegistry";
import ProgressLoader from "./ProgressLoader";

class Game {
  constructor({ onPause, repo, showTooltip, hideTooltip }) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this._onPause = onPause;
    this._repo = repo;
    window.repo = this._repo;

    this.showTooltip = showTooltip;
    this.hideTooltip = hideTooltip;
  }

  initCSSRenderer() {
    this.cssRenderer = new CSSRenderer();
    window.cssRenderer = this.cssRenderer;
  }

  initCSSScene() {
    this.cssScene = new THREE.Scene();
    window.cssScene = this.cssScene;
  }

  initClient() {
    // rename
    this.players = new Players();
    window.scene.add(this.players.playersGroup);
    window.cssScene.add(this.players.nicknamesGroup);
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
    this.collisions = new CollisionManager();
    this.collisions.init();
  }

  initStairs() {
    this.stairsManager = new StairManager();
    this.stairsManager.init();
  }

  async initModels() {
    const { setProgress, setLoading } = window.progressStore.getState();
    setLoading(true);
    const progressLoader = new ProgressLoader(setProgress);
    this.models = new ModelsLoader({
      onProgressUpdate: progressLoader.update.bind(progressLoader),
      onLoaded: () => setLoading(false),
    });

    await this.models.load();
    window.models = this.models.models;
  }

  async initSounds() {
    this.sounds = new SoundLoader();
    await this.sounds.load();

    window.sounds = this.sounds.soundBuffers;
  }

  initWorld() {
    new World();
  }

  initActorCamera() {
    this.actorCamera = new ActorCamera({
      fov: 70,
      aspect: this.width / this.height,
      near: 0.01,
      far: 1024,
    });

    window.camerasManager.addCamera("thirdPerson", this.actorCamera);
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
      camera: this.actorCamera,
      onBeforeMovement: (self, vec) => {
        const isBlocked = this.collisions.check(self.model, vec);
        if (isBlocked) return { canMove: false, vec };

        const { vec: newVec, isDropping } = this.stairsManager.check(
          self.model,
          vec
        );

        return {
          isDropping,
          canMove: true,
          vec: newVec,
        };
      },
      onAfterMovement: (position) => {
        this._repo.get("players").updatePosition(position);
      },
      onRotation: (rotation) => {
        this._repo.get("players").updateRotation(rotation);
      },
      onAnimation: (animation) => {
        this._repo.get("players").updateAnimation(animation);
      },
    });

    this.actorCamera.target = this.player.model;
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

  initUpdater() {
    this.deltaUpdater = new DeltaUpdater();
    window.deltaUpdater = this.deltaUpdater;
  }

  updateUpdater() {
    // move these
    this.deltaUpdater.add(this.player.update.bind(this.player));
    this.deltaUpdater.add(this.players.update.bind(this.players));
    this.deltaUpdater.add(
      this.neonsManager.update.bind(this.neonsManager),
      false
    );
    this.deltaUpdater.add(this.camerasManager.update.bind(this.camerasManager));
  }

  update() {
    this.deltaUpdater.update();
  }

  animate() {
    this.stats.begin();

    this.update();
    this.render();
    this.cssRenderer.render(
      this.cssScene,
      this.camerasManager.getActiveCamera()
    );
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
    window.renderer = this.renderer;
  }

  initBlackjack() {
    new BlackjackMode({
      game: this,
    }).init();
  }

  initATM() {
    new ATMMode({
      game: this,
    }).init();
  }

  initSlotMachine() {
    new SlotMachineMode({
      game: this,
    }).init();
  }

  initInteractionHandler() {
    this.interactionHandler = new InteractionHandler();
    window.interactionHandler = this.interactionHandler;
  }

  initCommandsManager() {
    this.commandManager = new CommandManager();
    window.commandManager = this.commandManager;

    window.camerasManager.setOnCameraTransitioning(() => {
      this.commandManager.setMode("cameraTransition");
    });
  }

  addCommands() {
    this.commandManager.resetCommands();

    // todo move to modes
    new ZoomCommands();
    new MovementCommands();
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
    initStoreRegistry();
    this.initStats();
    this.initCamerasManager();
    this.initScene();
    this.initCSSScene();
    this.initActorCamera();
    this.initAudioListener();
    this.initZoomCamera();
    this.initUpdater();
    this.initCSSRenderer();
    this.initRenderer();

    await this.initModels();
    await this.initSounds();

    this.initInteractionHandler();

    this.initWorld();
    this.initCollisions();
    this.initStairs();
    this.initPlayer();
    this.initClient();
    this.initNeons();

    this.initCommandsManager();
    this.addCommands();
    this.initATM();
    this.initBlackjack();
    this.initSlotMachine();

    this.initOnScreenResize();
    this.initControls();
    this.initRaycaster();
    this.updateUpdater();
  }
}

export default Game;
