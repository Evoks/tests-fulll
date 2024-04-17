import dbManager from '../../../src/infra/db/dbManager';
import { before, binding, given } from 'cucumber-tsflow';
import testContext from './testContext';
import {
  createFleetCommandHandler,
  createVehicleCommandHandler,
  findOneFleetQueryHandler,
} from '../../../src/infra/config';
import assert from 'node:assert';

@binding()
class CommonSteps {
  @before()
  public async beforeEachScenario() {
    // Initialize shared state at the beginning of each scenario
    testContext.vehicle = undefined;
    testContext.fleet = undefined;
    testContext.parkingLocation = undefined;
    await dbManager.clearDBForTesting();
  }

  @given('my fleet')
  public async givenMyFleet() {
    testContext.fleet = await createFleetCommandHandler.handle({ userId: 1 });
  }

  @given(/my fleet with ID (\d+)/)
  public async givenMyFleetId(fleetId: number) {
    const createdFleetId = await createFleetCommandHandler.handle({
      userId: fleetId,
    });
    if (!createdFleetId) throw new Error('Error creating fleet');

    assert.strictEqual(createdFleetId, fleetId, 'Unexpected fleet ID');

    const fleet = await findOneFleetQueryHandler.handle({ fleetId });
    if (!fleet) throw new Error('Error retrieving newly created fleet');
    testContext.fleet = fleet;
  }

  @given('a vehicle')
  public async givenAVehicle() {
    testContext.vehicle = await createVehicleCommandHandler.handle({
      plateNumber: 'ABC-1234',
    });
  }
}
