import type { Fleet, Vehicle } from '..';

export interface IFleetRepository {
  create(userId: number): Promise<Fleet | undefined>;
  findOneById(fleetId: number): Promise<Fleet | undefined>;
  findAllFleetVehicles(fleetId: number): Promise<Vehicle[]>;
  update(fleet: Fleet): Promise<void>;
}
