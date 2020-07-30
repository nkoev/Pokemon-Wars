import { Battle } from "./battle.js";
import { listPokemon } from "./views.js";
import { Canvas } from "./canvas.js";
import { backgroundUrl, replayButton, battleCanvas } from "./common.js";
import { getPokemons } from "./data-service.js";

export const displayPokemons = async () => {
  (await getPokemons()).forEach(listPokemon);
};

export const startBattle = async (event) => {
  const pokemonsList = await getPokemons();
  const hero = pokemonsList[+event.target.id];
  const enemy = selectOponent(+event.target.id, pokemonsList);

  const background = new Image();
  background.setAttribute("src", backgroundUrl);
  background.onload = () => {
    battleCanvas.style.display = "inline-block";
    const canvas = new Canvas(battleCanvas, background);
    const battle = new Battle(hero, enemy, canvas);

    battle.displayBattle();
    setTimeout(() => battle.run(), 1000);
  };
};

export const endBattle = () => {
  battleCanvas.style.display = "none";
  replayButton.style.display = "none";
};

const selectOponent = (heroId, pokemonsList) => {
  const remainingPokemons = pokemonsList.filter(({ id }) => id !== heroId);
  return remainingPokemons[
    Math.floor(Math.random() * remainingPokemons.length)
  ];
};
