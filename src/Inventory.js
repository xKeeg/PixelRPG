export class Inventory extends Phaser.Scene {
  constructor() {
    super("Inventory");
  }

  create() {
    // Store player items
    this.items = [1, 2, 3, 4];

    // Positioning
    const padding = 25;
    const baseX = this.cameras.main.displayWidth - 20;
    const baseY = 0 + 20;

    // Draw items to screen
    for (let i = 0; i < this.items.length; i++)
      this.add.image(baseX - padding * i, baseY, "invTile").setScale(1.5);
  }
}
