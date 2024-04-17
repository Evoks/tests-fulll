import type { IFleetRepository } from '../../../domain/repositories/IFleetRepository';
import type { Fleet, Vehicle } from '../../../domain';
import AppError from '../../classes/appError';

type RegisterVehicleToFleetCommand = {
  fleetId: number;
  vehicle: Vehicle;
};

/**
 * Command to register a vehicle in a fleet
 */
export class RegisterVehicleToFleetCommandHandler {
  constructor(private fleetRepository: IFleetRepository) {}

  async handle(command: RegisterVehicleToFleetCommand): Promise<Fleet> {
    const fleet = await this.fleetRepository.findOneById(command.fleetId);

    if (!fleet) {
      throw new AppError(`Fleet with id ${command.fleetId} not found`);
    }

    fleet.registerVehicleToFleet(command.vehicle);

    await this.fleetRepository.update(fleet);
    return fleet;
  }
}
