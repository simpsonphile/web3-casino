import runNamedAnimation from "./runNamedAnimation";
import gsap from "gsap";

const setEmissionPower = (obj, to = 10, duration = 0.2) => {
  runNamedAnimation({
    obj,
    name: "emissionPower",
    check: (o) => typeof o.material.emissiveIntensity === "number",
    recordOriginal: (o) => {
      console.log(o.material.emissiveIntensity);
      return {
        original: o.material.emissiveIntensity,
      };
    },
    animate: (o, done) => {
      console.log("set emission power", o.material.emissiveIntensity);
      gsap.to(o.material, {
        emissiveIntensity: to,
        duration,
        ease: "power2.out",
        onComplete: done,
      });
    },
  });
};

const restoreEmissionPower = (obj, duration = 0.2) => {
  runNamedAnimation({
    obj,
    name: "emissionPower",
    check: (o) =>
      typeof o.material.emissiveIntensity === "number" &&
      typeof o.userData.animation?.emissionPower?.original === "number",

    animate: (o, done) => {
      console.log("restore emission power", o.name);
      const original = o.userData.animation.emissionPower.original;
      gsap.to(o.material, {
        emissiveIntensity: original,
        duration,
        ease: "power2.out",
        onComplete: done,
      });
    },
  });
};
export { setEmissionPower, restoreEmissionPower };
