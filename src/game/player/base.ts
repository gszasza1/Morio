import { ASSETS } from "../assetLoader";
import { ConfigSetter } from "../base/configSet";
import { GlobalConfig } from "../globalConfig";

export const PlayerAnimation = {
  GO_RIGHT: "GO_RIGHT",
  GO_LEFT: "GO_LEFT",
  TURN: "TURN",
};

export class Player extends ConfigSetter {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  constructor(
    config: GlobalConfig,
    public playerSprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  ) {
    super(config);
    this.animatePlayer();
    this.cursors = this.config.mainScene.input.keyboard.createCursorKeys();
    this.config.player = this;
  }

  movePlayer() {
    if (this.cursors.left.isDown) {
      this.playerSprite.setVelocityX(-160);

      this.playerSprite.anims.play(PlayerAnimation.GO_LEFT, true);
    } else if (this.cursors.right.isDown) {
      this.playerSprite.setVelocityX(160);

      this.playerSprite.anims.play(PlayerAnimation.GO_RIGHT, true);
    } else {
      this.playerSprite.setVelocityX(0);

      this.playerSprite.anims.play(PlayerAnimation.TURN);
    }

    if (this.cursors.up.isDown && this.playerSprite.body.touching.down) {
      this.playerSprite.setVelocityY(-330);
    }
  }

  animatePlayer() {
    this.playerSprite.setBounce(0.2);
    this.playerSprite.setCollideWorldBounds(true);

    this.config.mainScene.anims.create({
      key: PlayerAnimation.GO_LEFT,
      frames: this.config.mainScene.anims.generateFrameNumbers(ASSETS.player, {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.config.mainScene.anims.create({
      key: PlayerAnimation.TURN,
      frames: [{ key: ASSETS.player, frame: 4 }],
      frameRate: 20,
    });

    this.config.mainScene.anims.create({
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
