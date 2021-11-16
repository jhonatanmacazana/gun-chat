import "gun/axe";
import "gun/sea";

import GUN from "gun/gun";

import { useAuthStore } from "../modules/auth/useAuthStore";
import { GUN_LOCAL_RELAY } from "./constants";

export const db = GUN({
  peers: [`${GUN_LOCAL_RELAY}/gun`],
});

export const user = db.user().recall({ sessionStorage: true });

user.get("alias").on(v => useAuthStore.getState().setUsername(v));

// @ts-ignore
db.on("auth", async () => {
  const alias = (await user.get("alias")) as unknown as string;
  useAuthStore.getState().setUsername(alias);

  console.log(`signed in as ${alias}`);
});
