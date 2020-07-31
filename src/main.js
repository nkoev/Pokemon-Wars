import { displayPokemons, startBattle } from "./game/handlers.js";
import { battleEvent } from "./game/events.js";

displayPokemons();
setTimeout(() => battleEvent(startBattle), 500);
