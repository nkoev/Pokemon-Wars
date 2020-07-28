import { pokemonsContainer } from "./common.js";
import { loadImage } from "./common.js";

export class Battle {
  constructor(hero, oponent) {
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", "battle");
    this.ctx = this.canvas.getContext("2d");
    this.hero = hero;
    this.oponent = oponent;
    this.attacker = hero.speed > oponent.speed ? hero : oponent;
  }

  async loadImages() {
    return Promise.all([
      loadImage(this.hero.backSprite),
      loadImage(this.oponent.frontSprite),
    ]).then((images) => {
      this.heroSprite = images[0];
      this.oponentSprite = images[1];
    });
  }

  async displayBattle() {
    await this.loadImages();
    pokemonsContainer.appendChild(this.canvas);
    // setTimeout(() => this.startBattle(), 2000);
    this.startBattle();
  }

  drawHero() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.heroSprite, this.x1, this.y1);

    this.ctx.strokeStyle = "#32CD32";
    this.ctx.beginPath();
    this.ctx.moveTo(30, 30);
    this.ctx.lineTo(80, 30);
    this.ctx.stroke();

    this.ctx.fillText(this.hero.name, 30, 20);
  }
  drawOponent() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.oponentSprite, this.x2, this.y2);

    this.ctx.strokeStyle = "#32CD32";
    this.ctx.beginPath();
    this.ctx.moveTo(200, 30);
    this.ctx.lineTo(250, 30);
    this.ctx.stroke();

    this.ctx.fillText(this.oponent.name, 200, 20);
  }

  drawOponents() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.heroSprite, this.x1, this.y1);
    this.ctx.drawImage(this.oponentSprite, this.x2, this.y2);

    this.ctx.strokeStyle = "#32CD32";
    this.ctx.beginPath();
    this.ctx.moveTo(30, 30);
    this.ctx.lineTo(80, 30);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(200, 30);
    this.ctx.lineTo(250, 30);
    this.ctx.stroke();

    this.ctx.fillText(this.hero.name, 30, 20);
    this.ctx.fillText(this.oponent.name, 200, 20);
  }

  startBattle() {
    this.x1 = 10;
    this.y1 = 50;
    this.x2 = 180;
    this.y2 = 50;
    this.drawOponents();
    if (this.hero.currentHP < 0) {
      alert("You loose!");
      return;
    }
    if (this.oponent.currentHP < 0) {
      alert("You win!");
      return;
    }
    if (this.attacker === this.oponent) {
      console.log("oponent attack");
      const damage =
        (this.oponent.attack / this.hero.defense) * Math.random() * 200;
      this.attacker = this.hero;
      if (damage > 0) {
        this.hero.currentHP -= damage;
        console.log(this.hero.currentHP);
        this.oponentAttack();
      } else {
        this.startBattle();
      }
    } else {
      console.log("hero attack");
      const damage =
        (this.hero.attack / this.oponent.defense) * Math.random() * 200;
      this.attacker = this.oponent;
      if (damage > 0) {
        this.oponent.currentHP -= damage;
        console.log(this.oponent.currentHP);
        this.heroAttack();
      } else {
        this.startBattle();
      }
    }
  }

  heroAttack() {
    this.drawOponents();
    this.x1 += 5;
    if (this.x1 < 100) {
      requestAnimationFrame(() => this.heroAttack());
    } else {
      const blinking = this.oponentBlink();
      setTimeout(() => {
        clearInterval(blinking);
        this.startBattle();
      }, 2000);
    }
  }

  oponentAttack() {
    this.drawOponents();
    this.x2 -= 5;
    if (this.x2 > 90) {
      requestAnimationFrame(() => this.oponentAttack());
    } else {
      const blinking = this.heroBlink();
      setTimeout(() => {
        clearInterval(blinking);
        this.startBattle();
      }, 2000);
    }
  }

  heroBlink() {
    let isHidden = true;
    return setInterval(() => {
      if (isHidden) {
        this.drawOponent();
      } else {
        this.drawOponents;
      }
      isHidden = !isHidden;
    }, 300);
  }

  oponentBlink() {
    let isHidden = true;
    return setInterval(() => {
      if (isHidden) {
        this.drawHero();
      } else {
        this.drawOponents;
      }
      isHidden = !isHidden;
    }, 300);
  }
}
