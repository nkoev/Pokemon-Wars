import { Battle } from "./battle.js";
import {
  listPokemon,
  showReplayButton,
  showCanvas,
  removeCanvas,
  removeReplayButton,
} from "./views.js";
import { backgroundUrl, music } from "./common.js";
import { getPokemons } from "./data-service.js";
import { Statics } from "./canvas-elements/statics.js";
import { Sprite } from "./canvas-elements/sprite.js";
import { HealthBar } from "./canvas-elements/health-bar.js";
import { replayEvent } from "./events.js";

export const displayPokemons = async () => {
  (await getPokemons()).forEach(listPokemon);
};

export const startBattle = async (event) => {
  const pokemonsList = await getPokemons();
  const heroId = +event.target.id;
  const hero = pokemonsList[heroId];
  const remainingPokemons = pokemonsList.filter(({ id }) => id !== heroId);
  const enemyId = Math.floor(Math.random() * remainingPokemons.length);
  const enemy = remainingPokemons[enemyId];

  showCanvas();

  const background = new Image();
  background.setAttribute("src", backgroundUrl);
  background.onload = () => {
    const heroSprite = new Sprite(10, 50, hero.backSprite);
    const enemySprite = new Sprite(190, 50, enemy.frontSprite);
    const heroHealthBar = new HealthBar(50, 30, 50, 5);
    const enemyHealthBar = new HealthBar(200, 30, 50, 5);
    const statics = new Statics(hero.name, enemy.name, background);
    const battle = new Battle(
      hero,
      enemy,
      statics,
      heroSprite,
      enemySprite,
      heroHealthBar,
      enemyHealthBar
    );
    music.load();
    music.volume = 0.05;
    music.play();
    battle.init();
  };
};

export const finishBattle = () => {
  showReplayButton();
  replayEvent(replayBattle);
};

export const replayBattle = () => {
  music.pause();
  removeCanvas();
  removeReplayButton();
};
