import SlotMachineSimulator from "./index.js";

import configClassic from "./configs/classic.js";

export const simulators = {
  classic: new SlotMachineSimulator(configClassic),
};

export const getSimulator = (name = "classic") => simulators[name];
