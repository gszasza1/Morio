import { ASSETS } from "../assetLoader";
import { GlobalConfig } from "../globalConfig";
import { BUFF_TYPES, Buffbase } from "./baseBuff";

export class FlyBuff extends Buffbase {
  constructor(config: GlobalConfig) {
    super(config, BUFF_TYPES.FLY);
  }
  onPlayerCollide(): void {
    this.config.player.movement.isFlying = true;
    this.object.disableBody(true, true);
    setTimeout(() => {
      this.config.player.movement.isFlying = false;
      this.object.destroy();
    }, this.BUFF_DURATION);
  }
  addToScene(position: { x: number; y: number }): void {
    this.object = this.config.mainScene.physics.add.sprite(
      position.x,
      position.y,
      ASSETS.flyBuff
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
