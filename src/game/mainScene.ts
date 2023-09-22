import Phaser from "phaser";
import { GlobalConfig } from "./globalConfig";
import { ASSETS, AssetLoader } from "./assetLoader";
import { Player } from "./player/player";

import { SPRITE_SHEET } from "../app";
import { SpeedBuff } from "./buff/speedBuff";
import { FlyBuff } from "./buff/flyBuff";
import { PlayerDmgModifierBuff } from "./buff/dmgModifierPlayerBuff";
import { SharkEnemy } from "./enemy/shark";
import { R2D2Enemy } from "./enemy/r2d2";
export class MainScene extends Phaser.Scene {
  config: GlobalConfig;
  constructor(config: GlobalConfig, spriteSheet: typeof SPRITE_SHEET) {
    super("MainScene");
    this.config = config;
    this.config.assetLoader = new AssetLoader(this.config, spriteSheet, () =>
      this.assetLoaded()
    );
  }

  create() {
    this.config.assetLoader.preload();
  }

  setBg() {
    const bg = this.add
      .image(
        //Centering
        0,
        0,
        ASSETS.bg
      )
      .setOrigin(0, 0);
    bg.displayWidth = this.sys.canvas.width;
    bg.displayHeight = this.sys.canvas.height;
    this.cameras.main.setBounds(
      0,
      0,
      bg.displayWidth * 10,
      bg.displayHeight,
      true
    );
    this.physics.world
      .setBoundsCollision(true)
      .setBounds(
        0,
        0,
        bg.displayWidth * 10,
        bg.displayHeight,
        true,
        true,
        true,
        true
      );
  }

  setPlayer() {
    const player = this.config.mainScene.physics.add.sprite(
      this.sys.canvas.width / 2,
      this.sys.canvas.height / 2,
      ASSETS.player
    );
    this.cameras.main.startFollow(player, true, 0.03, 0.5);
    new Player(this.config, player);
    const speed = new SpeedBuff(this.config);
    speed.addToScene({ x: 60, y: 60 });
    const fly = new FlyBuff(this.config);
    fly.addToScene({ x: 100, y: 60 });
    const dmgBuff = new PlayerDmgModifierBuff(this.config);
    dmgBuff.addToScene({ x: 200, y: 60 });
    const sharkEnemy = new SharkEnemy(this.config);
    sharkEnemy.addToScene({ x: 1000, y: 60 });
    const r2d2Enemy = new R2D2Enemy(this.config);
    r2d2Enemy.addToScene({ x: 700, y: 60 });
  }

  assetLoaded() {
    this.config.enemies = new Phaser.GameObjects.Group(this);
    this.setBg();
    this.setPlayer();
  }
  update() {
    if (this.config.player) {
      this.config.player.update();
    }
  }
}
