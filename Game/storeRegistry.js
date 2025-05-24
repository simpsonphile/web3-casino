import { useBlackjackStore } from "../Front/src/stores/blackjackStore";
import { useSlotsStore } from "../Front/src/stores/slotsStore";
import { useKeyConfigStore } from "../Front/src/stores/keyConfigStore";

export function initStoreRegistry() {
  if (typeof window !== "undefined") {
    window.blackjackStore = window.blackjackStore || useBlackjackStore;
    window.slotsStore = window.slotsStore || useSlotsStore;
    window.keyConfigStore = window.keyConfigStore || useKeyConfigStore;
  }
}
