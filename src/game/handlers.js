import { displayBattle } from "./views.js";

export const battleHandler = (event) => {
  displayBattle(event.target.id);
};
