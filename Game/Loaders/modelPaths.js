import business_man from "@Assets/models/business-man.glb";
import casual_man from "@Assets/models/casual-man.glb";
import cards from "@Assets/models/cards.glb";
import chips from "@Assets/models/chips.glb";
import world from "@Assets/models/world.glb";

console.log(business_man);

export const modelPaths = {
  business_man,
  casual_man,
  cards,
  chips,
  world, // raw model
  // world: "game-assets/models/world-geometry-optimized.glb", // only geometry optimized
  // world: "game-assets/models/world-optimized.glb", // everything optimized
};
