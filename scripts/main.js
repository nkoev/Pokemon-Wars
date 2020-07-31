import { displayPokemons, startBattle } from "./handlers.js";
import { battleEvent } from "./events.js";

displayPokemons();
setTimeout(() => battleEvent(startBattle), 500);
