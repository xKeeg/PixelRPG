export class Progression {
  constructor() {
    this.Story = {
      hasBegun: false,
      caughtFish: false
    };
    this.ItemUseLocations = {
      axe: {
        useLocation: "merchant",
        singleUse: true
      },
      key: {
        useLocation: "chest_1",
        singleUse: true
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
