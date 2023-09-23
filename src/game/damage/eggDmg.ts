import { ASSETS } from "../assetLoader";
import { GlobalConfig } from "../globalConfig";
import { findAngle } from "../util/findAngle";
import { toDeg, toRad } from "../util/toRad";
import { BaseDmg } from "./baseDmg";

export class EggDmg extends BaseDmg {
  speed: number = 300;
  lifespan = 1000;
  liveId: NodeJS.Timeout;
  scaleNumber = 0;
  dmg = 50;
  private scaleTimer: string | number | NodeJS.Timeout;
  onWorldCollide(): void {}

  onEnemyCollide(): void {
    this.config.player.health.loseHealth(this.dmg);
    clearTimeout(this.scaleTimer);
    super.onWorldCollide();
  }
  constructor(config: GlobalConfig) {
    super(config);
  }

  addToScene(position: { x: number; y: number }): void {
    this.object = this.config.mainScene.physics.add.sprite(
      position.x,
      position.y,
      ASSETS.egg
    );
    super.addToScene(position);
    this.object.body.setAllowGravity(true);
    const fireAngle = Math.random() * 45 + 30;
    const randomDirection = Math.random() > 0.5 ? -1 : 1;
    this.config.mainScene.physics.velocityFromRotation(
      toRad(fireAngle),
      randomDirection * this.speed,
      this.object.body.velocity
    );
    this.config.mainScene.physics.add.overlap(
      this.config.player.playerSprite,
      this.object,
      () => this.onEnemyCollide()
    );
    this.scaleEgg();
  }
  scaleEgg() {
    this.scaleTimer = setTimeout(() => {
      this.scaleNumber++;
      this.dmg += 50;
      this.object.scale += 0.2;
      if (this.scaleNumber > 5) {
        clearTimeout(this.scaleTimer);
        super.onWorldCollide();
      } else {
        if (this.config.gameIsOn) {
          this.scaleEgg();
        }
      }
    }, 1000);
  }
}
