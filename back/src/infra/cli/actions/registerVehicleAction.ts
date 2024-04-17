import AppError from '../../../app/classes/appError';
import validateIntParam from '../../../app/utils/validateIntParam';
import type { Fleet, Vehicle } from '../../../domain';
import {
  createVehicleCommandHandler,
  findOneFleetQueryHandler,
  findOneVehicleByPlateNumberQueryHandler,
  registerVehicleToFleetCommandHandler,
} from '../../config';

/**
 * Find a fleet by its id
 * @param fleetId
 * @returns Promise<Fleet>
 */
export async function findOneFleet(fleetId: number): Promise<Fleet> {
  const fleet = await findOneFleetQueryHandler.handle({ fleetId });
  if (!fleet) {
    throw new AppError(`Fleet ${fleetId} does not exist`);
  }
  return fleet;
}

/**
 * Find or create a vehicle by its plate number
 * @param plateNumber
 * @returns Promise<Vehicle>
 */
export async function findOrCreateVehicle(plateNumber: string): Promise<Vehicle> {
  let vehicle = await findOneVehicleByPlateNumberQueryHandler.handle({
    plateNumber,
  });
  if (!vehicle) {
    vehicle = await createVehicleCommandHandler.handle({ plateNumber });
    if (!vehicle) throw new AppError('Error creating vehicle');
  }
  return vehicle;
}

/**
 *
 * @param fleet
 * @param vehicle
 * @returns Promise<Fleet>
 */
export async function registerVehicleInFleet(fleet: Fleet, vehicle: Vehicle): Promise<Fleet> {
  if (fleet.getFleetVehicles().some((v) => v.getPlateNumber() === vehicle.getPlateNumber())) {
    throw new AppError(`Vehicle ${vehicle.getPlateNumber()} already registered in fleet`);
  }
  return await registerVehicleToFleetCommandHandler.handle({
    fleetId: fleet.getId(),
    vehicle,
  });
}

/**
 * CLI action handler to register a vehicle in a fleet
 * @param paramFleetId
 * @param plateNumber
 */
export default async function registerVehicleAction(paramFleetId: string, plateNumber: string): Promise<void> {
  const fleetId = validateIntParam(paramFleetId, 'FleetId');

  try {
    const fleet = await findOneFleetQueryHandler.handle({ fleetId });
    if (!fleet) throw new AppError(`Fleet ${fleetId} does not exist`);

    const vehicle = await findOrCreateVehicle(plateNumber);
    await registerVehicleInFleet(fleet, vehicle);

    console.log(`Vehicle [${vehicle.getPlateNumber()}] registered successfully`);
  } catch (error) {
    if (error instanceof AppError) {
      console.error(error.message);
    } else {
      console.error('ERROR - registerVehicleAction');
    }
  }
}
