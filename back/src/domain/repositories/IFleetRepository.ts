import type { Fleet } from '..';
import type { VehicleMap } from '../aggregates/fleet';

export interface IFleetRepository {
  create(userId: number): Promise<Fleet | undefined>;
  findOneById(fleetId: number): Promise<Fleet | undefined>;
  findAllFleetVehicles(fleetId: number): Promise<VehicleMap>;
  update(fleet: Fleet): Promise<void>;
}
