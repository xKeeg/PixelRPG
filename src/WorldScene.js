import { Player } from "./Player";

export class WorldScene extends Phaser.Scene {
  constructor() {
    super("WorldScene");
  }

  create() {
    // Player Character

    // Map Stuff
    var map = this.make.tilemap({ key: "map" });
    var tiles = map.addTilesetImage("spritesheet", "tiles");

    // Make Layers
    var ground = map.createStaticLayer("Ground", tiles, 0, 0);
    var water = map.createStaticLayer("Water", tiles, 0, 0);
    var structures = map.createStaticLayer("Structures", tiles, 0, 0);
    this.player = new Player(this, 100, 120);
    var fringe = map.createStaticLayer("Fringe", tiles, 0, 0);
    var interact = map.createStaticLayer("Interact", tiles, 0, 0);
    var decorations = map.createStaticLayer("Decoration", tiles, 0, 0);

    ///////////////////// Make Collisions

    // Buildings, Trees etc
    this.physics.add.collider(this.player, structures);
    structures.setCollisionByProperty({ collides: true });

    // Water
    this.physics.add.collider(this.player, water);
    water.setCollisionByProperty({ collides: true });

    // Interactables
    this.physics.add.collider(this.player, interact);
    interact.setCollisionByProperty({ collides: true });

    ///////////////////// Map Events
    // Cross Bridge
    structures.setTileIndexCallback([267, 269], () => {
      // Callback
      console.info("Crossing Bridge");

      // Remove Callback to Stop Recursion
      structures.setTileIndexCallback([267, 269], null);
    });

    // Fishing Pole
    interact.setTileLocationCallback(10, 13, 1, 1, () => {
      console.info("Hitting Rod");
      interact.setTileLocationCallback(10, 13, 1, 1, null);
    });

    // Cart Merchant
    interact.setTileLocationCallback(15, 7, 3, 1, () => {
      console.info("Hitting Merchant");
      interact.setTileLocationCallback(15, 7, 3, 1, null);
    });

    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;

    this.player.createAnims(this);

    this.spawns = this.physics.add.group({
      classType: Phaser.GameObjects.Zone
    });
    for (var i = 0; i < 1; i++) {
      var x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      var y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
      // x, y, spawn-width, spawn-height
      this.spawns.create(x, y, 20, 20);
    }
    this.physics.add.overlap(
      this.player,
      this.spawns,
      this.onMeetEnemy,
      false,
      this
    );
  }

  update() {
    this.player.body.setVelocity(0);
    // Movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-80);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(80);
    }

    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-80);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(80);
    }

    // Anims
    if (this.cursors.left.isDown) {
      this.player.anims.play("left", true);
      this.player.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.player.anims.play("right", true);
      this.player.flipX = false;
    } else if (this.cursors.up.isDown) {
      this.player.anims.play("up", true);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play("down", true);
    } else {
      this.player.anims.stop();
    }
  }

  onMeetEnemy(player, zone) {
    // move zone to different location
    zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

    // shake world
    this.cameras.main.shake(400);
  }
}
