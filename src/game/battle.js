import { finishBattle, replayBattle } from "./handlers.js";
import { replayEvent } from "./events.js";

export class Battle {
  constructor(
    hero,
    enemy,
    canvas,
    heroSprite,
    enemySprite,
    heroHealthBar,
    enemyHealthBar
  ) {
    this.hero = hero;
    this.enemy = enemy;
    this.canvas = canvas;
    this.heroSprite = heroSprite;
    this.enemySprite = enemySprite;
    this.heroHealthBar = heroHealthBar;
    this.enemyHealthBar = enemyHealthBar;
    this.attacker = hero.speed >= enemy.speed ? hero : enemy;
  }

  init() {
    this.canvas.clear();
    this.canvas.drawStatics();
    this.heroSprite.draw();
    this.enemySprite.draw();
    this.heroHealthBar.draw();
    this.enemyHealthBar.draw();
    setTimeout(() => this.run(), 1000);
  }

  run() {
    if (this.hero.currentHP === 0) {
      this.canvas.drawResults(false);
      finishBattle();
      replayEvent(replayBattle);
      return;
    }
    if (this.enemy.currentHP === 0) {
      this.canvas.drawResults(true);
      finishBattle();
      replayEvent(replayBattle);
      return;
    }
    if (this.attacker === this.enemy) {
      const damage = this.hero.applyAttack(this.enemy.attack);
      this.attacker = this.hero;
      if (damage > 0) {
        this.enemyAttack();
      } else {
        this.run();
      }
    } else {
      const damage = this.enemy.applyAttack(this.hero.attack);
      if (damage > 0) {
        this.heroAttack();
      } else {
        this.run();
      }
    }
  }

  heroAttack() {
    if (this.heroSprite.x < this.canvas.width / 3) {
      this.canvas.clear();
      this.canvas.drawStatics();
      this.heroSprite.draw();
      this.heroSprite.move(1);
      this.enemySprite.draw();
      this.heroHealthBar.draw();
      this.enemyHealthBar.draw();
      requestAnimationFrame(() => this.heroAttack());
    } else {
      const blinking = setInterval(() => {
        this.canvas.clear();
        this.canvas.drawStatics();
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
        this.canvas.clear();
        this.canvas.drawStatics();
        this.heroSprite.draw();
        this.enemySprite.draw();
        this.heroHealthBar.draw();
        this.enemyHealthBar.draw();
        this.run();
      }, 2000);
    }
  }

  enemyAttack() {
    if (this.enemySprite.x > this.canvas.width / 3) {
      this.canvas.clear();
      this.canvas.drawStatics();
      this.heroSprite.draw();
      this.enemySprite.draw();
      this.enemySprite.move(-1);
      this.heroHealthBar.draw();
      this.enemyHealthBar.draw();
      requestAnimationFrame(() => this.enemyAttack());
    } else {
      const blinking = setInterval(() => {
        this.canvas.clear();
        this.canvas.drawStatics();
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
        this.canvas.clear();
        this.canvas.drawStatics();
        this.heroSprite.draw();
        this.enemySprite.draw();
        this.heroHealthBar.draw();
        this.enemyHealthBar.draw();
        this.run();
      }, 2000);
    }
  }
}
