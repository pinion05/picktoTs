import { create } from "zustand";

type Store = {
  loginde: boolean;
  login: () => void;
  logout: () => void;
};

const useStore = create<Store>()((set) => ({
  loginde: false,
  login: () => set((state) => ({ loginde: true })),
  logout: () => set((state) => ({ loginde: false })),
}));

export { useStore };
