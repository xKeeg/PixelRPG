export class Progression {
  constructor() {
    this.Story = {
      hasBegun: false,
      caughtFish: false,
      givenFish: false
    };
    this.ItemUseLocations = {
      axe: {
        useLocation: "zone_1_sign_break",
        singleUse: false,
        useText: "You swing the axe. It makes a grand THUD",
        callback: "destroy"
      },
      key_1: {
        useLocation: "chest_1",
        singleUse: true,
        useText: "Luckily enough, this happened to be the right key!",
        callback: "destroy"
      },
      fish: {
        useLocation: "merchant",
        singleUse: true,
        useText: "You take the axe. It smells worse than the fish...",
        rewardName: "axe",
        rewardTexture: "axe",
        storyStepEnd: "givenFish"
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
