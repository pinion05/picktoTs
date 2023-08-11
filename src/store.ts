import { User } from "firebase/auth";
import { create } from "zustand";

type Store = {
  loginConditon: boolean;
  login: () => void;
  logout: () => void;
  userName: string;
  setUserName: (name: string) => void;
};

const useStore = create<Store>()((set) => ({
  loginConditon: false,
  login: () => set((state) => ({ loginConditon: true })),
  logout: () => set((state) => ({ loginConditon: false })),
  userName: "",
  // setUserName: (userData:{}) => {
  //   set((state) => ({ userName: userData }));
  // },
  setUserName: (name: string) => {
    set((state) => ({ userName: name }));
  },
}));

export { useStore };
