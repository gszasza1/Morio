import { ANIMATIONS } from "../animations";
import { ASSETS } from "../assetLoader";
import { Direction } from "../base/direction";
import { EggDmg } from "../damage/eggDmg";
import { SharkDmg } from "../damage/sharkDmg";
import { GlobalConfig } from "../globalConfig";
import { BaseEnemy } from "./baseEnemy";

export class R2D2Enemy extends BaseEnemy {
  maxHealth: number = 5000;
  private fireHolder: string | number | NodeJS.Timeout;
  constructor(config: GlobalConfig) {
    super(config);
  }

  addToScene(position: { x: number; y: number }): void {
    this.object = this.config.mainScene.physics.add.sprite(
      position.x,
      position.y,
      ASSETS.r2d2
    );
    super.addToScene(position);
    this.randomMove();
    this.fire()
  }
  randomMove() {
    const randomDirection = Math.random() > 0.5 ? -1 : 1;
    this.object.flipX = randomDirection === 1;
    const randomSpeed = Math.random() * 100 + 100;
    const randomNextMove = Math.random() * 1000 + 1000;
    this.object.setVelocityX(randomSpeed * randomDirection);
    this.animationInterval = [];
    const nextMove = setTimeout(() => this.randomMove(), randomNextMove);
    this.animationInterval.push(nextMove);
  }

  fire(): void {
    const randomDmgTime = Math.random() * 1000 + 2000;
    this.fireHolder = setTimeout(() => {
      this.fire();
    }, randomDmgTime);
    const dmg = new EggDmg(this.config);
    dmg.addToScene({
      x: this.object.body.center.x,
      y: this.object.body.center.y,
    });
  }

  destroy(): void {
    clearTimeout(this.fireHolder);
    super.destroy();
  }
}
