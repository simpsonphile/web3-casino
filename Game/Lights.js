function getFlickerValue(time) {
  // Simulate irregular flickering, like a faulty bulb or flame
  const noise = Math.sin(time * 0.01) * 0.5 + Math.sin(time * 0.035) * 0.3;
  const random = (Math.sin(time * 123.456) + 1) * 0.5;
  return 0.8 + 0.2 * (noise + random); // Range approx 0.8–1.2
}

function getPulseValue(time) {
  return 1.0 + 0.1 * Math.sin(time * 0.002); // Very slow pulse
}

function getFlutterValue(time) {
  return 1.0 + 0.05 * Math.sin(time * 0.3) + 0.03 * Math.sin(time * 2.0);
}

function getAirGlowIntensity(time, baseIntensity = 1.0) {
  const slowOscillation = 0.05 * Math.sin(time * 0.001); // Very slow shift
  const subtleFlicker = 0.02 * Math.sin(time * 0.03) * Math.sin(time * 0.07);
  return baseIntensity + slowOscillation + subtleFlicker;
}

class Lights {
  constructor() {
    this.init();
  }

  init() {
    this.lights = [];
    window.scene.traverse((child) => {
      if (child.isLight && child.type === "SpotLight")
        this.lights.push({
          light: child,
          base: child.intensity,
          seed: Math.random() * 1000,
        });
    });
  }

  update(timestamp) {
    this.lights.forEach(({ light, base, seed }, i) => {
      const t = timestamp + seed;
      light.intensity = base + getPulseValue(t) * 5 + getFlickerValue(t) * 5;
    });
    // const light = this.lights[0];

    // const t = timestamp + light.seed;
    // light.light.intensity = getPulseValue(t) + getFlickerValue(t);
    // console.log(light.light.intensity);
  }
}

export default Lights;
