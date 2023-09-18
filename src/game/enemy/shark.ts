import { ASSETS } from "../assetLoader";
import { GlobalConfig } from "../globalConfig";
import { BaseEnemy, ENEMY_ANIMATION } from "./baseEnemy";

export class SharkEnemy extends BaseEnemy {
  constructor(config: GlobalConfig) {
    super(config);
  }

  addToScene(position: { x: number; y: number }): void {
    this.object = this.config.mainScene.physics.add.sprite(
      position.x,
      position.y,
      ASSETS.shark
    );
    this.config.enemies.add(this.object);
    this.animate();
    this.object.body.setAllowGravity(true);
    this.object.body.collideWorldBounds = true;
    this.object.body.setCollideWorldBounds(true);

    this.object.anims.play(ENEMY_ANIMATION.SHARK_FIRE_STOP, true);
    setInterval(() => {
      this.object.anims.play(ENEMY_ANIMATION.SHARK_FIRE, true);
    }, 2000);
    setTimeout(() => {
      setInterval(() => {
        this.object.anims.play(ENEMY_ANIMATION.SHARK_FIRE_STOP, true);
      }, 2000);
    }, 600);
  }
  animate() {
    if (!this.config.mainScene.anims.exists(ENEMY_ANIMATION.SHARK_FIRE)) {
      this.config.mainScene.anims.create({
        skipMissedFrames: true,
        key: ENEMY_ANIMATION.SHARK_FIRE,
        frames: this.config.mainScene.anims.generateFrameNumbers(
          ASSETS.shark,
          {
            start: 1,
            end: 1,
          }
        ),

        frameRate: 10,
        repeat: -1,
      });
    }
    if (!this.config.mainScene.anims.exists(ENEMY_ANIMATION.SHARK_FIRE_STOP)) {
      this.config.mainScene.anims.create({
        skipMissedFrames: true,
        key: ENEMY_ANIMATION.SHARK_FIRE_STOP,
        frames: this.config.mainScene.anims.generateFrameNumbers(
          ASSETS.shark,
          {
            start: 0,
            end: 0,
          }
        ),

        frameRate: 10,
        repeat: -1,
      });
    }
  }
  getDmg(dmgNumber: number): void {
    this.health -= dmgNumber;
    if (this.health <= 0) {
      this.die();
    }
  }
  fire(): void {
    throw new Error("Method not implemented.");
  }
  die(): void {
    this.destroy();
  }
  destroy(): void {
    this.config.enemies.remove(this.object, true, true);
    this.object.destroy(true);
  }
}
