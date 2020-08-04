import { displayPokemons, startBattle } from "./scripts/handlers.js";
import { battleEvent } from "./scripts/events.js";

displayPokemons().then(() => battleEvent(startBattle));
