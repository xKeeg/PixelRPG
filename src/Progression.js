export class Progression {
  constructor() {
    this.Story = {
      hasBegun: false,
      caughtFish: false,
      givenFish: false
    };
    this.ItemUseLocations = {
      axe: {
        useLocation: "merchant",
        singleUse: true,
        useText: "You swing the axe. It makes a grand THUD"
      },
      key_1: {
        useLocation: "chest_1",
        singleUse: true,
        useText: "Luckily enough, this happned to be the right key!",
        callback: "openChest1"
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
      }
    };
  }
}
