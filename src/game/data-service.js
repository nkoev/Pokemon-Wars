import { Pokemon } from "./pokemon.js";
import { baseUrl } from "./common.js";

export const getPokemons = async () => {
  const pokemonsList = [];
  for (let i = 1; i <= 30; i++) {
    const pokemonData = await fetch(baseUrl + i);
    pokemonsList.push(await pokemonData.json());
  }
  return (await Promise.all(pokemonsList)).map(
    (pokemonData, index) => new Pokemon(pokemonData, index)
  );
};
