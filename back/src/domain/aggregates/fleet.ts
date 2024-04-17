import AppError from '../../app/classes/appError';
import type Vehicle from '../entities/vehicle';

export default class Fleet {
  private id: number;
  private fleetVehicles: Array<Vehicle>;

  constructor(id: number, vehicles: Array<Vehicle> = []) {
    this.id = id;
    this.fleetVehicles = vehicles || [];
  }

  getId(): number {
    return this.id;
  }

  getFleetVehicles(): Array<Vehicle> {
    return this.fleetVehicles;
  }

  registerVehicleToFleet(vehicle: Vehicle): void {
    // we check if the vehicle is not already in the fleet
    if (this.fleetVehicles.find((v) => v.getPlateNumber() === vehicle.getPlateNumber())) {
      throw new AppError('Vehicle already exists in the fleet.');
    }
    this.fleetVehicles.push(vehicle);
  }

  includesVehicle(vehicle: Vehicle): boolean {
    // we need to check using the plateNumber
    return this.fleetVehicles.find((v) => v.getPlateNumber() === vehicle.getPlateNumber()) !== undefined;
  }
}
