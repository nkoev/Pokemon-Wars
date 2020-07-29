import { Battle } from "./battle.js";
import { getPokemons } from "./data-service.js";
import { listPokemon } from "./views.js";
import { Canvas } from "./canvas.js";
import { pokemonsContainer } from "./common.js";

let pokemonsList;

export const displayPokemons = async () => {
  pokemonsList = await getPokemons();
  pokemonsList.forEach(listPokemon);
};

export const battleHandler = (event) => {
  const hero = pokemonsList[+event.target.id];
  const enemy = selectOponent(+event.target.id);
  const canvas = document.createElement("canvas");
  canvas.setAttribute("id", "battle");
  const context = canvas.getContext("2d");

  Promise.all([
    loadImage(hero.backSprite),
    loadImage(enemy.frontSprite),
    loadImage("../../assets/images/background.jpg"),
  ]).then((images) => {
    pokemonsContainer.appendChild(canvas);
    const canvasService = new Canvas(canvas, context);
    const battle = new Battle(
      hero,
      enemy,
      images[0],
      images[1],
      images[2],
      canvasService
    );
    battle.displayBattle();
    setTimeout(() => battle.startBattle(), 1000);
  });
};

export const replayHandler = () => {
  const canvas = document.getElementById("canvas");
  document.removeChild(canvas);
};

const selectOponent = (heroId) => {
  const remainingPokemons = pokemonsList.filter(({ id }) => id !== heroId);
  return remainingPokemons[
    Math.floor(Math.random() * remainingPokemons.length)
  ];
};

const loadImage = (url) => {
  return new Promise((fulfill) => {
    let imageObj = new Image();
    imageObj.onload = () => fulfill(imageObj);
    imageObj.src = url;
  });
};
