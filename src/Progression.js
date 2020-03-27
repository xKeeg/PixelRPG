export class Progression {
  constructor() {
    this.Story = {
      hasBegun: false,
      caughtFish: false,
      givenFish: false
    };
    this.ItemUseLocations = {
      /*
  
      *-* TEMPLATE *-*

      Callbacks:
        "destroy" : Unconditionally destroys the location that it is used on

      itemName: {
        useLocation: Location Key of where the item should be used (Locations listed below)
        singleUse: Does the item destroy on use
        useText: Dialog to be shown when item is used (Restricted to one dialog box
        callback: See Above for all possible callbacks
        rewardName: Item to give player with when used correctly.
        rewardTexture: Item Texture for above
        storyStepEnd: Story step to mark as complete (above => this.Story{...}   ) 
      }

      */
      axe: {
        useLocation: "zone_1_sign_break",
        singleUse: true,
        useText: "You swing the axe. It makes a grand THUD",
        callback: "destroy"
      },
      key_1: {
        useLocation: "chest_1",
        singleUse: true,
        useText: "Luckily enough, this happened to be the right key!",
        callback: "destroy",
        rewardName: "sword_1",
        rewardTexture: "sword1"
      },
      fish: {
        useLocation: "merchant",
        singleUse: true,
        useText: "You take the axe. It smells worse than the fish...",
        rewardName: "axe",
        rewardTexture: "axe",
        storyStepEnd: "givenFish"
      },
      sword_1: {
        useLocation: "merchant",
        singleUse: false,
        useText: "One deft swing and it dies. Wow!"
      }
    };
    this.Locations = {
      merchant: {
        x: 15,
        y: 5,
        width: 3,
        height: 3
      },
      chest_1: {
        x: 1,
        y: 15,
        width: 2,
        height: 2
      },
      zone_1_sign_break: {
        x: 24,
        y: 11,
        width: 1,
        height: 1
      }
    };
  }
}
