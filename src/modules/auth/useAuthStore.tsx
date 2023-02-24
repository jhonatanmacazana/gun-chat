import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useAuthStore = create(
  combine(
    {
      username: "",
    },
    set => ({
      setUsername: (u: string) => set({ username: u }),
    })
  )
);
