import { ASSETS } from "../assetLoader";
import { ConfigSetter } from "../base/configSet";
import { GlobalConfig } from "../globalConfig";
import { PlayerAnimation, PlayerConfig } from "./config";
import { PlayerDamage } from "./damage";
import { PlayerHealth } from "./health";
import { PlayerMovement } from "./movement";

export class Player extends ConfigSetter {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  playerConfig = new PlayerConfig();
  movement: PlayerMovement;
  damage: PlayerDamage;
  health: PlayerHealth;
  space = this.config.mainScene.input.keyboard.addKey("SPACE");
  constructor(
    config: GlobalConfig,
    public playerSprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  ) {
    super(config);
    this.animatePlayer();
    this.cursors = this.config.mainScene.input.keyboard.createCursorKeys();
    this.config.player = this;
    this.movement = new PlayerMovement(this);
    this.damage = new PlayerDamage(this);
    this.health = new PlayerHealth(this);
  }

  update() {
    this.movePlayer();
    this.fireCheck();
  }

  movePlayer() {
    if (this.cursors.left.isDown) {
      this.movement.moveLeft();
    } else if (this.cursors.right.isDown) {
      this.movement.moveRight();
    } else {
      this.movement.stop();
    }
    if (this.cursors.up.isDown) {
      this.movement.jump();
    } else if (this.cursors.down.isDown) {
      this.movement.dive();
    }
  }

  fireCheck() {
    if (this.space.isDown && this.damage.couldFire) {
      this.damage.fire();
      this.damage.setCouldFire(false);
    }
    if (this.space.isUp) {
      this.damage.setCouldFire(true);
    }
  }

  animatePlayer() {
    this.playerSprite.setBounce(0.2);
    this.playerSprite.setCollideWorldBounds(true);

    this.config.mainScene.anims.create({
      skipMissedFrames: true,
      key: PlayerAnimation.GO_LEFT,
      frames: this.config.mainScene.anims.generateFrameNumbers(ASSETS.player, {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.config.mainScene.anims.create({
      skipMissedFrames: true,
      key: PlayerAnimation.TURN,
      frames: [{ key: ASSETS.player, frame: 4 }],
      frameRate: 20,
    });

    this.config.mainScene.anims.create({
      skipMissedFrames: true,
      key: PlayerAnimation.GO_RIGHT,
      frames: this.config.mainScene.anims.generateFrameNumbers(ASSETS.player, {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
