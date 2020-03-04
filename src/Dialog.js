export class Dialog extends Phaser.Scene {
  constructor(text = "") {
    super("Dialog");
    this.text = text;
  }

  create() {
    const centerX = this.cameras.main.displayWidth / 2;
    const centerY = this.cameras.main.displayHeight / 2;

    this.keyReleased = false;

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

    this.input.keyboard.on(
      "keyup",
      function(event) {
        this.keyReleased = true;
      },
      this
    );

    // Set Delete Callback
    this.input.keyboard.on(
      "keydown",
      function(event) {
        if (this.keyReleased != false) {
          const mainScene = this.scene.get("WorldScene");
          this.scene.remove("Dialog");
          mainScene.toggleFocus();
        }
      },
      this
    );
  }
}
