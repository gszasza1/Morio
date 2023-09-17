import { ConfigSetter } from "../base/configSet";
import { GlobalConfig } from "../globalConfig";

export abstract class Buffbase extends ConfigSetter {
  BUFF_DURATION = 2000;
  object: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor(config: GlobalConfig, public type: BUFF_TYPES) {
    super(config);
  }

  abstract addToScene(position: { x: number; y: number }): void;
  abstract onPlayerCollide(): void;
}

export enum BUFF_TYPES {
  SPEED_UP = "SPEED_UP",
  FLY = "FLY",
}
