export const isBody = (
  e?: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
): e is Phaser.Types.Physics.Arcade.GameObjectWithBody => {
  return !!(e as Phaser.Types.Physics.Arcade.GameObjectWithBody).getData
};
