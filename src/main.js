import { displayPokemons } from "./game/views.js";
import { battleHandler } from "./game/handlers.js";
import { startBattle } from "./game/events.js";

displayPokemons();
setTimeout(() => startBattle(battleHandler), 1000);
