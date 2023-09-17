import { ConfigSetter } from "../base/configSet";
import { GlobalConfig } from "../globalConfig";

export abstract class BaseDmg extends ConfigSetter {
  object: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  speed = 300;
  constructor(config: GlobalConfig) {
    super(config);
  }

  abstract addToScene(position: { x: number; y: number }): void;
  abstract onEnemyCollide(): void;
  abstract onWorldCollide(): void;
}
