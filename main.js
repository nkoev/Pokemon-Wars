import { displayPokemons, startBattle } from "./scripts/handlers.js";
import { battleEvent } from "./scripts/events.js";

displayPokemons();
setTimeout(() => battleEvent(startBattle), 500);
