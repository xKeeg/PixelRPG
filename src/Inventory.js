import { Item } from "./Item";
export class Inventory extends Phaser.Scene {
  constructor() {
    super("Inventory");
    this.items = [];
  }

  create() {
    this.WorldScene = this.scene.get("WorldScene");
    this.input.on("pointerdown", this.startDrag, this);
  }

  update() {
    //// Draw Methods

    // Positioning
    const padding = 25;
    const baseX = this.cameras.main.displayWidth - 20;
    const baseY = 0 + 20;

    // Set Draggable

    // Draw items to screen
    for (let i = 0; i < this.items.length; i++) {
      // Background
      this.add.image(baseX - padding * i, baseY, "invTile").setScale(1.5);

      // Item Sprite
      if (!this.items[i].isMoving) {
        this.items[i].x = baseX - padding * i;
        this.items[i].y = baseY;
      }
    }
  }

  startDrag(pointer, targets) {
    if (targets[0] != undefined) {
      // Remove pointer down listener
      this.input.off("pointerdown", this.startDrag, this);

      // Get top most grabbed item
      this.dragObj = targets[0];
      this.dragObj.isMoving = true;

      this.WorldScene.toggleFocus();

      this.input.on("pointermove", this.doDrag, this);
      this.input.on("pointerup", this.stopDrag, this);
    }
  }

  doDrag(pointer) {
    this.dragObj.x = pointer.x;
    this.dragObj.y = pointer.y;
  }

  stopDrag(pointer, targets) {
    this.input.on("pointerdown", this.startDrag, this);
    this.dragObj.isMoving = false;
    this.input.off("pointermove", this.doDrag, this);
    this.input.off("pointerup", this.stopDrag, this);
    this.WorldScene.toggleFocus();
  }

  addItem(name, texture) {
    const item = new Item(this, name, texture);
    this.items.push(item);
  }
}
