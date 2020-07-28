import { pokemonsContainer } from "./common.js";

export class Battle {
  constructor(hero, enemy, heroSprite, enemySprite, background, canvasService) {
    this.canvasService = canvasService;
    this.hero = hero;
    this.enemy = enemy;
    this.heroSprite = heroSprite;
    this.enemySprite = enemySprite;
    this.background = background;
    this.attacker = hero.speed > enemy.speed ? hero : enemy;
    this.x1 = 10;
    this.y1 = 50;
    this.x2 = 180;
    this.y2 = 50;
  }

  displayBattle() {
    this.canvasService.clear();
    this.canvasService.drawBackground(this.background, 0, 0);
    this.canvasService.drawLine(30, 30, 80, 30);
    this.canvasService.drawLine(200, 30, 250, 30);
    this.canvasService.insertText(this.hero.name, 30, 20);
    this.canvasService.insertText(this.enemy.name, 200, 20);
    this.canvasService.drawImage(this.heroSprite, this.x1, this.y1);
    this.canvasService.drawImage(this.enemySprite, this.x2, this.y2);
  }

  displayHero() {
    this.canvasService.clear();
    this.canvasService.drawBackground(this.background, 0, 0);
    this.canvasService.drawLine(30, 30, 80, 30);
    this.canvasService.insertText(this.hero.name, 30, 20);
    this.canvasService.drawImage(this.heroSprite, this.x1, this.y1);
  }

  displayEnemy() {
    this.canvasService.clear();
    this.canvasService.drawBackground(this.background, 0, 0);
    this.canvasService.drawLine(200, 30, 250, 30);
    this.canvasService.insertText(this.enemy.name, 200, 20);
    this.canvasService.drawImage(this.enemySprite, this.x2, this.y2);
  }

  startBattle() {
    if (this.hero.currentHP < 0) {
      this.displayBattle();
      alert("You loose!");
      return;
    }
    if (this.enemy.currentHP < 0) {
      this.displayBattle();
      alert("You win!");
      return;
    }
    if (this.attacker === this.enemy) {
      console.log("enemy attack");
      const damage =
        (this.enemy.attack / this.hero.defense) * Math.random() * 200;
      this.attacker = this.hero;
      if (damage > 0) {
        this.hero.currentHP -= damage;
        console.log(this.hero.currentHP);
        this.enemyAttack();
      } else {
        this.startBattle();
      }
    } else {
      console.log("hero attack");
      const damage =
        (this.hero.attack / this.enemy.defense) * Math.random() * 200;
      this.attacker = this.enemy;
      if (damage > 0) {
        this.enemy.currentHP -= damage;
        console.log(this.enemy.currentHP);
        this.heroAttack();
      } else {
        this.startBattle();
      }
    }
  }

  heroAttack() {
    this.displayBattle();
    this.x1 += 5;
    if (this.x1 < 100) {
      requestAnimationFrame(() => this.heroAttack());
    } else {
      const blinking = this.enemyBlink();
      setTimeout(() => {
        clearInterval(blinking);
        this.x1 = 10;
        this.startBattle();
      }, 2000);
    }
  }

  enemyAttack() {
    this.displayBattle();
    this.x2 -= 5;
    if (this.x2 > 90) {
      requestAnimationFrame(() => this.enemyAttack());
    } else {
      const blinking = this.heroBlink();
      setTimeout(() => {
        clearInterval(blinking);
        this.x2 = 180;
        this.startBattle();
      }, 2000);
    }
  }

  heroBlink() {
    let isHidden = true;
    return setInterval(() => {
      if (isHidden) {
        this.displayEnemy();
      } else {
        this.displayBattle();
      }
      isHidden = !isHidden;
    }, 300);
  }

  enemyBlink() {
    let isHidden = true;
    return setInterval(() => {
      if (isHidden) {
        this.displayHero();
      } else {
        this.displayBattle();
      }
      isHidden = !isHidden;
    }, 300);
  }
}
