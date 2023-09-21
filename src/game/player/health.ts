import { damageTakenFloating } from "../floating/damageTaken";
import { Player } from "./player";

export class PlayerHealth {
  health = 1000;
  constructor(public player: Player) {}

  loseHealth(dmg: number) {
    this.health -= dmg;
    damageTakenFloating(
      this.player.config.mainScene,
      {
        x: this.player.playerSprite.body.center.x,
        y: this.player.playerSprite.body.center.y,
      },
      dmg
    );
    this.player.playerSprite.setAlpha(0.5, 0.5, 0.5, 0.5);

    setTimeout(() => {
      this.player.playerSprite.setAlpha(1, 1, 1, 1);
    }, 300);
    if (this.health <= 0) {
      this.die();
    }
  }
  die() {
    console.log("player is dead");
    this.player.config.gameIsOn = false;
    this.player.config.mainScene.physics.pause();
  }
}
