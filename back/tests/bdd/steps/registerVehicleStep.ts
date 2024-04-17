import { binding, given, when, then } from 'cucumber-tsflow';
import assert from 'node:assert';
import testContext from './testContext';
import type { Fleet } from '../../../src/domain';
import { createFleetCommandHandler, registerVehicleToFleetCommandHandler } from '../../../src/infra/config';

@binding()
class RegisterVehicleSteps {
  private anotherUserFleet?: Fleet;
  private lastError?: Error;

  constructor() {}

  @given('the fleet of another user')
  public async givenTheFleetOfAnotherUser() {
    this.anotherUserFleet = await createFleetCommandHandler.handle({
      userId: 2,
    });
  }

  @given("this vehicle has been registered into the other user's fleet")
  public async givenVehicleRegisteredInAnotherFleet() {
    if (!this.anotherUserFleet) {
      throw new Error('Another user fleet is not set.');
    }
    if (!testContext.vehicle) {
      throw new Error('Vehicle is not set.');
    }
    this.anotherUserFleet = await registerVehicleToFleetCommandHandler.handle({
      fleetId: this.anotherUserFleet.getId(),
      vehicle: testContext.vehicle,
    });
  }

  @when('I register this vehicle into my fleet')
  @when('I have registered this vehicle into my fleet')
  public async whenIRegisterThisVehicle() {
    if (!testContext.fleet) throw new Error('Fleet is not set.');
    if (!testContext.vehicle) throw new Error('Vehicle is not set.');
    testContext.fleet = await registerVehicleToFleetCommandHandler.handle({
      fleetId: testContext.fleet.getId(),
      vehicle: testContext.vehicle,
    });
  }

  @when('I try to register this vehicle into my fleet')
  public async whenITryToRegisterThisVehicle() {
    if (!testContext.fleet) throw new Error('Fleet is not set.');
    if (!testContext.vehicle) throw new Error('Vehicle is not set.');
    try {
      testContext.fleet.registerVehicleToFleet(testContext.vehicle);
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.lastError = error;
      }
    }
  }

  @then('I should be informed this this vehicle has already been registered into my fleet')
  public thenInformedVehicleAlreadyRegistered() {
    assert.strictEqual(this.lastError?.message, 'Vehicle already exists in the fleet.', 'Unexpected error message');
  }

  @then('this vehicle should be part of my vehicle fleet')
  public thenVehicleIsPartOfFleet() {
    if (!testContext.fleet) throw new Error('Fleet is not set.');
    if (!testContext.vehicle) throw new Error('Vehicle is not set.');
    assert(testContext.fleet.includesVehicle(testContext.vehicle), 'Vehicle was not found in the fleet');
  }
}
