export class Progression {
  constructor() {
    this.Story = {
      hasBegun: false,
      caughtFish: false
    };
    this.ItemUseLocations = {
      axe: {
        useLocation: "merchant",
        singleUse: true,
        useText: "You swing the axe. It makes a grand THUD"
      },
      key: {
        useLocation: "chest_1",
        singleUse: true,
        useText: "Luckily enough, this happned to be the right key!"
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
        y: 16,
        width: 2,
        height: 1
      }
    };
  }
}
