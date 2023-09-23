import { ConfigSetter } from "../base/configSet";
import { Direction } from "../base/direction";
import { GlobalConfig } from "../globalConfig";

export abstract class BaseDmg extends ConfigSetter {
  object: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  speed = 300;
  dmg = 100;
  constructor(config: GlobalConfig) {
    super(config);
  }

  addToScene(position: { x: number; y: number; direction?: Direction }) {
    this.object.body.setAllowGravity(false);
    this.object.body.onCollide = true;
    this.object.body.onWorldBounds = true;
    this.object.body.collideWorldBounds = true;
    this.object.body.setCollideWorldBounds(true);
    this.object.body.world.on("worldbounds", this.worldCollideEvent);
  }
  worldCollideEvent = (body: {
    gameObject: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  }) => {
    if (body.gameObject === this.object) {
      this.onWorldCollide();
    }
  };
  onEnemyCollide(): void {
    this.onWorldCollide();
  }
  onWorldCollide(): void {
    this.object.disableBody(true, true);
    this.object.destroy(true);
  }
}
