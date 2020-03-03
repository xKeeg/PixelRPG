export class Dialog extends Phaser.Scene {
  constructor(text = "") {
    super("Dialog");
    this.text = text;
  }

  create() {
    this.dialogCursors = this.input.keyboard.createCursorKeys();

    const centerX = this.cameras.main.displayWidth / 2;
    const centerY = this.cameras.main.displayHeight / 2;

    // Draw Dialogue Background Box
    const background = this.add
      .image(centerX, centerY * 1.5, "UIbg")
      .setOrigin(0.5, 0.5);

    // Font style
    const style = {
      fontSize: 12,
      fontFamilt: "Segoi UI",
      align: "left",
      wordWrap: { width: background.displayWidth * 0.94, useAdvancedWrap: true }
    };

    // Draw Text to box
    const dialog = this.add
      .text(centerX, centerY * 1.5, this.text, style)
      // Centered on Box
      .setOrigin(0.5, 0.5);

    // Stop scrolling with tilemap
    dialog.setScrollFactor(0);
  }

  update() {
    let isSpaceDown = this.dialogCursors.space.isDown;
    if (isSpaceDown) {
      this.scene.remove("Dialog");
      this.scene.resume("WorldScene");
    }
  }
}
