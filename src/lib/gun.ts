import "gun/axe";
import "gun/sea";

import GUN from "gun/gun";

import { GUN_LOCAL_RELAY } from "./constants";

export const gun = GUN({
  peers: [`${GUN_LOCAL_RELAY}/gun`],
});
