import { pokemonsContainer } from "./common.js";
import { getPokemons } from "./data-service.js";
let pokemonsList;

export const listPokemon = (pokemon) => {
  const card = document.createElement("div");
  card.setAttribute("id", pokemon.name);
  card.setAttribute("class", "card");

  const sprite = document.createElement("img");
  sprite.setAttribute("src", pokemon.frontSprite);
  sprite.setAttribute("id", pokemon.id);
  sprite.setAttribute("class", "avatar");

  const info = document.createElement("ul");
  info.innerHTML = `<li>Name: ${pokemon.name}</li>
  <li>Ability: ${pokemon.ability}</li>
  <li>Move 1: ${pokemon.moves[0]}</li>
  <li>Move 2: ${pokemon.moves[1]}</li>
  <li>Move 3: ${pokemon.moves[2]}</li>
  <li>Move 4: ${pokemon.moves[3]}</li>
  <li>Speed: ${pokemon.speed}</li>
  <li>Special Defense: ${pokemon.specialDefense}</li>
  <li>Special Attack: ${pokemon.specialAttack}</li>
  <li>Defense: ${pokemon.defense}</li>
  <li>Attack: ${pokemon.attack}</li>
  <li>HP: ${pokemon.hp}</li>`;

  card.appendChild(sprite);
  card.appendChild(info);
  pokemonsContainer.appendChild(card);
};

export const displayPokemons = async () => {
  pokemonsList = await getPokemons();
  pokemonsList.forEach(listPokemon);
};
