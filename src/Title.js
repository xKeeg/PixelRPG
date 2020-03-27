export class TitleScreen extends Phaser.Scene {
  constructor() {
    super("TitleScene");
  }
  create() {
    this.centerX = this.cameras.main.displayWidth / 2;
    this.centerY = this.cameras.main.displayHeight / 2;

    this.createBG();
    this.createTitle();
    this.createPlayBtn();
    this.ShowInstructions();
  }

  update() {}

  createPlayBtn() {
    const style = {
      color: "#000",
      fontSize: 20,
      fontFamily: "Impact",
      align: "center",
      stroke: "#fff",
      strokeThickness: 2,
      shadowFill: true,
      shadowColor: "#000",
      shadowStroke: true
    };

    const playBtn = this.add.text(this.centerX, this.centerY, "Play", style);
    playBtn.setOrigin(0.5);

    playBtn.setInteractive();
    playBtn.on(
      "pointerover",
      function() {
        playBtn.setScale(1.2);
      },
      this
    );
    playBtn.on(
      "pointerout",
      function() {
        playBtn.setScale(1);
      },
      this
    );
    playBtn.on(
      "pointerdown",
      function() {
        this.scene.launch("WorldScene");
      },
      this
    );
  }

  ShowInstructions() {}

  createTitle() {
    const style = {
      color: "#000",
      fontSize: 30,
      fontFamily: "Impact",
      align: "center",
      stroke: "#fff",
      strokeThickness: 4,
      shadowFill: true,
      shadowColor: "#000",
      shadowStroke: true
    };

    const gameTitle = this.add.text(
      this.centerX,
      this.centerY / 2,
      "Working Title",
      style
    );
    gameTitle.setOrigin(0.5);
  }
  createBG() {
    // Render the map as a background (resource intensive????)

    const map = this.make.tilemap({ key: "map" });
    const tiles = map.addTilesetImage("spritesheet", "tiles");

    const ground = map.createStaticLayer("Ground", tiles, 0, 0);
    const groundDeco = map.createStaticLayer("GroundDeco", tiles, 0, 0);
    const water = map.createStaticLayer("Water", tiles, 0, 0);
    const structures = map.createStaticLayer("Structures", tiles, 0, 0);
    const interact = map.createStaticLayer("Interact", tiles, 0, 0);
    const decorations = map.createStaticLayer("Decoration", tiles, 0, 0);
    const fringe = map.createStaticLayer("Fringe", tiles, 0, 0);
  }
}
