import { ASSETS } from "../assetLoader";
import { PlayerAnimation } from "./config";
import { Player } from "./player";

export class PlayerMovement {
  isFlying = false;
  flyingEffect: Phaser.GameObjects.Particles.ParticleEmitter;
  constructor(public player: Player) {}

  setFly(fly: boolean) {
    if (this.isFlying !== fly) {
      if (fly) {
        this.disableGravity();
      } else {
        this.enableGravity();
      }
    }
    this.isFlying = fly;
  }

  moveLeft() {
    this.player.playerSprite.setVelocityX(this.player.playerConfig.leftSpeed);
    this.player.playerSprite.anims.play(PlayerAnimation.GO_LEFT, true);
    this.player.playerConfig.direction = PlayerAnimation.GO_LEFT;
  }

  moveRight() {
    this.player.playerSprite.setVelocityX(this.player.playerConfig.rightSpeed);
    this.player.playerSprite.anims.play(PlayerAnimation.GO_RIGHT, true);
    this.player.playerConfig.direction = PlayerAnimation.GO_RIGHT;
  }

  stop() {
    this.player.playerSprite.setVelocityX(0);
    this.player.playerSprite.anims.play(PlayerAnimation.TURN);
    this.player.playerConfig.direction = PlayerAnimation.TURN;
  }

  jump() {
    if (!this.isFlying && this.player.playerSprite.body.blocked.down) {
      this.player.playerSprite.setVelocityY(this.player.playerConfig.jumpSpeed);
    } else if (this.isFlying) {
      this.player.playerSprite.setVelocityY(this.player.playerConfig.jumpSpeed);
    }
  }
  dive() {
    if (this.isFlying) {
      this.player.playerSprite.setVelocityY(this.player.playerConfig.diveSpeed);
    }
  }
  addXSpeed(extraSpeed: number) {
    this.player.playerConfig.speed += extraSpeed;
  }

  private disableGravity() {
    this.flyingEffect = this.player.config.mainScene.add.particles(
      0,
      0,
      ASSETS.laserPoint,
      {
        x: this.player.playerSprite.body.center.x,
        y: this.player.playerSprite.body.bottom + 5,
        lifespan: { min: 200, max: 600 },
        speed: { min: 70, max: 110 },
        angle: { min: 270 - 10, max: 270 + 10 },
        timeScale: 0.35,
        gravityX: -2,
        gravityY: -5,
        rotate: { min: 0, max: 360 },
        alpha: { start: 0.6, end: 0 },
        quantity: 1,
        blendMode: Phaser.BlendModes.NORMAL,
        particleBringToTop: false,
        visible: true,
        scale: {
          start: 0.7,
          end: 0,
          ease: Phaser.Math.Easing.Cubic.In,
        },
      }
    );
    this.flyingEffect.depth = 0;
    this.flyingEffect.startFollow(this.player.playerSprite);
    this.player.playerSprite.body.setAllowGravity(false);
    this.player.playerSprite.setVelocityY(0);
  }

  private enableGravity() {
    this.flyingEffect.stop();
    setTimeout(() => {
      this.flyingEffect.destroy();
      this.flyingEffect = undefined;
    }, 600);
    this.player.playerSprite.body.setAllowGravity(true);
  }
}
