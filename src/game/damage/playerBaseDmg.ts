import { ASSETS } from "../assetLoader";
import { Direction } from "../base/direction";
import { GlobalConfig } from "../globalConfig";
import { BaseDmg } from "./baseDmg";

export enum PlayerDmgAnimation {
  GO = "GO",
}

export class PlayerBaseDmg extends BaseDmg {
  onWorldCollide(): void {
    this.object.disableBody(true, true);
    this.object.destroy(true);
  }
  onEnemyCollide(): void {
    throw new Error("Method not implemented.");
  }
  constructor(config: GlobalConfig) {
    super(config);
  }

  addToScene(position: { x: number; y: number; direction: Direction }): void {
    this.object = this.config.mainScene.physics.add.sprite(
      position.x,
      position.y,
      ASSETS.playerDmg
    );
    this.animate();
    this.object.body.setAllowGravity(false);
    this.object.body.onCollide = true;
    this.object.body.onWorldBounds = true;
    this.object.body.collideWorldBounds = true;
    this.object.body.setCollideWorldBounds(true);
    this.object.flipX = position.direction === Direction.LEFT;
    const direction = position.direction === Direction.LEFT ? -1 : 1;

    this.object.anims.play(PlayerDmgAnimation.GO, true);
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
  animate() {
    if (!this.config.mainScene.anims.exists(PlayerDmgAnimation.GO)) {
      this.config.mainScene.anims.create({
        skipMissedFrames: true,
        key: PlayerDmgAnimation.GO,
        frames: this.config.mainScene.anims.generateFrameNumbers(
          ASSETS.playerDmg,
          {
            start: 0,
            end: 1,
          }
        ),
        frameRate: 10,
        repeat: -1,
      });
    }
  }
}
