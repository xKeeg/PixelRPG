import { Player } from "./Player";
import { Dialog } from "./Dialog";
import { Progression } from "./Progression";
import { Tilemaps } from "phaser";

export class WorldScene extends Phaser.Scene {
  constructor() {
    super("WorldScene");
  }

  create() {
    // Get handle to and launch Inventory
    this.inventory = this.scene.get("Inventory");
    this.scene.launch("Inventory");

    // Get Story Info
    this.Progress = new Progression();

    // Global Pause State
    this.isPaused = false;

    // Load map from file
    var map = this.make.tilemap({ key: "map" });
    this.createMapAndCollisions(map);

    // Create Keyboard input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.WASD = this.input.keyboard.addKeys({
      W: Phaser.Input.Keyboard.KeyCodes.W,
      A: Phaser.Input.Keyboard.KeyCodes.A,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      D: Phaser.Input.Keyboard.KeyCodes.D
    });

    // Set bounds to map width not screen width
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Camera Follows Player
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;
    this.player.createAnims(this);
  }

  update() {
    this.playerMovementHandler();
  }

  toggleFocus(force = false) {
    if (force) {
      this.isPaused = false;
    } else this.isPaused = !this.isPaused;
  }

  dialogPrompt(text) {
    // Create a Dialogue Box
    const dialogBox = new Dialog(text);
    this.scene.add("Dialog", dialogBox);

    // Set game is Paused
    this.isPaused = true;

    // Draw Dialog Ovelay
    this.scene.launch("Dialog");
  }

  playerMovementHandler() {
    this.player.body.setVelocity(0);

    // Get Center of visible screen
    let centerX = this.cameras.main.displayWidth / 2;
    let centerY = this.cameras.main.displayHeight / 2;

    // If Player is offset centre of screen (edge of map) then recalibrate touch input
    // TODO :: Currently handles top and left bounds, implement bottom and right bounds.

    centerX = Math.min(centerX, this.player.x);
    centerY = Math.min(centerY, this.player.y);

    // Adjusts boundaries for touch input detection
    const inputSensitivity = 0.15;
    const screen = {
      left: centerX * (1 - inputSensitivity),
      right: centerX * (1 + inputSensitivity),
      up: centerY * (1 - inputSensitivity),
      down: centerY * (1 + inputSensitivity)
    };

    // Facing Direction with regard to Phaser.Const...
    const directionEnum = { LEFT: 13, RIGHT: 14, UP: 11, DOWN: 12 };

    var pointer = this.input.activePointer;
    if (pointer.isDown) {
      var touchX = pointer.x;
      var touchY = pointer.y;
    } else touchX = touchY = undefined;

    // console.log("X: " + touchX);
    // console.log("Y: " + touchY);

    // Arrow Keys || Mouse/Touch || WASD
    const LEFT =
      this.cursors.left.isDown || touchX < screen.left || this.WASD.A.isDown;
    const RIGHT =
      this.cursors.right.isDown || touchX > screen.right || this.WASD.D.isDown;
    const UP =
      this.cursors.up.isDown || touchY < screen.up || this.WASD.W.isDown;
    const DOWN =
      this.cursors.down.isDown || touchY > screen.down || this.WASD.S.isDown;

    if (!this.isPaused) {
      if (LEFT) {
        this.player.body.setVelocityX(-80);
      } else if (RIGHT) {
        this.player.body.setVelocityX(80);
      }

      if (UP) {
        this.player.body.setVelocityY(-80);
      } else if (DOWN) {
        this.player.body.setVelocityY(80);
      }

      // Anims
      if (LEFT) {
        this.player.anims.play("left", true);
      } else if (RIGHT) {
        this.player.anims.play("right", true);
      } else if (UP) {
        this.player.anims.play("up", true);
      } else if (DOWN) {
        this.player.anims.play("down", true);
      } else if (this.player.body.facing === directionEnum.LEFT) {
        this.player.anims.play("idleLeft", true);
      } else if (this.player.body.facing === directionEnum.RIGHT) {
        this.player.anims.play("idleRight", true);
      } else if (this.player.body.facing === directionEnum.UP) {
        this.player.anims.play("idleUp", true);
      } else if (this.player.body.facing === directionEnum.DOWN) {
        this.player.anims.play("idleDown", true);
      }
    } else {
      if (this.player.body.facing === directionEnum.LEFT) {
        this.player.anims.play("idleLeft", true);
      } else if (this.player.body.facing === directionEnum.RIGHT) {
        this.player.anims.play("idleRight", true);
      } else if (this.player.body.facing === directionEnum.UP) {
        this.player.anims.play("idleUp", true);
      } else if (this.player.body.facing === directionEnum.DOWN) {
        this.player.anims.play("idleDown", true);
      }
    }
  }

  createMapAndCollisions(map) {
    var tiles = map.addTilesetImage("spritesheet", "tiles");

    // Make Layers
    var ground = map.createStaticLayer("Ground", tiles, 0, 0);
    var groundDeco = map.createStaticLayer("GroundDeco", tiles, 0, 0);
    var water = map.createStaticLayer("Water", tiles, 0, 0);
    var structures = map.createStaticLayer("Structures", tiles, 0, 0);
    this.interact = map.createStaticLayer("Interact", tiles, 0, 0);
    var decorations = map.createStaticLayer("Decoration", tiles, 0, 0);
    this.player = new Player(this, 100, 120);
    var fringe = map.createStaticLayer("Fringe", tiles, 0, 0);

    /********** Make Collisions ***********/

    // Buildings, Trees etc
    this.physics.add.collider(this.player, structures);
    structures.setCollisionByProperty({ collides: true });

    // Water
    this.physics.add.collider(this.player, water);
    water.setCollisionByProperty({ collides: true });

    // Interactables
    this.physics.add.collider(this.player, this.interact);
    this.interact.setCollisionByProperty({ collides: true });

    /********** Map Events  ***********/
    // Cross Bridge
    structures.setTileIndexCallback([267, 269], () => {
      this.dialogPrompt("The Cart Merchant calls you over...");
      this.Progress.Story.hasBegun = true;
      structures.setTileIndexCallback([267, 269], null);
    });

    // Fishing Pole
    this.interact.setTileLocationCallback(10, 13, 1, 1, () => {
      if (this.Progress.Story.hasBegun === false) {
        this.dialogPrompt("You don't need this yet!");
      } else {
        this.dialogPrompt("You caught a fish! Yuk!");
        this.Progress.Story.caughtFish = true;
      }
    });

    // Zone 1 Sign
    this.interact.setTileLocationCallback(2, 2, 1, 1, () => {
      this.dialogPrompt("This isn't Kansas...");
    });

    // Cart Merchant
    this.interact.setTileLocationCallback(15, 7, 3, 1, () => {
      if (this.Progress.Story.caughtFish === false) {
        this.dialogPrompt("*OINK* Gimme fish. Get Axe!");
      } else {
        this.inventory.addItem("axe", "axe");
        this.dialogPrompt("You take the axe. It smells worse than the fish...");
        this.interact.setTileLocationCallback(15, 7, 3, 1, null);
      }
    });

    // Zone 1 Chest
    this.interact.setTileLocationCallback(1, 16, 2, 1, () => {
      this.dialogPrompt("LOCKED! *Gotta find the key!*");
    });

    // Setup world size
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    this.player.anims.play("idleDown");
    this.inventory.addItem("key", "tmp2");
  }

  useItem(item) {
    // Get the designated use location of the item
    const location = this.Progress.ItemUseLocations[item.name].useLocation;
    const message = this.Progress.ItemUseLocations[item.name].useText;

    // Get the object from Progress
    const objLocation = this.Progress.Locations[location];

    // Readability
    const TopLeftXInteract = objLocation.x;
    const TopLeftYInteract = objLocation.y;
    const width = objLocation.width;
    const height = objLocation.height;

    const interactableTiles = this.interact.getTilesWithin(
      TopLeftXInteract,
      TopLeftYInteract,
      width,
      height
    );
    let count = interactableTiles.length;

    // As the camera pans the x,y of items changes. This get's the original x,y
    const itemOffsetCamera = this.cameras.main.getWorldPoint(item.x, item.y);

    // Offset 16 to allow for tile size
    if (
      itemOffsetCamera.x > interactableTiles[0].pixelX &&
      itemOffsetCamera.y > interactableTiles[0].pixelY &&
      itemOffsetCamera.x < interactableTiles[count - 1].pixelX + 16 &&
      itemOffsetCamera.y < interactableTiles[count - 1].pixelY + 16
    ) {
      this.dialogPrompt(message);
      this.toggleFocus(true);
      return true;
    } else return false;
  }
}
