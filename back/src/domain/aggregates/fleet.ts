import AppError from '../../app/classes/appError';
import type Vehicle from '../entities/vehicle';

export type VehicleMap = {
  [key: string]: Vehicle;
};

export default class Fleet {
  private id: number;
  private fleetVehicles: VehicleMap = {};

  constructor(id: number, vehicles: VehicleMap = {}) {
    this.id = id;
    this.fleetVehicles = vehicles || {};
  }

  getId(): number {
    return this.id;
  }

  getFleetVehicles(): VehicleMap {
    return this.fleetVehicles;
  }

  registerVehicleToFleet(vehicle: Vehicle): void {
    // we check if the vehicle is not already in the fleet
    const plateNumber = vehicle.getPlateNumber();
    if (this.fleetVehicles[plateNumber]) {
      throw new AppError('Vehicle already exists in the fleet.');
    }
    this.fleetVehicles[plateNumber] = vehicle;
  }

  includesVehicle(vehicle: Vehicle): boolean {
    // we need to check using the plateNumber
    return !!this.fleetVehicles[vehicle.getPlateNumber()];
  }
}
