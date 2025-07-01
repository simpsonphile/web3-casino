import gsap from "gsap";
import runNamedAnimation from "./runNamedAnimation";

const animateButtonClick = (obj, offset = 0.02) => {
  runNamedAnimation({
    obj,
    name: "click",
    recordOriginal: (o) => ({ originalY: o.position.y }),
    animate: (o, done) => {
      const originalY = o.userData.animation["click"].originalY;
      gsap.to(obj.position, {
        y: originalY - offset,
        duration: 0.1,
        ease: "power1.out",
        onComplete: () => {
          gsap.to(obj.position, {
            y: originalY,
            duration: 0.15,
            ease: "bounce.out",
            onComplete: done,
          });
        },
      });
    },
  });
};

export default animateButtonClick;
