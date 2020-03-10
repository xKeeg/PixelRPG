import { Player } from "./Player";
import { Progression } from "./Progression";

export class WorldScene extends Phaser.Scene {
  constructor() {
    super("WorldScene");
  }

  create() {
    // Get handle to and launch Overlay Scenes
    this.inventory = this.scene.get("Inventory");
    this.dialog = this.scene.get("Dialog");
    this.scene.launch("Inventory");
    this.scene.launch("Dialog");

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

  // Focus === Handles player input. Game logic still runs
  toggleFocus(force = false) {
    if (force) {
      this.isPaused = false;
    } else this.isPaused = !this.isPaused;
  }

  dialogPrompt(text) {
    this.dialog.addDialog(text);
    this.isPaused = true;
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
    const inputSensitivity = 0.2;
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
    this.interact = map.createDynamicLayer("Interact", tiles, 0, 0);
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
      structures.setTileIndexCallback([267, 269], null);
    });

    // Fishing Pole
    this.interact.setTileLocationCallback(10, 13, 1, 1, () => {
      if (this.Progress.Story.hasBegun === false) {
        this.dialogPrompt("You don't need this yet!");
      } else {
        this.dialogPrompt("You caught a fish! Yuk!");
        this.inventory.addItem("fish", "fish");
        this.Progress.Story.caughtFish = true;
        this.interact.setTileLocationCallback(10, 13, 1, 1, null);
      }
    });

    // Zone 1 Sign
    this.interact.setTileLocationCallback(2, 2, 1, 1, () => {
      this.dialogPrompt("This isn't Kansas...");
    });

    // Zone 1 Breakable Sign
    this.interact.setTileLocationCallback(24, 11, 1, 1, () => {
      this.dialogPrompt("This looks like it could be broken...");
      this.dialogPrompt("If only you had something strong enough!");
    });

    // Cart Merchant
    this.interact.setTileLocationCallback(15, 7, 3, 1, () => {
      this.Progress.Story.hasBegun = true;
      if (this.Progress.Story.givenFish === false) {
        this.dialogPrompt("*OINK* Gimme fish. Get Axe!");
      } else {
        this.interact.setTileLocationCallback(15, 7, 3, 1, null);
      }
    });

    // Zone 1 Chest
    this.interact.setTileLocationCallback(1, 16, 2, 1, () => {
      this.dialogPrompt("LOCKED! *Gotta find the key!*");
    });
    // Zone 1 Hint
    this.interact.setTileLocationCallback(3, 17, 1, 1, () => {
      this.dialogPrompt("To open this you simply need tap your heels thrice");
      this.dialogPrompt("Find me just north of where you entered this life");
    });
    // Zone 1 Key
    this.interact.setTileLocationCallback(2, 0, 1, 1, () => {
      this.inventory.addItem("key_1", "key1");
      this.dialogPrompt("You find an oddly shaped key, what could it open...");
      this.interact.setTileLocationCallback(2, 0, 1, 1, null);
    });

    // Setup world size
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    this.player.anims.play("idleDown");
  }

  useItem(item) {
    // Get the designated use location of the item
    const location = this.Progress.ItemUseLocations[item.name].useLocation;
    const message = this.Progress.ItemUseLocations[item.name].useText;
    const usedItem = this.Progress.ItemUseLocations[item.name];

    // Get place to use the item
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
      if (usedItem.rewardName != undefined) {
        this.inventory.addItem(usedItem.rewardName, usedItem.rewardTexture);
      }
      if (usedItem.storyStepEnd != undefined) {
        this.Progress.Story[usedItem.storyStepEnd] = true;
      }
      if (usedItem.callback != undefined) {
        this.itemCallback(usedItem.callback, objLocation);
      }
      if (usedItem.singleUse === true) return true;
      else return false;
    } else return false;
  }

  itemCallback(callback, useLocation) {
    switch (callback) {
      case "destroy":
        let tiles = this.interact.getTilesWithin(
          useLocation.x,
          useLocation.y,
          useLocation.width,
          useLocation.height
        );
        for (let i = 0; i < tiles.length; i++) {
          this.interact.removeTileAt(tiles[i].x, tiles[i].y);
        }
        this.interact.setTileLocationCallback(
          useLocation.x,
          useLocation.y,
          useLocation.width,
          useLocation.height,
          null
        );
        break;
      default:
        break;
    }
  }
}
