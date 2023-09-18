import { ConfigSetter } from "../base/configSet";
import { GlobalConfig } from "../globalConfig";

export abstract class BaseEnemy extends ConfigSetter {
  health = 4000;
  damage = 20;
  object: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  constructor(config: GlobalConfig) {
    super(config);
  }

  abstract addToScene(position: { x: number; y: number }): void;
  abstract getDmg(dmgNumber: number): void;
  abstract fire(): void;
  abstract destroy(): void;
  abstract die(): void;
}

export enum ENEMY_ANIMATION {
  SHARK_FIRE = "SHARK_FIRE",
  SHARK_FIRE_STOP = "SHARK_FIRE_STOP",
}
