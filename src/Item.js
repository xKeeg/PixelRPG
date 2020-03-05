export class Item extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, name, texture) {
    super(scene, 0, 0, texture);

    scene.physics.add.existing(this);
    scene.add.existing(this);

    this.setScale(0.5);
    this.setDepth(5);

    this.setInteractive();

    this.name = name;
    this.isMoving = false;
  }
}
