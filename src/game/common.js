export const pokemonsContainer = document.getElementById("pokemons-container");
export const body = document.getElementsByTagName("body")[0];

export class Pokemon {
  constructor(data, id) {
    this.id = id;
    this.frontSprite = data.sprites.front_default;
    this.backSprite = data.sprites.back_default;
    this.name = data.name;
    this.ability = data.abilities.find(
      (ability) => !ability.is_hiden
    ).ability.name;
    this.moves = data.moves.map((record) => record.move.name);
    this.hp = data.stats[0].base_stat;
    this.currentHP = data.stats[0].base_stat;
    this.attack = data.stats[1].base_stat;
    this.defense = data.stats[2].base_stat;
    this.specialAttack = data.stats[3].base_stat;
    this.specialDefense = data.stats[4].base_stat;
    this.speed = data.stats[5].base_stat;
  }
}
