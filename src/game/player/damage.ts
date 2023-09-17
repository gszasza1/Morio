import { Direction } from "../base/direction";
import { PlayerBaseDmg } from "../damage/playerBaseDmg";
import { PlayerAnimation } from "./config";
import { Player } from "./player";

export class PlayerDamage {
  couldFire = true;
  constructor(public player: Player) {}

  setCouldFire(couldFire: boolean) {
    this.couldFire = couldFire;
  }

  fire() {
    if (this.couldFire) {
      const direction: Direction =
        this.player.playerConfig.direction === PlayerAnimation.GO_LEFT
          ? Direction.LEFT
          : Direction.RIGHT;
      const playerDmg = new PlayerBaseDmg(this.player.config);
   //   const playerPosition = this.player.playerSprite.body.position;
      const playerPosition = this.player.playerSprite.body.center;
      playerDmg.addToScene({
        x: playerPosition.x,
        y: playerPosition.y,
        direction,
      });
    }
  }
}
