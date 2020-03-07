export class Dialog extends Phaser.Scene {
  constructor() {
    super("Dialog");
    this.dialogues = [];
  }

  create() {
    // Handle to main scene
    this.WorldScene = this.scene.get("WorldScene");

    // Ensure that keydown movement does not auto-skip dialogue
    this.keyReleased = false;
  }

  addDialog(text) {
    // Positioning
    const centerX = this.cameras.main.displayWidth / 2;
    const centerY = this.cameras.main.displayHeight / 2;
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

    const dialog = this.add
      .text(centerX, centerY * 1.5, text, style)
      // Centered on Box
      .setOrigin(0.5, 0.5);

    // Stop scrolling with tilemap
    dialog.setScrollFactor(0);

    this.dialogues.push({ dialog, background });

    // Stop the box being auto cancelled by repeat input
    this.input.keyboard.on(
      "keyup",
      function(event) {
        this.keyReleased = true;
      },
      this
    );

    this.input.on(
      "pointerup",
      function(event) {
        this.keyReleased = true;
      },
      this
    );

    this.input.on(
      "pointerdown",
      function(event) {
        if (this.keyReleased != false) {
          this.delete();
        }
      },
      this
    );

    this.input.keyboard.on(
      "keydown",
      function(event) {
        if (this.keyReleased != false) {
          this.delete();
        }
      },
      this
    );
  }

  delete() {
    this.keyReleased = false;

    // Get pair of dialog items
    if (this.dialogues.length != 0) {
      const removedChild = this.dialogues.pop();

      // Destroy them both
      removedChild.dialog.destroy();
      removedChild.background.destroy();

      // Return control to main scene
      this.WorldScene.toggleFocus();
    }
  }

  update() {
    console.log(this.keyReleased);
  }
}
