import { useAuthStore } from "../modules/auth/useAuthStore";
import { gun } from "./gun";

export const user = gun.user().recall({ sessionStorage: true });

user.get("alias").on(v => useAuthStore.getState().setUsername(v));

// @ts-ignore
gun.on("auth", async () => {
  const alias = (await user.get("alias")) as unknown as string;
  useAuthStore.getState().setUsername(alias);

  console.log(`signed in as ${alias}`);
});
