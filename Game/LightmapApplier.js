class LightmapApplier {
  constructor(lightmapTexture, intensity = 1.0) {
    this.lightmap = lightmapTexture;
    this.intensity = intensity;
  }
  applyToScene(scene) {
    scene.traverse((child) => {
      if (child?.geometry?.attributes.uv1) {
        child.material.lightMap = this.lightmap;
        child.material.lightMapIntensity = this.intensity;
        child.material.needsUpdate = true;
      }
    });
  }
}

export default LightmapApplier;
