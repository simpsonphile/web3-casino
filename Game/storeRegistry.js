import { useBlackjackStore } from "@Front/stores/blackjackStore";
import { useSlotsStore } from "@Front/stores/slotsStore";
import { useKeyConfigStore } from "@Front/stores/keyConfigStore";
import { useAtmStore } from "@Front/stores/atmStore";
import { useProgressStore } from "@Front/stores/progressStore";
import { useMessagesStore } from "@Front/stores/messagesStore";

export function initStoreRegistry() {
  if (typeof window !== "undefined") {
    window.blackjackStore = window.blackjackStore || useBlackjackStore;
    window.slotsStore = window.slotsStore || useSlotsStore;
    window.keyConfigStore = window.keyConfigStore || useKeyConfigStore;
    window.atmStore = window.atmStore || useAtmStore;
    window.progressStore = window.progressStore || useProgressStore;
    window.messagesStore = window.messagesStore || useMessagesStore;
  }
}
