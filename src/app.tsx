import { createRoot } from "react-dom/client";
import Phaser from "phaser";
import { FunctionComponent, useRef } from "react";
import bg from "./assets/game-bg.jpg";
import { GlobalConfig } from "./game/globalConfig";
import { MainScene } from "./game/mainScene";

import player from "./assets/dude.png";
import playerDmg from "./assets/dino.png";
import shark from "./assets/shark.png";
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppProps {}

//Because fck you phaser
export const SPRITE_SHEET = {
  player: player,
  playerDmg: playerDmg,
  shark: shark,
};

const getCorrectAspect = () => {
  const currentAspect = window.innerWidth / window.innerHeight;
  const correctRatio = 5 / 3;
  const returnRatio = { width: window.innerWidth, height: window.innerHeight };
  if (currentAspect > correctRatio) {
    returnRatio.width = window.innerHeight * correctRatio;
  } else if (currentAspect < correctRatio) {
    returnRatio.height = window.innerWidth / correctRatio;
  }
  return returnRatio;
};
const ratio = getCorrectAspect();

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "phaser-container",
  backgroundColor: "#282c34",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  width: ratio.width,
  height: ratio.height,
  antialias: true,
  preserveDrawingBuffer: true,
  transparent: true,
  dom: {
    createContainer: true,
  },
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    //  width: 5, // Not working
    //  height: 3,
  },
};
window.addEventListener("resize", () => {
  const ratio = getCorrectAspect();
  (config.width = ratio.width), (config.height = ratio.height);
});

const createGame = (ref: HTMLDivElement) => {
  config.parent = ref;
  const globalConfig = new GlobalConfig();
  const mainScene = new MainScene(globalConfig, SPRITE_SHEET);
  config.scene = mainScene;
  const game = new Phaser.Game(config);
  globalConfig.game = game;
  globalConfig.mainScene = mainScene;
  globalConfig.engineConfig = config;
};

const App: FunctionComponent<AppProps> = () => {
  const viewInitialized = useRef(false);
  return (
    <>
      <div className="loading-block">
        <img className="bg" src={bg}></img>
        <p className="loading-text">Betöltés</p>
      </div>
      <div
        ref={(ref) => {
          if (!viewInitialized.current) {
            viewInitialized.current = true;
            createGame(ref);
          }
        }}
        id="phaser-container"
        className="phaser-container"
      ></div>
    </>
  );
};

export default App;
function render() {
  const root = createRoot(document.body);
  root.render(<App></App>);
}
render();
