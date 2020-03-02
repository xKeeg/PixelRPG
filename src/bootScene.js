import mapSpritesheet from "./assets/spritesheet.png";
import playerSpritesheet from "./assets/RPG_assets.png";
import TiledJSON from "./assets/map.json";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    this.load.image("tiles", mapSpritesheet);

    this.load.tilemapTiledJSON("map", TiledJSON);

    this.load.spritesheet("player", playerSpritesheet, {
      frameWidth: 16,
      frameHeight: 16
    });
  }

  create() {
    this.scene.start("WorldScene");
  }
}
