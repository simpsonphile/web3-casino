import { create } from "zustand";
import { persist } from "zustand/middleware";

function generateGuestNickname() {
  const digits = Math.floor(1000000 + Math.random() * 9000000);
  return "guest_" + digits;
}

const defaultState = {
  nickname: null,
  nickname: null,
  asGuest: false,
  guestBalance: 0,
  balanceRefreshKey: 0,
};

export const useUserStore = create(
  persist(
    (set, get) => ({
      ...defaultState,
      setUser: ({ nickname, asGuest = false }) =>
        set({ ...defaultState, nickname, asGuest }),
      setGuestUser: () =>
        set({
          ...defaultState,
          asGuest: true,
          nickname: get().nickname || generateGuestNickname(),
          guestBalance: get().guestBalance <= 0 ? 10000 : get().guestBalance,
        }),
      addToGuestBalance: (val) =>
        set((state) => ({ guestBalance: state.guestBalance + val })),
      refreshBalance: () =>
        set((state) => ({ balanceRefreshKey: state.balanceRefreshKey + 1 })),
      reset: () => set({ ...defaultState }),
    }),
    { name: "userStore", getStorage: () => localStorage }
  )
);
