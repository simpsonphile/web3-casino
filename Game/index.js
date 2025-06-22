import * as THREE from "three";
import "./Extensions";

import Controls from "./Controls";
import Stats from "three/examples/jsm/libs/stats.module.js";
import PlayableCharacter from "./PlayableCharacter";
import ModelsLoader from "./Loaders/ModelsLoader";
import SoundLoader from "./Loaders/SoundLoader";
import World from "./World";
import PointerLock from "./PointerLock";
import NeonManager from "./NeonManager";
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
import ProgressLoader from "./ProgressLoader";

class Game {
  constructor({ onPause, onResume }) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this._onPause = onPause;
    this._onResume = onResume;
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
    window.cssScene.add(this.players.messagesGroup);
    window.repo.add("players", RemotePlayers, {
      onMainPlayerData: (room, data) => {
        const { id, position } = data;
        this.player.id = id;
        this.player.moveTo(position);
      },
      onNewPlayer: (room, data) => {
        const { id, nickname, position } = data;
        this.players.createNewPlayer(id, nickname, position);
      },
      onDeletePlayer: (room, id) => this.players.deletePlayer(id),
      onFirstPlayersData: (room, allPlayers) => {
        const { [this.player.id]: _, ...players } = allPlayers;
        this.players.createNewPlayers(players);
      },
      onPlayersData: (room, players) => this.players.updatePlayers(players),
    });

    window.repo.get("players").connect();
  }

  resumeGame() {
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
      aspect: this.width / this.height,
      near: 0.01,
      far: 100,
    });

    window.camerasManager.addCamera("thirdPerson", this.actorCamera);
  }

  initAudioListener() {
    this.audioListener = new THREE.AudioListener();
    window.player.model.add(this.audioListener);
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
        window.repo.get("players").updatePosition(position);
      },
      onRotation: (rotation) => {
        window.repo.get("players").updateRotation(rotation);
      },
      onAnimation: (animation) => {
        window.repo.get("players").updateAnimation(animation);
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

  initNeonManager() {
    this.neonManager = new NeonManager();
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
      this.neonManager.update.bind(this.neonManager),
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
    window.camerasManager.setOnCameraTransitioning(() => {
      window.commandManager.setMode("cameraTransition");
    });
  }

  addCommands() {
    window.commandManager.resetCommands();

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
        window.commandManager.executeDown(keys);
      },
      onKeyUp: (key) => {
        window.commandManager.executeUp(key);
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
          window.hideTooltip();
        }
      },
      onMouseClick: () => {
        const intersect = this.raycaster.getIntersectsFromRaycaster()[0];
        const obj = intersect?.object;
        if (!obj) return;
        this.interactionHandler.runObjectInteraction(
          obj,
          "mouseClick",
          intersect
        );
        window.hideTooltip();
      },
      onWheel: (dir) => {
        if (dir === "up") {
          window.commandManager.executeDown("wheelUp");
        } else {
          window.commandManager.executeDown("wheelDown");
        }
      },
    });

    this.controls.setControlsEnabled(this.pointerLock.isPointerLocked());
  }

  initPointerLock() {
    this.pointerLock = new PointerLock({
      domElement: window.document.body,
      onChange: (state) => {
        if (this.controls) {
          this.controls.setControlsEnabled.bind(this.controls)(state);
        }
        if (!state) {
          this._onPause();
          window.commandManager.setMode("menu");
        } else if (window.commandManager.hasModeInStack("menu")) {
          window.commandManager.popMode();
          this._onResume();
        }
      },
    });
    this.pointerLock.init();
    this.pointerLock.requestPointerLock();
  }

  async init() {
    this.initPointerLock();
    this.initStats();
    this.initCamerasManager();
    this.initScene();
    this.initCSSScene();
    this.initActorCamera();
    this.initZoomCamera();
    this.initUpdater();
    this.initCSSRenderer();
    this.initRenderer();

    await this.initModels();
    await this.initSounds();

    this.initInteractionHandler();

    this.initPlayer();
    this.initAudioListener();
    this.initWorld();
    this.initCollisions();
    this.initStairs();
    this.initClient();
    this.initNeonManager();

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
