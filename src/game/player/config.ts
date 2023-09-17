export class PlayerConfig {
  speed = BasePlayerStat.speed;
  jumpSpeed = BasePlayerStat.jumpSpeed;
  direction = PlayerAnimation.TURN;

  get leftSpeed() {
    return -this.speed;
  }
  get rightSpeed() {
    return this.speed;
  }
  get diveSpeed() {
    return -this.jumpSpeed;
  }
}

export const BasePlayerStat = {
  speed: 160,
  jumpSpeed: -330,
};

export const PlayerAnimation = {
  GO_RIGHT: "GO_RIGHT",
  GO_LEFT: "GO_LEFT",
  TURN: "TURN",
};
