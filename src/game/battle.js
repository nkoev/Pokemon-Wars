import { pokemonsContainer } from "./common.js";

export class Battle {
  constructor(hero, enemy, canvas) {
    this.canvas = canvas;
    this.hero = hero;
    this.enemy = enemy;
    this.heroSprite = hero.backSprite;
    this.enemySprite = enemy.frontSprite;
    this.attacker = hero.speed >= enemy.speed ? hero : enemy;
    this.x1 = 10;
    this.y1 = 50;
    this.x2 = 180;
    this.y2 = 50;
  }

  displayBattle() {
    this.canvas.clear();
    this.canvas.drawLine(
      50,
      30,
      50 + this.hero.currentHP / this.hero.hpCoeff,
      30
    );
    this.canvas.drawLine(
      200,
      30,
      200 + this.enemy.currentHP / this.enemy.hpCoeff,
      30
    );
    this.canvas.insertText(
      this.hero.name,
      this.canvas.width / 4,
      20,
      undefined,
      undefined,
      "center"
    );
    this.canvas.insertText(
      this.enemy.name,
      (this.canvas.width / 4) * 3,
      20,
      undefined,
      undefined,
      "center"
    );
    this.canvas.drawImage(this.heroSprite, this.x1, this.y1);
    this.canvas.drawImage(this.enemySprite, this.x2, this.y2);
  }

  displayHero() {
    this.canvas.clear();
    this.canvas.drawLine(
      50,
      30,
      50 + this.hero.currentHP / this.hero.hpCoeff,
      30
    );
    this.canvas.insertText(
      this.hero.name,
      this.canvas.width / 4,
      20,
      undefined,
      undefined,
      "center"
    );
    this.canvas.drawImage(this.heroSprite, this.x1, this.y1);
  }

  displayEnemy() {
    this.canvas.clear();
    this.canvas.drawLine(
      200,
      30,
      200 + this.enemy.currentHP / this.enemy.hpCoeff,
      30
    );
    this.canvas.insertText(
      this.enemy.name,
      (this.canvas.width / 4) * 3,
      20,
      undefined,
      undefined,
      "center"
    );
    this.canvas.drawImage(this.enemySprite, this.x2, this.y2);
  }

  displayResult(message) {
    this.canvas.insertText(
      message,
      this.canvas.width / 2,
      60,
      "red",
      "30px Arial",
      "center"
    );
    const replayButton = document.createElement("button");
    replayButton.setAttribute("id", "replay-button");
    replayButton.innerHTML = `Play Again`;
    pokemonsContainer.appendChild(replayButton);
    replayButton.addEventListener("click", () => this.endBattle());
  }

  endBattle() {
    const parent = document.getElementById("pokemons-container");
    const canvas = this.canvas.node;
    const button = document.getElementById("replay-button");
    parent.removeChild(canvas);
    parent.removeChild(button);
  }

  startBattle() {
    if (this.hero.currentHP === 0) {
      this.displayBattle();
      this.displayResult("You loose!");
      return;
    }
    if (this.enemy.currentHP === 0) {
      this.displayBattle();
      this.displayResult("You win!");
      return;
    }
    if (this.attacker === this.enemy) {
      console.log("enemy attack");
      const damage = this.hero.applyAttack(this.enemy.attack);
      this.attacker = this.hero;
      if (damage > 0) {
        this.hero.currentHP -= damage;
        if (this.hero.currentHP < 0) {
          this.hero.currentHP = 0;
        }
        console.log(this.hero.currentHP);
        this.enemyAttack();
      } else {
        this.startBattle();
      }
    } else {
      console.log("hero attack");
      const damage = this.enemy.applyAttack(this.hero.attack);
      if (damage > 0) {
        this.enemy.currentHP -= damage;
        if (this.enemy.currentHP < 0) {
          this.enemy.currentHP = 0;
        }
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
