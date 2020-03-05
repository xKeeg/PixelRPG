export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    let texture = "person";
    let idleFrame = 1;

    super(scene, x, y, texture, idleFrame);

    scene.physics.add
      .existing(this)
      .setSize(16, 16)
      .setCircle(8, 4, 16);
    scene.add.existing(this);
    this.createAnims(scene);
  }

  createAnims(scene) {
    scene.anims.create({
      key: "down",
      frames: scene.anims.generateFrameNumbers("person", {
        frames: [20, 21, 22, 23]
      }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: "left",
      frames: scene.anims.generateFrameNumbers("person", {
        frames: [35, 36, 37, 38]
      }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: "up",
      frames: scene.anims.generateFrameNumbers("person", {
        frames: [25, 26, 27, 28]
      }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: "right",
      frames: scene.anims.generateFrameNumbers("person", {
        frames: [30, 31, 32, 33]
      }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: "idleDown",
      frames: scene.anims.generateFrameNumbers("person", {
        frames: [0, 1, 2, 3]
      }),
      frameRate: 8,
      repeat: -1
    });
    scene.anims.create({
      key: "idleLeft",
      frames: scene.anims.generateFrameNumbers("person", {
        frames: [15, 16, 17, 18]
      }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: "idleUp",
      frames: scene.anims.generateFrameNumbers("person", {
        frames: [5, 6, 7, 8]
      }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: "idleRight",
      frames: scene.anims.generateFrameNumbers("person", {
        frames: [10, 11, 12, 13]
      }),
      frameRate: 10,
      repeat: -1
    });
  }
}
