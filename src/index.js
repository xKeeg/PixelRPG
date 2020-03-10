import Phaser from "phaser";
import { BootScene } from "./bootScene";
import { WorldScene } from "./WorldScene";
import { Inventory } from "./Inventory";
import { Dialog } from "./Dialog";
import { TitleScreen } from "./Title";

var config = {
  type: Phaser.CANVAS,
  parent: "content",
  width: 320,
  height: 240,
  zoom: 2,
  pixelArt: true,
  roundPixels: true,
  antialias: false,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  },
  scene: [BootScene, TitleScreen, WorldScene, Inventory, Dialog]
};

var game = new Phaser.Game(config);
