import { ConfigSetter } from "./base/configSet";
import { GlobalConfig } from "./globalConfig";
import bg from "../assets/ocean.jpg";
import speedBuff from "../assets/pizza.png";
import flyBuff from "../assets/plane.png";
import playerDmgModifierBuff from "../assets/cat.png";
import smoke from "../assets/smoke.png";
import rocket from "../assets/rocket.png";
import laserBullet from "../assets/laser-bullet.png";
import r2d2 from "../assets/r2d2.png";

import { SPRITE_SHEET } from "../app";
export type AssetCheck = { [key in ASSETS]: boolean };
export class AssetLoader extends ConfigSetter {
  constructor(
    config: GlobalConfig,
    public spriteSheet: typeof SPRITE_SHEET,
    public assetCallback: () => void
  ) {
    super(config);
  }
  currentLoadedAssetNumber = 0;
  currentLoadedAsset: AssetCheck = Object.keys(ASSETS).reduce(
    (a, v) => ({ ...a, [v]: false }),
    {} as AssetCheck
  );
  lastLoadedAsset?: string;
  preload() {
    this.config.mainScene.textures.on("onload", (e: ASSETS) => {
      this.assetLoaded(e);
      this.allItemLoaded();
    });

    this.loadBg();
    this.loadPlayer();
    this.loadBuffs();
    this.loadDmg();
    this.loadEnemy();
  }

  assetLoaded(assetName: ASSETS) {
    this.currentLoadedAsset[assetName] = true;
    this.lastLoadedAsset = assetName;
    this.currentLoadedAssetNumber++;
  }

  loadBg() {
    this.config.mainScene.textures.addBase64(ASSETS.bg, bg);
  }

  allItemLoaded() {
    if (this.allAssetLoaded) {
      this.assetCallback();
    }
  }
  loadBuffs() {
    this.config.mainScene.textures.addBase64(ASSETS.speedBuff, speedBuff);
    this.config.mainScene.textures.addBase64(ASSETS.flyBuff, flyBuff);
    this.config.mainScene.textures.addBase64(
      ASSETS.playerDmgModifierBuff,
      playerDmgModifierBuff
    );
  }

  loadPlayer() {
    const playerImage = new Image();
    playerImage.onload = () => {
      this.config.mainScene.textures.addSpriteSheet(
        ASSETS.player,
        playerImage,
        {
          frameWidth: 32,
          frameHeight: 48,
        }
      );

      this.assetLoaded(ASSETS.player);
      this.allItemLoaded();
    };
    playerImage.src = this.spriteSheet.player;
  }
  loadEnemy() {
    const shark = new Image();
    shark.onload = () => {
      this.config.mainScene.textures.addSpriteSheet(ASSETS.shark, shark, {
        frameWidth: 126,
        frameHeight: 50,
      });

      this.assetLoaded(ASSETS.shark);
      this.allItemLoaded();
    };
    shark.src = this.spriteSheet.shark;
    this.config.mainScene.textures.addBase64(ASSETS.r2d2, r2d2);
  }

  loadDmg() {
    const playerDmg = new Image();
    playerDmg.onload = () => {
      this.config.mainScene.textures.addSpriteSheet(
        ASSETS.playerDmg,
        playerDmg,
        {
          frameWidth: 32,
          frameHeight: 32,
        }
      );

      this.assetLoaded(ASSETS.playerDmg);
      this.allItemLoaded();
    };
    playerDmg.src = this.spriteSheet.playerDmg;

    this.config.mainScene.textures.addBase64(ASSETS.rocket, rocket);
    this.config.mainScene.textures.addBase64(ASSETS.smoke, smoke);
    this.config.mainScene.textures.addBase64(ASSETS.laserBullet, laserBullet);
  }

  get allAssetLoaded() {
    return this.currentLoadedAssetNumber === Object.keys(ASSETS).length;
  }
}
export enum ASSETS {
  bg = "bg",
  player = "player",
  speedBuff = "SpeedBuff",
  flyBuff = "flyBuff",
  playerDmg = "playerDmg",
  playerDmgModifierBuff = "playerDmgModifierBuff",
  smoke = "smoke",
  rocket = "rocket",
  shark = "shark",
  laserBullet = "laserBullet",
  r2d2 = "r2d2",
}
