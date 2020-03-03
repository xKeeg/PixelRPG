import mapSpritesheet from "./assets/spritesheet.png";
import playerSpritesheet from "./assets/RPG_assets.png";
import TiledJSON from "./assets/map.json";
import UIBox from "./assets/UI_box.png";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    this.load.image("tiles", mapSpritesheet);
    this.load.image("UIbg", UIBox);

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
