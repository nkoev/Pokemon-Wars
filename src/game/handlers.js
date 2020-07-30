import { Battle } from "./battle.js";
import { listPokemon } from "./views.js";
import { Canvas } from "./canvas.js";
import { pokemonsContainer, backgroundUrl } from "./common.js";
import { getPokemons } from "./data-service.js";

export const displayPokemons = async () => {
  (await getPokemons()).forEach(listPokemon);
};

export const battleHandler = async (event) => {
  const pokemonsList = await getPokemons();
  const hero = pokemonsList[+event.target.id];
  const enemy = selectOponent(+event.target.id, pokemonsList);

  const background = new Image();
  background.setAttribute("src", backgroundUrl);
  background.onload = () => {
    const canvas = new Canvas(background);
    canvas.appendTo(pokemonsContainer);
    canvas.setAttribute("id", "battle");

    const battle = new Battle(hero, enemy, canvas);

    battle.displayBattle();
    setTimeout(() => battle.startBattle(), 1000);
  };
};

const selectOponent = (heroId, pokemonsList) => {
  const remainingPokemons = pokemonsList.filter(({ id }) => id !== heroId);
  return remainingPokemons[
    Math.floor(Math.random() * remainingPokemons.length)
  ];
};
