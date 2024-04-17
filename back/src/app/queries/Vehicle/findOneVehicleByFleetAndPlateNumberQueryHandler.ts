import type { Vehicle } from '../../../domain';
import type { IVehicleRepository } from '../../../domain/repositories/IVehicleRepository';

type FindOneVehicleByFleetAndPlateNumberQuery = {
  fleetId: number;
  plateNumber: string;
};

/**
 * Query to find a vehicle by its fleet id and plate number
 */
export class FindOneVehicleByFleetAndPlateNumberQueryHandler {
  constructor(private vehicleRepository: IVehicleRepository) {}

  async handle(command: FindOneVehicleByFleetAndPlateNumberQuery): Promise<Vehicle | undefined> {
    return await this.vehicleRepository.findOneByFleetAndPlateNumber(command.fleetId, command.plateNumber);
  }
}
