import { ASSETS } from "../assetLoader";
import { Direction } from "../base/direction";
import { GlobalConfig } from "../globalConfig";
import { BaseDmg } from "./baseDmg";

export class PlayerRocketDmg extends BaseDmg {
  smoke: Phaser.GameObjects.Particles.ParticleEmitter;
  //   smokeTrail
  onWorldCollide(): void {
    this.object.disableBody(true, true);
    this.smoke.killAll();
    this.smoke.destroy();
    this.object.destroy(true);
  }

  onEnemyCollide(): void {
    this.onEnemyCollide();
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
    this.object.body.setAllowGravity(false);
    this.object.body.onCollide = true;
    this.object.body.onWorldBounds = true;
    this.object.body.collideWorldBounds = true;
    this.object.body.setCollideWorldBounds(true);
    this.object.flipX = position.direction === Direction.LEFT;
    const direction = position.direction === Direction.LEFT ? -1 : 1;
    this.object.body.setVelocityX(this.speed * direction);
    this.object.body.world.on(
      "worldbounds",
      (body: {
        gameObject: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
      }) => {
        if (body.gameObject === this.object) {
          this.onWorldCollide();
        }
      }
    );
  }

  addSmoke(x: number, y: number) {
    this.smoke = this.config.mainScene.add.particles(
      0,
      0,
      ASSETS.playerDmgModifierBuff,
      {
        x,
        y,
        lifespan: { min: 1000, max: 3000 },
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
