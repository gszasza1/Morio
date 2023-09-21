import { ANIMATIONS } from "../animations";
import { ASSETS } from "../assetLoader";
import { SharkDmg } from "../damage/sharkDmg";
import { GlobalConfig } from "../globalConfig";
import { BaseEnemy } from "./baseEnemy";

const BASE_FIRE_TIMER = 2000;
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
    super.addToScene(position);
    this.animate();
    this.object.anims.play(ANIMATIONS.SHARK_FIRE_STOP, true);
    const fireAnimationTimer = setInterval(() => {
      this.object.anims.play(ANIMATIONS.SHARK_FIRE, true);
      this.fire();
    }, BASE_FIRE_TIMER);
    this.animationInterval.push(fireAnimationTimer);
    setTimeout(() => {
      const stopAnimationTimer = setInterval(() => {
        this.object.anims.play(ANIMATIONS.SHARK_FIRE_STOP, true);
      }, BASE_FIRE_TIMER);
      this.animationInterval.push(stopAnimationTimer);
    }, 600);
  }
  animate() {
    if (!this.config.mainScene.anims.exists(ANIMATIONS.SHARK_FIRE)) {
      this.config.mainScene.anims.create({
        skipMissedFrames: true,
        key: ANIMATIONS.SHARK_FIRE,
        frames: this.config.mainScene.anims.generateFrameNumbers(ASSETS.shark, {
          start: 1,
          end: 1,
        }),

        frameRate: 10,
        repeat: -1,
      });
    }
    if (!this.config.mainScene.anims.exists(ANIMATIONS.SHARK_FIRE_STOP)) {
      this.config.mainScene.anims.create({
        skipMissedFrames: true,
        key: ANIMATIONS.SHARK_FIRE_STOP,
        frames: this.config.mainScene.anims.generateFrameNumbers(ASSETS.shark, {
          start: 0,
          end: 0,
        }),

        frameRate: 10,
        repeat: -1,
      });
    }
  }

  fire(): void {
    const dmg = new SharkDmg(this.config);
    dmg.addToScene({
      x: this.object.body.center.x,
      y: this.object.body.center.y,
    });
  }

  destroy(): void {
    super.destroy();
  }
}
