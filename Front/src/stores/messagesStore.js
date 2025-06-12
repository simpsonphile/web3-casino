import { create } from "zustand";

export const useMessagesStore = create((set) => ({
  messages: [],

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
}));
