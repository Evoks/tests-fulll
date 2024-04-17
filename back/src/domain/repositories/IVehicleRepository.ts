import type { Vehicle } from '..';
import type { ParkingLocation } from '../entities/vehicle';

export interface IVehicleRepository {
  create(plateNumber: string): Promise<Vehicle | undefined>;
  findOneById(vehicleId: number): Promise<Vehicle | undefined>;
  findOneByFleetAndPlateNumber(fleetId: number, plateNumber: string): Promise<Vehicle | undefined>;
  findOneByPlateNumber(plateNumber: string): Promise<Vehicle | undefined>;
  setLocation(plateNumber: string, parkingLocation: ParkingLocation): Promise<void>;
  update(vehicle: Vehicle): Promise<void>;
}
