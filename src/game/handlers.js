import { Battle } from "./battle.js";
import { listPokemon } from "./views.js";
import { backgroundUrl, replayButton, battleCanvas } from "./common.js";
import { getPokemons } from "./data-service.js";
import { Canvas, Sprite, HealthBar } from "./canvas.js";

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
    const heroSprite = new Sprite(10, 50, hero.backSprite);
    const enemySprite = new Sprite(190, 50, enemy.frontSprite);
    const heroHealthBar = new HealthBar(50, 30, 50, 5);
    const enemyHealthBar = new HealthBar(200, 30, 50, 5);
    const canvas = new Canvas(hero.name, enemy.name, background);
    const battle = new Battle(
      hero,
      enemy,
      canvas,
      heroSprite,
      enemySprite,
      heroHealthBar,
      enemyHealthBar
    );
    battle.init();
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
