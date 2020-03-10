export class TitleScreen extends Phaser.Scene {
  constructor() {
    super("TitleScene");
  }
  create() {
    let centerX = this.cameras.main.displayWidth / 2;
    let centerY = this.cameras.main.displayHeight / 2;

    this.createBG();

    this.gameTitle = this.add
      .sprite(centerX, centerY / 2, "TitleText")
      .setScale(0.5);

    // Do stuff

    this.scene.launch("WorldScene");
  }

  update() {}

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
