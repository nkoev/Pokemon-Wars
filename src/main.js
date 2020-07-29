import { displayPokemons } from "./game/handlers.js";
import { battleHandler, replayHandler } from "./game/handlers.js";
import { battleEvent } from "./game/events.js";
import { createCanvas } from "./game/battle1.js";

displayPokemons();
setTimeout(() => battleEvent(battleHandler), 1000);
