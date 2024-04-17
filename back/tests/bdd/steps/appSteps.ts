/**
	Feature: My app is working

	In order to see my app working
	As a user
	I should be able to call the app with 3 different commands
	$ fleet create <userId>
	$ fleet register-vehicle <fleetId> <vehiclePlateNumber>
	$ fleet localize-vehicle <fleetId> <vehiclePlateNumber> lat lng [alt]
	
	Scenario: I call the app with the create command
		Given I call the app with the command "fleet create 1"
		Then the app should display the fleetId "1"
		Then the app should have created a fleet with fleetId "1"

	Scenario: I call the app with the register-vehicle command
		Given I call the app with the command "fleet register-vehicle 1 ABC-1234"
		Then the app should have create a vehicle with vehicleId "1"

	Scenario: I call the app with the localize-vehicle command
		Given I call the app with the command "fleet localize-vehicle 1 ABC-1234 10.0 20.0 30"
		Then the app should have updated the vehicle with vehicleId "1" location to "10.0 20.0 30"

 */

import dbManager from '../../../src/infra/db/dbManager';
import { before, binding, given, then } from 'cucumber-tsflow';
import testContext from './testContext';
import assert from 'node:assert';
import createUserFleetAction from '../../../src/infra/cli/actions/createUserFleetAction';
import localizeVehicleAction from '../../../src/infra/cli/actions/localizeVehicleAction';
import registerVehicleAction from '../../../src/infra/cli/actions/registerVehicleAction';
import { findOneFleetQueryHandler, findOneVehicleByFleetAndPlateNumberQueryHandler } from '../../../src/infra/config';

@binding()
class AppSteps {
  @before()
  public async beforeEachScenario() {
    // Initialize shared state at the beginning of each scenario
    testContext.vehicle = undefined;
    testContext.fleet = undefined;
    testContext.parkingLocation = undefined;
    await dbManager.clearDBForTesting();
  }

  @given(/I call the app with the command "fleet create (\d+)"/)
  public async givenICallTheAppWithTheCreateCommand(userId: string) {
    await createUserFleetAction(userId);
    const fleetId = Number.parseInt(userId);
    const fleet = await findOneFleetQueryHandler.handle({ fleetId });
    if (!fleet) throw new Error('Error retrieving newly created fleet');
    testContext.fleet = fleet;
  }

  @then(/the app should display the fleetId "(\d+)"/)
  public thenTheAppShouldDisplayTheFleetId(fleetId: string) {
    assert.strictEqual(testContext.fleet?.getId(), fleetId, 'Unexpected fleet ID');
  }

  @then(/the app should have created a fleet with fleetId "(\d+)"/)
  public thenTheAppShouldHaveCreatedAFleetWithFleetId(fleetId: string) {
    assert.ok(testContext.fleet, 'Fleet not created');
  }

  @given(/I call the app with the command "fleet register-vehicle (\d+) ([A-Za-z0-9-]+)"/)
  public async givenICallTheAppWithTheRegisterVehicleCommand(fleetId: string, vehiclePlateNumber: string) {
    await registerVehicleAction(fleetId, vehiclePlateNumber);
    const fleetIdNumber = Number.parseInt(fleetId);
    const vehicle = await findOneVehicleByFleetAndPlateNumberQueryHandler.handle({
      fleetId: fleetIdNumber,
      plateNumber: vehiclePlateNumber,
    });
    if (!vehicle) throw new Error('Error retrieving newly created vehicle');
    testContext.vehicle = vehicle;
  }

  @then(/the app should have create a vehicle with vehicleId "(\d+)/)
  public thenTheAppShouldHaveCreateAVehicleWithVehicleId(vehicleId: string) {
    assert.ok(testContext.vehicle, 'Vehicle not created');
  }

  @given(
    /I call the app with the command "fleet localize-vehicle (\d+) ([A-Za-z0-9-]+) (-?\d{1,2}\.\d{1,7}) (-?\d{1,3}\.\d{1,7}) (\d+)"/,
  )
  public async givenICallTheAppWithTheLocalizeVehicleCommand(
    fleetId: string,
    vehiclePlateNumber: string,
    lat: string,
    lng: string,
    alt: string,
  ) {
    await localizeVehicleAction(fleetId, vehiclePlateNumber, lat, lng, alt);
    const fleetIdNumber = Number.parseInt(fleetId);
    const vehicle = await findOneVehicleByFleetAndPlateNumberQueryHandler.handle({
      fleetId: fleetIdNumber,
      plateNumber: vehiclePlateNumber,
    });
    if (!vehicle) throw new Error('Error retrieving the localized vehicle');
    testContext.vehicle = vehicle;
  }

  @then(
    /the app should have updated the vehicle with vehicle plate number "([A-Za-z0-9-]+)" location to "(-?\d{1,2}\.\d{1,7}) (-?\d{1,3}\.\d{1,7}) (\d+)"/,
  )
  public thenTheAppShouldHaveUpdatedTheVehicleWithVehicleIdLocationTo(
    vehiclePlateNumber: string,
    lat: string,
    lng: string,
    alt: string,
  ) {
    assert.ok(testContext.vehicle, 'Vehicle not updated');
    assert.strictEqual(testContext.vehicle?.getPlateNumber(), vehiclePlateNumber, 'Unexpected vehicle plate number');
    const parkingLocation = testContext.vehicle?.getParkingLocation();
    if (!parkingLocation) {
      throw new Error('Parking location is not set.');
    }
    assert.strictEqual(parkingLocation.lat, Number.parseFloat(lat), 'Unexpected latitude');
    assert.strictEqual(parkingLocation.lng, Number.parseFloat(lng), 'Unexpected longitude');
    assert.strictEqual(parkingLocation.alt, Number.parseInt(alt), 'Unexpected altitude');
  }
}
