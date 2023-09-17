import { AssetLoader } from "./assetLoader";
import { MainScene } from "./mainScene";
import { Player } from "./player/base";

export class GlobalConfig {
  private _game: Phaser.Game;
  private _mainScene: MainScene;
  private _assetLoader: AssetLoader;
  private _engineConfig: Phaser.Types.Core.GameConfig;
  private _player: Player;

  set game(game: Phaser.Game) {
    if (!this._game) {
      this._game = game;
    }
  }
  get game() {
    if (!this.game) {
      throw Error("Game not found");
    }
    return this._game;
  }
  set mainScene(_mainScene: MainScene) {
    this._mainScene = _mainScene;
  }
  get mainScene() {
    if (!this._mainScene) {
      throw Error("MainScene not found");
    }
    return this._mainScene;
  }

  set assetLoader(assetLoader: AssetLoader) {
    this._assetLoader = assetLoader;
  }
  get assetLoader() {
    if (!this._assetLoader) {
      throw Error("AssetLoader not found");
    }
    return this._assetLoader;
  }
  set engineConfig(engineConfig: Phaser.Types.Core.GameConfig) {
    this._engineConfig = engineConfig;
  }
  get engineConfig() {
    if (!this._engineConfig) {
      throw Error("EngineConfig not found");
    }
    return this._engineConfig;
  }
  set player(player: Player) {
    this._player = player;
  }
  get player() {
    return this._player;
  }
}
