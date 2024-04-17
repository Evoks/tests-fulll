import type { Vehicle } from '../../../domain';
import type { IVehicleRepository } from '../../../domain/repositories/IVehicleRepository';

type FindOneVehicleByPlateNumberQuery = {
  plateNumber: string;
};

/**
 * Query to find a vehicle by its plate number
 */
export class FindOneVehicleByPlateNumberQueryHandler {
  constructor(private vehicleRepository: IVehicleRepository) {}

  async handle(command: FindOneVehicleByPlateNumberQuery): Promise<Vehicle | undefined> {
    return await this.vehicleRepository.findOneByPlateNumber(command.plateNumber);
  }
}
