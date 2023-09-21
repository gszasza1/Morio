import { ASSETS } from "../assetLoader";
import { Direction } from "../base/direction";
import { BaseEnemy } from "../enemy/baseEnemy";
import { GlobalConfig } from "../globalConfig";
import { isBody } from "../util/isBody";
import { toRad } from "../util/toRad";
import { BaseDmg } from "./baseDmg";

export class PlayerRocketDmg extends BaseDmg {
  smoke: Phaser.GameObjects.Particles.ParticleEmitter;
  dmg: number = 200;
  onWorldCollide(): void {
    this.smoke.killAll();
    this.smoke.destroy();
    super.onWorldCollide();
  }

  onEnemyCollide(
    e?: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
  ): void {
    if (!isBody(e)) {
      return;
    }
    const enemyInstance = e.getData("object") as BaseEnemy | undefined;
    if (enemyInstance) {
      enemyInstance.getDmg(this.dmg);
      this.onWorldCollide();
    }
  }
  constructor(config: GlobalConfig) {
    super(config);
  }

  addToScene(position: { x: number; y: number; direction: Direction }): void {
    this.object = this.config.mainScene.physics.add.sprite(
      position.x,
      position.y,
      ASSETS.rocket
    );
    this.addSmoke(position.x, position.y);
    this.object.flipX = position.direction === Direction.LEFT;
    const direction = position.direction === Direction.LEFT ? -1 : 1;
    this.object.body.setVelocityX(this.speed * direction);
    this.config.mainScene.physics.add.overlap(
      this.config.enemies,
      this.object,
      (e) => this.onEnemyCollide(e)
    );
    super.addToScene(position);
  }

  addSmoke(x: number, y: number) {
    this.smoke = this.config.mainScene.add.particles(
      0,
      0,
      ASSETS.playerDmgModifierBuff,
      {
        x,
        y,
        lifespan: { min: 200, max: 600 },
        speed: { min: 5, max: 25 },
        angle: { min: 270 - 10, max: 270 + 10 },
        timeScale: 0.35,
        gravityX: -2,
        gravityY: -5,
        scale: {
          start: 0.7,
          end: 1.2,
          ease: Phaser.Math.Easing.Cubic.In,
        },
        rotate: { min: 0, max: 360 },
        alpha: { start: 0.6, end: 0 },
        quantity: 1,
        blendMode: Phaser.BlendModes.NORMAL,
        particleBringToTop: true,
      }
    );
    this.smoke.startFollow(this.object);
  }
}
