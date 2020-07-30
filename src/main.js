import { displayPokemons, startBattle, endBattle } from "./game/handlers.js";
import { battleEvent, replayEvent } from "./game/events.js";

displayPokemons();
setTimeout(() => battleEvent(startBattle), 500);
replayEvent(endBattle);
