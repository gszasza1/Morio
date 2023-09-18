import { ConfigSetter } from "../base/configSet";
import { Direction } from "../base/direction";
import { GlobalConfig } from "../globalConfig";

export abstract class BaseDmg extends ConfigSetter {
  object: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  speed = 300;
  constructor(config: GlobalConfig) {
    super(config);
  }

  abstract addToScene(position: {
    x: number;
    y: number;
    direction: Direction;
  }): void;
  abstract onEnemyCollide(): void;
  abstract onWorldCollide(): void;
}
