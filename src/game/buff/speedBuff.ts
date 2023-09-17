import { ASSETS } from "../assetLoader";
import { GlobalConfig } from "../globalConfig";
import { BUFF_TYPES, Buffbase } from "./baseBuff";

export class SpeedBuff extends Buffbase {
  extraSpeed = 100;
  constructor(config: GlobalConfig) {
    super(config, BUFF_TYPES.SPEED_UP);
  }
  onPlayerCollide(): void {
    this.config.player.movement.addXSpeed(this.extraSpeed);
    this.object.disableBody(true, true);
    setTimeout(() => {
      this.config.player.movement.addXSpeed(-this.extraSpeed);
      this.object.destroy();
    }, this.BUFF_DURATION);
  }
  addToScene(position: { x: number; y: number }): void {
    this.object = this.config.mainScene.physics.add.sprite(
      position.x,
      position.y,
      ASSETS.speedBuff
    );
    this.object.body.setAllowGravity(true);
    this.object.body.onCollide = true;
    this.object.body.setCollideWorldBounds(true);
    this.config.mainScene.physics.add.overlap(
      this.config.player.playerSprite,
      this.object,
      () => this.onPlayerCollide()
    );
  }
}
