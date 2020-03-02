export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    let texture = "player";
    let idleFrame = 6;

    super(scene, x, y, texture, idleFrame);

    scene.physics.add.existing(this);
    scene.add.existing(this);
    this.createAnims(scene);
  }

  createAnims(scene) {
    scene.anims.create({
      key: "right",
      frames: scene.anims.generateFrameNumbers("player", {
        frames: [1, 7, 1, 13]
      }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: "left",
      frames: scene.anims.generateFrameNumbers("player", {
        frames: [1, 7, 1, 13]
      }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: "up",
      frames: scene.anims.generateFrameNumbers("player", {
        frames: [2, 8, 2, 14]
      }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: "down",
      frames: scene.anims.generateFrameNumbers("player", {
        frames: [0, 6, 0, 12]
      }),
      frameRate: 10,
      repeat: -1
    });
  }
}
