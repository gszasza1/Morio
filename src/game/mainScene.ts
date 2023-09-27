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
import map from "../assets/map.json";

export class MainScene extends Phaser.Scene {
  config: GlobalConfig;
  constructor(config: GlobalConfig, spriteSheet: typeof SPRITE_SHEET) {
    super("MainScene");
    this.config = config;
    this.config.assetLoader = new AssetLoader(this.config, spriteSheet, () =>
      this.assetLoaded()
    );
  }
  preload() {
    this.load.tilemapTiledJSON("asd", map);
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
  }

  assetLoaded() {
    this.config.enemies = new Phaser.GameObjects.Group(this);
    this.setBg();
    this.setPlatform();
    this.setPlayer();
    this.randomTest();
    this.colliders();
    var map = this.make.tilemap({ key: "asd" });
    // console.log(map)
    const tileset = map.addTilesetImage("super-mario", ASSETS.tile);
    const layer = map.createLayer("kacsa", tileset);
    console.log(map.getLayer("kacsa").properties);
    layer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.config.player.playerSprite, layer);
  }

  setPlatform() {
    this.config.platform = this.physics.add.staticGroup();
    this.config.platform.create(200, 600, ASSETS.platform);
    this.add.group(this.config.platform);
  }
  colliders() {
    const platformActive = this.physics.add.collider(
      this.config.player.playerSprite,
      this.config.platform
    );
  }

  randomTest() {
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
  update() {
    if (this.config.player) {
      this.config.player.update();
    }
  }
}
