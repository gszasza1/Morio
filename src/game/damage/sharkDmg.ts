import { ASSETS } from "../assetLoader";
import { GlobalConfig } from "../globalConfig";
import { findAngle } from "../util/findAngle";
import { toDeg } from "../util/toRad";
import { BaseDmg } from "./baseDmg";

const SHARK_DMG = 100;

export class SharkDmg extends BaseDmg {
  speed: number = 500;
  lifespan = 1000;
  liveId: NodeJS.Timeout;
  onWorldCollide(): void {
    if (this.liveId) {
      clearTimeout(this.liveId);
      this.liveId = undefined;
    }
    super.onWorldCollide();
  }

  onEnemyCollide(): void {
    this.config.player.health.loseHealth(SHARK_DMG);
    super.onEnemyCollide();
  }
  constructor(config: GlobalConfig) {
    super(config);
  }

  addToScene(position: { x: number; y: number }): void {
    const playerPosition = this.config.player.playerSprite.body.center;
    if (playerPosition.x > position.x) {
      return;
    }
    this.object = this.config.mainScene.physics.add.sprite(
      position.x,
      position.y,
      ASSETS.laserBullet
    );
    super.addToScene(position);
    this.liveId = setTimeout(() => {
      this.liveId = undefined;
      this.onWorldCollide();
    }, this.lifespan);
    const sharkPosition = position;
    const angleInRadian = findAngle(
      { x: playerPosition.x, y: playerPosition.y },
      { x: sharkPosition.x, y: sharkPosition.y },
      { x: playerPosition.x, y: sharkPosition.y }
    );
    this.object.setAngle(toDeg(angleInRadian));
    this.config.mainScene.physics.velocityFromRotation(
      angleInRadian,
      -this.speed,
      this.object.body.velocity
    );
    this.config.mainScene.physics.add.overlap(
      this.config.player.playerSprite,
      this.object,
      () => this.onEnemyCollide()
    );
  }
}
