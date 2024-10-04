import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

class RendererComposer {
  constructor({ scene, camera }) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    this.composer = new EffectComposer(this.renderer);

    this.domElement = this.renderer.domElement;

    document.body.appendChild(this.renderer.domElement);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.gammaFactor = 2.2;

    this.initRenderPass(scene, camera);
    this.initBloom();
    this.resize();
  }

  setRenderPassCamera(camera) {
    this.renderPass.camera = camera;
  }

  initRenderPass(scene, camera) {
    this.renderPass = new RenderPass(scene, camera);
    this.composer.addPass(this.renderPass);
  }

  initBloom() {
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.3, // strength
      0.2, // radius (blur)
      0.0 // threshold (brightness cutoff for bloom)
    );
    this.bloomPass.resolution = new THREE.Vector2(
      window.innerWidth * 2,
      window.innerHeight * 2
    );
    this.composer.addPass(this.bloomPass);
  }

  setAnimationLoop(callback) {
    this.renderer.setAnimationLoop(callback);
  }

  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.renderer.setSize(width, height);
    this.composer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }

  render() {
    this.composer.render();
  }
}

export default RendererComposer;
