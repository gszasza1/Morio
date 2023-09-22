import { ANIMATIONS } from "../animations";
import { ASSETS } from "../assetLoader";
import { Direction } from "../base/direction";
import { SharkDmg } from "../damage/sharkDmg";
import { GlobalConfig } from "../globalConfig";
import { BaseEnemy } from "./baseEnemy";

export class R2D2Enemy extends BaseEnemy {
  maxHealth: number = 5000;
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
    const dmg = new SharkDmg(this.config);
    dmg.addToScene({
      x: this.object.body.center.x,
      y: this.object.body.center.y,
    });
  }

  destroy(): void {
    super.destroy();
  }
}
