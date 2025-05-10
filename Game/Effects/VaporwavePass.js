import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import * as THREE from "three";

class VaporwavePass extends ShaderPass {
  constructor() {
    const vaporwaveShader = {
      uniforms: {
        tDiffuse: { value: null },
        color1: { value: new THREE.Color(0xff77ff) }, // light pink
        color2: { value: new THREE.Color(0x00ffff) }, // cyan
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform sampler2D tDiffuse;
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;
        void main() {
          vec4 texColor = texture2D(tDiffuse, vUv);
          float gray = dot(texColor.rgb, vec3(0.2989, 0.5870, 0.1140));

          vec3 gradientColor = mix(color1, color2, sin(vUv.x * 6.2831 + sin(vUv.y * 6.2831)) * 0.5 + 0.5);
          
          gl_FragColor = vec4(gray * gradientColor, texColor.a);
        }
      `,
    };
    super(vaporwaveShader);
  }
}

export default VaporwavePass;
