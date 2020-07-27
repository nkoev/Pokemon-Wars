import { Pokemon } from "./common.js";

export const getPokemons = async () => {
  const pokemonsList = [];
  for (let i = 1; i <= 20; i++) {
    const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    pokemonsList.push(await pokemonData.json());
  }
  return (await Promise.all(pokemonsList)).map(
    (pokemonData, index) => new Pokemon(pokemonData, index)
  );
};
