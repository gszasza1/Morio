import { ASSETS } from "../assetLoader";
import { GlobalConfig } from "../globalConfig";
import { PLAYER_DMG_TYPE } from "../player/damage";
import { BUFF_TYPES, Buffbase } from "./baseBuff";

export class PlayerDmgModifierBuff extends Buffbase {
  extraSpeed = 100;
  BUFF_DURATION: number = 3000000;
  constructor(config: GlobalConfig) {
    super(config, BUFF_TYPES.PLAYER_DMG_MODIFIER);
  }
  onPlayerCollide(): void {
    this.config.player.damage.setDmgType(
      PLAYER_DMG_TYPE.SPECIAL,
      this.BUFF_DURATION
    );
    this.object.disableBody(true, true);
    this.object.destroy();
  }
  addToScene(position: { x: number; y: number }): void {
    this.object = this.config.mainScene.physics.add.sprite(
      position.x,
      position.y,
      ASSETS.playerDmgModifierBuff
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
