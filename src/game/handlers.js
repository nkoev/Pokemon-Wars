import { displayBattle } from "./views.js";
import { Battle } from "./battle.js";
import { getPokemons } from "./data-service.js";
import { listPokemon } from "./views.js";

let pokemonsList;

export const displayPokemons = async () => {
  pokemonsList = await getPokemons();
  pokemonsList.forEach(listPokemon);
};

export const battleHandler = (event) => {
  const hero = pokemonsList[+event.target.id];
  const oponent = selectOponent(+event.target.id);
  const battle = new Battle(hero, oponent);
  battle.displayBattle();
};

const selectOponent = (heroId) => {
  const remainingPokemons = pokemonsList.filter(({ id }) => id !== heroId);
  return remainingPokemons[
    Math.floor(Math.random() * remainingPokemons.length)
  ];
};
