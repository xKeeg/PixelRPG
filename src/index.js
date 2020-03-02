import Phaser from "phaser";
import { BootScene } from "./bootScene";
import { WorldScene } from "./WorldScene";

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
    mode: Phaser.Scale.FIT
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  },
  scene: [BootScene, WorldScene]
};

var game = new Phaser.Game(config);
