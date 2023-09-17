import Phaser from "phaser";
import { GlobalConfig } from "./globalConfig";
import { ASSETS, AssetLoader } from "./assetLoader";
import { Player } from "./player/base";

export class MainScene extends Phaser.Scene {
  config: GlobalConfig;
  constructor(config: GlobalConfig) {
    super("MainScene");
    this.config = config;
    this.config.assetLoader = new AssetLoader(this.config, () =>
      this.assetLoaded()
    );
  }
  //   preload() {
  //     this.config.mainScene.load.image("asd", "../assets/dude.png");
  //   }
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
    this.setBg();
    this.setPlayer();
  }
  update() {
    if (this.config.player) {
      this.config.player.movePlayer();
    }
  }
}
