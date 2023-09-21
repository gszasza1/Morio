import { ConfigSetter } from "../base/configSet";
import { damageTakenFloating } from "../floating/damageTaken";
import { GlobalConfig } from "../globalConfig";

export abstract class BaseEnemy extends ConfigSetter {
  health = 4000;
  damage = 20;
  object: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  animationInterval: NodeJS.Timeout[] = [];
  constructor(config: GlobalConfig) {
    super(config);
  }

  addToScene(position: { x: number; y: number }) {
    this.object.body.setAllowGravity(true);
    this.config.enemies.add(this.object);
    this.object.body.collideWorldBounds = true;
    this.object.body.setCollideWorldBounds(true);
    this.object.depth = 10;
    this.object?.setData("object", this);
  }
  abstract fire(): void;
  getDmg(dmgNumber: number): void {
    this.health -= dmgNumber;
    damageTakenFloating(
      this.config.mainScene,
      {
        x: this.object.body.center.x,
        y: this.object.body.center.y,
      },
      dmgNumber
    );
    if (this.health <= 0) {
      this.destroy();
    }
  }
  destroy() {
    this.animationInterval.forEach((interval) => clearInterval(interval));
    this.config.enemies.remove(this.object, true, true);
    this.object.destroy(true);
  }

  stop() {
    if (!this.config.gameIsOn) {
      this.destroy();
    }
  }
}
