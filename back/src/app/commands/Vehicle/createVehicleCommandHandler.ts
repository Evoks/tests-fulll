import type { Vehicle } from '../../../domain';
import type { IVehicleRepository } from '../../../domain/repositories/IVehicleRepository';
import AppError from '../../classes/appError';

type CreateVehicleCommand = {
  plateNumber: string;
};

/**
 * Command to create a vehicle
 */
export class CreateVehicleCommandHandler {
  constructor(private vehicleRepository: IVehicleRepository) {}

  async handle(command: CreateVehicleCommand): Promise<Vehicle | undefined> {
    const createdVehicle = await this.vehicleRepository.create(command.plateNumber);

    if (!createdVehicle) {
      throw new AppError(`Error createing vehicle with plate number [${command.plateNumber}]`);
    }

    return createdVehicle;
  }
}
