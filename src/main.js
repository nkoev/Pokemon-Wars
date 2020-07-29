import { displayPokemons } from "./game/handlers.js";
import { battleHandler } from "./game/handlers.js";
import { battleEvent } from "./game/events.js";

displayPokemons();
setTimeout(() => battleEvent(battleHandler), 1000);
