import { ASSETS } from "../assetLoader";
import { Direction } from "../base/direction";
import { BaseEnemy } from "../enemy/baseEnemy";
import { GlobalConfig } from "../globalConfig";
import { isBody } from "../util/isBody";
import { BaseDmg } from "./baseDmg";

export enum PlayerDmgAnimation {
  GO = "GO",
}

export class PlayerBaseDmg extends BaseDmg {


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
      ASSETS.playerDmg
    );
    super.addToScene(position);
    this.animate();

    const direction = position.direction === Direction.LEFT ? -1 : 1;

    this.object.flipX = position.direction === Direction.LEFT;
    this.object.anims.play(PlayerDmgAnimation.GO, true);
    this.object.body.setVelocityX(this.speed * direction);

    this.config.mainScene.physics.add.overlap(
      this.config.enemies,
      this.object,
      (e) => this.onEnemyCollide(e)
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
