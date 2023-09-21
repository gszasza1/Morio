import { Direction } from "../base/direction";
import { BaseDmg } from "../damage/baseDmg";
import { PlayerBaseDmg } from "../damage/playerBaseDmg";
import { PlayerRocketDmg } from "../damage/rocketDmg";
import { PlayerAnimation } from "./config";
import { Player } from "./player";

export class PlayerDamage {
  couldFire = true;
  dmgType = PLAYER_DMG_TYPE.BASE;
  constructor(public player: Player) {}
  modifiedDmgTimer: NodeJS.Timeout;
  setCouldFire(couldFire: boolean) {
    this.couldFire = couldFire;
  }

  fire() {
    if (this.couldFire) {
      const direction: Direction =
        this.player.playerConfig.direction === PlayerAnimation.GO_LEFT
          ? Direction.LEFT
          : Direction.RIGHT;

      let playerDmg: BaseDmg;
      switch (this.dmgType) {
        case PLAYER_DMG_TYPE.BASE:
          playerDmg = new PlayerBaseDmg(this.player.config);
          break;
        case PLAYER_DMG_TYPE.SPECIAL:
          playerDmg = new PlayerRocketDmg(this.player.config);
          break;

        default:
          playerDmg = new PlayerBaseDmg(this.player.config);
          break;
      }

      const playerPosition = this.player.playerSprite.body.center;
      playerDmg.addToScene({
        x: playerPosition.x,
        y: playerPosition.y,
        direction,
      });
    }
  }

  setDmgType(dmgType: PLAYER_DMG_TYPE, duration: number) {
    this.dmgType = dmgType;
    if (dmgType !== PLAYER_DMG_TYPE.BASE) {
      if (this.modifiedDmgTimer) {
        clearTimeout(this.modifiedDmgTimer),
          (this.modifiedDmgTimer = undefined);
      }
      this.modifiedDmgTimer = setTimeout(() => {
        this.dmgType = PLAYER_DMG_TYPE.BASE;
      }, duration);
    }
  }
}
export enum PLAYER_DMG_TYPE {
  BASE = "BASE",
  SPECIAL = "SPECIAL",
}
