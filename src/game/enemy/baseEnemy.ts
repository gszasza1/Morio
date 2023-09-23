import { ConfigSetter } from "../base/configSet";
import { damageTakenFloating } from "../floating/damageTaken";
import { GlobalConfig } from "../globalConfig";

export abstract class BaseEnemy extends ConfigSetter {
  maxHealth = 4000;
  health = this.maxHealth;
  damage = 20;
  object: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  animationInterval: NodeJS.Timeout[] = [];
  healthBar: Phaser.GameObjects.Graphics;
  private alphaHolder: NodeJS.Timeout;
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
    this.addHealthBar();
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
    this.object.setAlpha(0.5, 0.5, 0.5, 0.5);

    this.alphaHolder = setTimeout(() => {
      this.object.setAlpha(1, 1, 1, 1);
    }, 300);
    if (this.health <= 0) {
      this.destroy();
    }
  }

  destroy() {
    clearTimeout(this.alphaHolder);
    this.animationInterval.forEach((interval) => clearInterval(interval));
    this.config.enemies.remove(this.object, true, true);
    this.healthBar.destroy();
    this.config.mainScene.events.off("postupdate", this.redrawHealthBar);
    this.object.destroy(true);
  }

  addHealthBar() {
    this.healthBar = new Phaser.GameObjects.Graphics(this.config.mainScene);

    this.healthBar.depth = 20;
    this.redrawHealthBar();
    this.config.mainScene.add.existing(this.healthBar);
    this.config.mainScene.events.on("postupdate", this.redrawHealthBar);
  }

  redrawHealthBar = () => {
    //Object destroyed handle
    if (!this.object.body) {
      return;
    }
    const healthBarWidth = 40;
    this.healthBar.clear();
    this.healthBar.fillStyle(0x000000);
    this.healthBar.fillRect(
      this.object.body.center.x - healthBarWidth / 2,
      this.object.body.position.y,
      healthBarWidth,
      4
    );
    const currentHealthBrWidth =
      healthBarWidth * (this.health / this.maxHealth);
    this.healthBar.fillStyle(0xff0000);
    this.healthBar.fillRect(
      this.object.body.center.x - healthBarWidth / 2,
      this.object.body.position.y,
      currentHealthBrWidth,
      4
    );
  };

  stop() {
    if (!this.config.gameIsOn) {
      this.destroy();
    }
  }
}
