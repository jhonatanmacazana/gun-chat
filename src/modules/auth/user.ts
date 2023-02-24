import type { IGunUserInstance } from "gun/types";

import { gun } from "@/lib/gun";

import { useAuthStore } from "./useAuthStore";

export const user: IGunUserInstance = gun.user().recall({ sessionStorage: true });

user.get("alias").on(v => useAuthStore.getState().setUsername(v));

gun.on("auth", async () => {
  const alias = (await user.get("alias")) as unknown as string;
  useAuthStore.getState().setUsername(alias);

  console.log(`signed in as ${alias}`);
});
