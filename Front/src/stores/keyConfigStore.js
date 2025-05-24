import { create } from "zustand";
import KeyConfig from "@Common/KeyConfig";

export const useKeyConfigStore = create(() => ({
  keyConfig: new KeyConfig(),
}));
