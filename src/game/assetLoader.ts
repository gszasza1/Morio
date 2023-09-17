import { ConfigSetter } from "./base/configSet";
import { GlobalConfig } from "./globalConfig";
import bg from "../assets/ocean.jpg";
import player from "../assets/dude.png";
export class AssetLoader extends ConfigSetter {
  constructor(config: GlobalConfig, public assetCallback: () => void) {
    super(config);
  }
  currentLoadedAssetNumber = 0;
  lastLoadedAsset?: string;
  preload() {
    this.config.mainScene.textures.on("onload", (e: string) => {
      this.assetLoaded(e);
      console.log(e);
      this.allItemLoaded();
    });
    this.loadBg();
    this.loadPlayer();
  }

  assetLoaded(assetName: string) {
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

  loadPlayer() {
    const playerImage = new Image();
    playerImage.src = player;
    this.config.mainScene.textures.addSpriteSheet(ASSETS.player, playerImage, {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.assetLoaded(ASSETS.player);
    this.allItemLoaded();

  }

  get allAssetLoaded() {
    return this.currentLoadedAssetNumber === Object.keys(ASSETS).length;
  }
}

export const ASSETS = {
  bg: "bg",
  player: "player",
};
