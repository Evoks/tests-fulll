import type { ParkingLocation } from '../../../domain/entities/vehicle';
import type Vehicle from '../../../domain/entities/vehicle';
import type { IVehicleRepository } from '../../../domain/repositories/IVehicleRepository';
import AppError from '../../classes/appError';

type SetVehicleLocationCommand = {
  fleetId: number;
  plateNumber: string;
  lng: number;
  lat: number;
  alt?: number;
};

/**
 * Command to set the location of a vehicle
 */
export class SetVehicleLocationCommandHandler {
  constructor(private vehicleRepository: IVehicleRepository) {}

  async handle(command: SetVehicleLocationCommand): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOneByFleetAndPlateNumber(command.fleetId, command.plateNumber);

    if (!vehicle) {
      throw new AppError(`Vehicle [${command.plateNumber}] is not registered in the fleet [${command.fleetId}]`);
    }

    vehicle.setParkingLocation({
      lat: command.lat,
      lng: command.lng,
      alt: command.alt,
    } as ParkingLocation);

    await this.vehicleRepository.update(vehicle);
    return vehicle;
  }
}
