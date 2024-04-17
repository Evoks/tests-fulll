import type { Fleet, Vehicle } from '../../../src/domain';
import type { ParkingLocation } from '../../../src/domain/entities/vehicle';

// We need a singleton to share state between features that have steps in common
class TestContext {
  private static instance: TestContext;
  public vehicle: Vehicle | undefined = undefined;
  public fleet: Fleet | undefined = undefined;
  public parkingLocation: ParkingLocation | undefined = undefined;

  public static getInstance(): TestContext {
    if (!TestContext.instance) {
      TestContext.instance = new TestContext();
    }
    return TestContext.instance;
  }
}

export default TestContext.getInstance();
