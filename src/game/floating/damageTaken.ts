import { MainScene } from "../mainScene";

export function damageTakenFloating(
  scene: MainScene,
  position: { x: number; y: number },
  dmgNumber: number
) {
  const object = scene.add.dom(
    position.x,
    position.y,
    "div",
    "",
    dmgNumber.toString()
  );
  object.node.className = "dmgTaken";
  setTimeout(() => {
    object.destroy();
  }, 2000);
}
