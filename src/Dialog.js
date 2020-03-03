export class Dialog extends Phaser.Scene {
  constructor(text = "") {
    super("Dialog");
    this.text = text;
  }

  create() {
    const centerX = this.cameras.main.displayWidth / 2;
    const centerY = this.cameras.main.displayHeight / 2;

    // Draw Dialogue Background Box
    const background = this.add
      .image(centerX, centerY * 1.5, "UIbg")
      .setOrigin(0.5, 0.5);

    // Draw Text to box
    const dialog = this.add
      .text(
        centerX - background.displayWidth * 0.45,
        centerY * 1.5,
        this.text,
        {
          fontSize: 12,
          fontFamily: "Tahoma"
        }
      )
      // Off-Centre Left
      .setOrigin(0, 0.9);

    // Stop scrolling with tilemap
    dialog.setScrollFactor(0);
  }
}
