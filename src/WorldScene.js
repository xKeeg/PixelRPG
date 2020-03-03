import { Player } from "./Player";
import { Dialog } from "./Dialog";
import { Progression } from "./Progression";

export class WorldScene extends Phaser.Scene {
  constructor() {
    super("WorldScene");
  }

  create() {
    this.Progress = new Progression();
    // Map Stuff
    var map = this.make.tilemap({ key: "map" });
    var tiles = map.addTilesetImage("spritesheet", "tiles");

    // Make Layers
    var ground = map.createStaticLayer("Ground", tiles, 0, 0);
    var groundDeco = map.createStaticLayer("GroundDeco", tiles, 0, 0);
    var water = map.createStaticLayer("Water", tiles, 0, 0);
    var structures = map.createStaticLayer("Structures", tiles, 0, 0);
    this.player = new Player(this, 100, 120);
    var fringe = map.createStaticLayer("Fringe", tiles, 0, 0);
    var interact = map.createStaticLayer("Interact", tiles, 0, 0);
    var decorations = map.createStaticLayer("Decoration", tiles, 0, 0);

    /********** Make Collisions ***********/

    // Buildings, Trees etc
    this.physics.add.collider(this.player, structures);
    structures.setCollisionByProperty({ collides: true });

    // Water
    this.physics.add.collider(this.player, water);
    water.setCollisionByProperty({ collides: true });

    // Interactables
    this.physics.add.collider(this.player, interact);
    interact.setCollisionByProperty({ collides: true });

    /********** Map Events  ***********/
    // Cross Bridge
    structures.setTileIndexCallback([267, 269], () => {
      this.dialogPrompt("The Cart Merchant calls you over...");
      this.Progress.Story.hasBegun = true;
      structures.setTileIndexCallback([267, 269], null);
    });

    // Fishing Pole
    interact.setTileLocationCallback(10, 13, 1, 1, () => {
      if (this.Progress.Story.hasBegun === false) {
        this.dialogPrompt("You don't need this yet!");
      } else {
        this.dialogPrompt("You caught a fish! Yuk!");
        this.Progress.Story.caughtFish = true;
      }
    });

    // Zone 1 Sign
    interact.setTileLocationCallback(2, 2, 1, 1, () => {
      this.dialogPrompt("This isn't Kansas...");
      interact.setTileLocationCallback(2, 2, 1, 1, null);
    });

    // Cart Merchant
    interact.setTileLocationCallback(15, 7, 3, 1, () => {
      if (this.Progress.Story.caughtFish === false) {
        this.dialogPrompt("*OINK* Gimme fish. Get Axe!");
      } else {
        this.dialogPrompt("You take the axe. It smells worse than the fish...");
      }
    });

    // Setup world size
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    // Create Keyboard input
    this.cursors = this.input.keyboard.createCursorKeys();

    // Camera Follows Player
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;
    this.player.createAnims(this);

    // ENEMY LOGIC
    // this.spawns = this.physics.add.group({
    //   classType: Phaser.GameObjects.Zone
    // });
    // for (var i = 0; i < 1; i++) {
    //   var x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    //   var y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
    //   // x, y, spawn-width, spawn-height
    //   this.spawns.create(x, y, 20, 20);
    // }
    // this.physics.add.overlap(
    //   this.player,
    //   this.spawns,
    //   this.onMeetEnemy,
    //   false,
    //   this
    // );
  }

  update() {
    this.playerMovementHandler();
  }

  onMeetEnemy(player, zone) {
    // move zone to different location
    zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

    // shake world
    this.cameras.main.shake(400);
  }

  dialogPrompt(text) {
    // Create a Dialogue Box
    const dialogBox = new Dialog(text);
    this.scene.add("Dialog", dialogBox);

    // Stop stepping main scene
    this.input.keyboard.resetKeys();
    this.scene.pause("WorldScene");
    this.cursors = this.input.keyboard.createCursorKeys();

    // Draw Dialog Ovelay
    this.scene.launch("Dialog");
  }

  playerMovementHandler() {
    this.player.body.setVelocity(0);

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
}
