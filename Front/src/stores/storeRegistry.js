import { useBlackjackStore } from "./blackjackStore";
import { useSlotsStore } from "./slotsStore";
import { useKeyConfigStore } from "./keyConfigStore";
import { useAtmStore } from "./atmStore";
import { useProgressStore } from "./progressStore";
import { useMessagesStore } from "./messagesStore";
import { useSoundStore } from "./soundStore";
import { useUserStore } from "./userStore";
import { usePlinkoStore } from "./plinkoStore";

export function initStoreRegistry() {
  if (typeof window !== "undefined") {
    window.blackjackStore = window.blackjackStore || useBlackjackStore;
    window.slotsStore = window.slotsStore || useSlotsStore;
    window.keyConfigStore = window.keyConfigStore || useKeyConfigStore;
    window.atmStore = window.atmStore || useAtmStore;
    window.progressStore = window.progressStore || useProgressStore;
    window.messagesStore = window.messagesStore || useMessagesStore;
    window.soundStore = window.soundStore || useSoundStore;
    window.userStore = window.userStore || useUserStore;
    window.plinkoStore = window.plinkoStore || usePlinkoStore;
  }
}
