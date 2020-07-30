export class Pokemon {
  constructor(data, id) {
    this.id = id;
    this.frontSprite = new Image();
    this.frontSprite.src = data.sprites.front_default;
    this.backSprite = new Image();
    this.backSprite.src = data.sprites.back_default;
    this.name = data.name;
    this.ability = data.abilities.find(
      (ability) => !ability.is_hiden
    ).ability.name;
    this.moves = data.moves.map((record) => record.move.name);
    this.hp = data.stats[0].base_stat;
    this.hpCoeff = data.stats[0].base_stat / 50;
    this.currentHP = data.stats[0].base_stat;
    this.attack = data.stats[1].base_stat;
    this.defense = data.stats[2].base_stat;
    this.specialAttack = data.stats[3].base_stat;
    this.specialDefense = data.stats[4].base_stat;
    this.speed = data.stats[5].base_stat;
  }

  applyAttack(enemyAttack) {
    const damage = (enemyAttack / this.defense) * Math.random() * 200;

    if (damage > 0) {
      this.currentHP -= damage;
    }
    if (this.currentHP < 0) {
      this.currentHP = 0;
    }
    return damage;
  }
}
