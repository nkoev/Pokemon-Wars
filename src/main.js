import { displayPokemons } from "./game/handlers.js";
import { battleHandler } from "./game/handlers.js";
import { startBattle } from "./game/events.js";

displayPokemons();
setTimeout(() => startBattle(battleHandler), 1000);
