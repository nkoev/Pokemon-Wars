import { finishBattle } from "./handlers.js";
import { hitSound } from "./common.js";

export class Battle {
  constructor(
    hero,
    enemy,
    statics,
    heroSprite,
    enemySprite,
    heroHealthBar,
    enemyHealthBar
  ) {
    this.hero = hero;
    this.enemy = enemy;
    this.statics = statics;
    this.heroSprite = heroSprite;
    this.enemySprite = enemySprite;
    this.heroHealthBar = heroHealthBar;
    this.enemyHealthBar = enemyHealthBar;
    this.attacker = hero.speed >= enemy.speed ? hero : enemy;
  }

  init() {
    this.statics.clearCanvas();
    this.statics.draw();
    this.heroSprite.draw();
    this.enemySprite.draw();
    this.heroHealthBar.draw();
    this.enemyHealthBar.draw();
    setTimeout(() => this.run(), 1000);
  }

  run() {
    if (this.hero.currentHP === 0) {
      this.statics.drawResults(false);
      finishBattle();
      return;
    }
    if (this.enemy.currentHP === 0) {
      this.statics.drawResults(true);
      finishBattle();
      return;
    }
    if (this.attacker === this.enemy) {
      const damage = this.hero.applyAttack(this.enemy.attack);
      this.attacker = this.hero;
      damage ? this.enemyAttack() : this.run();
    } else {
      const damage = this.enemy.applyAttack(this.hero.attack);
      this.attacker = this.enemy;
      damage ? this.heroAttack() : this.run();
    }
  }

  heroAttack() {
    if (this.heroSprite.x < this.statics.width / 3) {
      this.statics.clearCanvas();
      this.statics.draw();
      this.heroSprite.draw();
      this.heroSprite.move(1);
      this.enemySprite.draw();
      this.heroHealthBar.draw();
      this.enemyHealthBar.draw();
      requestAnimationFrame(() => this.heroAttack());
    } else {
      hitSound.play();
      const blinking = setInterval(() => {
        this.statics.clearCanvas();
        this.statics.draw();
        this.heroSprite.draw();
        this.enemySprite.drawBlinking();
        this.heroHealthBar.draw();
        this.enemyHealthBar.draw();
      }, 300);
      setTimeout(() => {
        clearInterval(blinking);
        this.enemySprite.restoreImage();
        this.heroSprite.restorePosition();
        this.enemyHealthBar.update(this.enemy.currentHP / this.enemy.hpCoeff);
        this.statics.clearCanvas();
        this.statics.draw();
        this.heroSprite.draw();
        this.enemySprite.draw();
        this.heroHealthBar.draw();
        this.enemyHealthBar.draw();
        this.run();
      }, 2000);
    }
  }

  enemyAttack() {
    if (this.enemySprite.x > this.statics.width / 3) {
      this.statics.clearCanvas();
      this.statics.draw();
      this.heroSprite.draw();
      this.enemySprite.draw();
      this.enemySprite.move(-1);
      this.heroHealthBar.draw();
      this.enemyHealthBar.draw();
      requestAnimationFrame(() => this.enemyAttack());
    } else {
      hitSound.play();
      const blinking = setInterval(() => {
        this.statics.clearCanvas();
        this.statics.draw();
        this.enemySprite.draw();
        this.heroSprite.drawBlinking();
        this.heroHealthBar.draw();
        this.enemyHealthBar.draw();
      }, 300);
      setTimeout(() => {
        clearInterval(blinking);
        this.enemySprite.restorePosition();
        this.heroSprite.restoreImage();
        this.heroHealthBar.update(this.hero.currentHP / this.hero.hpCoeff);
        this.statics.clearCanvas();
        this.statics.draw();
        this.heroSprite.draw();
        this.enemySprite.draw();
        this.heroHealthBar.draw();
        this.enemyHealthBar.draw();
        this.run();
      }, 2000);
    }
  }
}
