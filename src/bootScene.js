import mapSpritesheet from "./assets/spritesheet.png";
import playerSpritesheet from "./assets/RPG_assets.png";
import TiledJSON from "./assets/map.json";
import UIBox from "./assets/UI_box.png";
import Adventurer from "./assets/Character 1.png";
import InventoryTile from "./assets/InventoryTile.png";
import axe from "./assets/axe.png";
import key1 from "./assets/key1.png";
import fish from "./assets/fish.png";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    this.load.image("tiles", mapSpritesheet);
    this.load.image("UIbg", UIBox);
    this.load.image("invTile", InventoryTile);
    this.load.image("axe", axe);
    this.load.image("key1", key1);
    this.load.image("fish", fish);

    this.load.tilemapTiledJSON("map", TiledJSON);

    this.load.spritesheet("player", playerSpritesheet, {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("person", Adventurer, {
      frameWidth: 24,
      frameHeight: 32
    });
  }

  create() {
    this.scene.start("WorldScene");
  }
}
