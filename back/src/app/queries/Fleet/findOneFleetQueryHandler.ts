import type { Fleet } from '../../../domain';
import type { IFleetRepository } from '../../../domain/repositories/IFleetRepository';

type FindOneFleetQuery = {
  fleetId: number;
};

/**
 * Query to find a fleet by id
 */
export class FindOneFleetQueryHandler {
  constructor(private fleetRepository: IFleetRepository) {}

  async handle(command: FindOneFleetQuery): Promise<Fleet | undefined> {
    return await this.fleetRepository.findOneById(command.fleetId);
  }
}
