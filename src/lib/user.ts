import "gun/axe";
import "gun/sea";

import GUN from "gun/gun";

import { useAuthStore } from "../modules/auth/useAuthStore";

export const db = GUN();
export const user = db.user().recall({ sessionStorage: true });

user.get("alias").on(v => useAuthStore.getState().setUsername(v));

// @ts-ignore
db.on("auth", async () => {
  const alias = (await user.get("alias")) as unknown as string;
  useAuthStore.getState().setUsername("alias");

  console.log(`signed in as ${alias}`);
});
