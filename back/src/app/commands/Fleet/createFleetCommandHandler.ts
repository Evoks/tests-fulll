import type { Fleet } from '../../../domain';
import type { IFleetRepository } from '../../../domain/repositories/IFleetRepository';
import AppError from '../../classes/appError';

type CreateFleetCommand = {
  userId: number;
};

/**
 * Command to create a fleet for a user
 */
export class CreateFleetCommandHandler {
  constructor(private fleetRepository: IFleetRepository) {}

  async handle(command: CreateFleetCommand): Promise<Fleet | undefined> {
    const createdFleet = await this.fleetRepository.create(command.userId);

    if (!createdFleet) {
      throw new AppError(`Error creating fleet for user [${command.userId}]`);
    }

    return createdFleet;
  }
}
