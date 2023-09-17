import { PlayerAnimation } from "./config";
import { Player } from "./player";

export class PlayerMovement {
  isFlying = false;
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
    this.player.playerSprite.body.setAllowGravity(false);
    this.player.playerSprite.setVelocityY(0);
  }

  private enableGravity() {
    this.player.playerSprite.body.setAllowGravity(true);
  }
}
