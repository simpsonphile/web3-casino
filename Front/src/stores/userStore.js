import { create } from "zustand";

function generateGuestNickname() {
  const digits = Math.floor(1000000 + Math.random() * 9000000);
  return "quest_" + digits;
}

export const useUserStore = create((set) => ({
  nickname: null,
  asGuest: false,

  setUser: ({ nickname, asGuest = false }) => set({ nickname, asGuest }),
  setGuestUser: () =>
    set({
      asGuest: true,
      nickname: generateGuestNickname(),
    }),
  reset: () => set({ nickname: null, asGuest: false }),
}));
