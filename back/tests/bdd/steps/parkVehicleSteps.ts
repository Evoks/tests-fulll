import { binding, given, when, then } from 'cucumber-tsflow';
import assert from 'node:assert';
import testContext from './testContext';
import isSameLocation from '../../../src/app/utils/isSameLocation';
import { setVehicleLocationCommandHandler } from '../../../src/infra/config';

@binding()
class ParkVehicleSteps {
  private lastError: Error | undefined = undefined;

  @given('a location')
  public givenALocation() {
    testContext.parkingLocation = {
      lat: 48.8588443,
      lng: 2.2943506,
      alt: 0,
    };
  }

  @given('my vehicle has been parked into this location')
  @when('I park my vehicle at this location')
  @when('I try to park my vehicle at this location')
  public async parkVehicle() {
    try {
      if (!testContext.fleet) throw new Error('Fleet is not set.');
      if (!testContext.vehicle) throw new Error('Vehicle is not set.');
      if (!testContext.parkingLocation) throw new Error('Parking location is not set.');
      if (testContext.fleet.includesVehicle(testContext.vehicle) === false) {
        throw new Error('Vehicle does not belong to a fleet.');
      }

      testContext.vehicle = await setVehicleLocationCommandHandler.handle({
        fleetId: testContext.fleet.getId(),
        plateNumber: testContext.vehicle.getPlateNumber(),
        lat: testContext.parkingLocation.lat,
        lng: testContext.parkingLocation.lng,
        alt: testContext.parkingLocation.alt,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.lastError = error;
      }
    }
  }

  @then('the known location of my vehicle should verify this location')
  public thenVerifyVehicleLocation() {
    if (!testContext.fleet) throw new Error('Fleet is not set.');
    if (!testContext.vehicle) throw new Error('Vehicle is not set.');
    if (!testContext.parkingLocation) throw new Error('Parking location is not set.');
    const vehicleParkingLocation = testContext.vehicle.getParkingLocation();
    if (!vehicleParkingLocation) throw new Error('vehicleParkingLocation is not set.');

    assert(
      isSameLocation(vehicleParkingLocation, testContext.parkingLocation),
      'Vehicle parking location is not the same as the location.',
    );
  }

  @then('I should be informed that my vehicle is already parked at this location')
  public thenInformedVehicleAlreadyParked() {
    assert(this.lastError?.message === 'The vehicle is already parked at this location.', 'Unexpected error message');
  }
}
