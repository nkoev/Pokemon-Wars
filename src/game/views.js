import { pokemonsContainer } from "./common.js";

export const listPokemon = (pokemon) => {
  const card = document.createElement("div");
  card.setAttribute("class", "card");

  const sprite = pokemon.frontSprite;
  sprite.setAttribute("class", "sprite");
  sprite.setAttribute("id", pokemon.id);

  const info = document.createElement("ul");
  info.innerHTML = `<li>Name: <span class="stat-value">${pokemon.name}</li>
  <li>Ability: <span class="stat-value">${pokemon.ability}</span></li>
  <li>Move 1: <span class="stat-value">${pokemon.moves[0]}</span></li>
  <li>Move 2: <span class="stat-value">${pokemon.moves[1]}</span></li>
  <li>Move 3: <span class="stat-value">${pokemon.moves[2]}</span></li>
  <li>Move 4: <span class="stat-value">${pokemon.moves[3]}</span></li>
  <li>Speed: <span class="stat-value">${pokemon.speed}</span></li>
  <li>Special Defense: <span class="stat-value">${pokemon.specialDefense}</span></li>
  <li>Special Attack: <span class="stat-value">${pokemon.specialAttack}</span></li>
  <li>Defense: <span class="stat-value">${pokemon.defense}</span></li>
  <li>Attack: <span class="stat-value">${pokemon.attack}</span></li>
  <li>HP: <span class="stat-value">${pokemon.hp}</span></li>`;

  card.appendChild(sprite);
  card.appendChild(info);
  pokemonsContainer.appendChild(card);
};
