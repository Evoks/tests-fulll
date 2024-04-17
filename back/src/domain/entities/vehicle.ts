import AppError from '../../app/classes/appError';
import isSameLocation from '../../app/utils/isSameLocation';
import isValidLocation from '../../app/utils/isValidLocation';

export type ParkingLocation = {
  lat: number;
  lng: number;
  alt: number;
};

export default class Vehicle {
  private id: number;
  private plateNumber: string;
  private parkingLocation: ParkingLocation | null;

  constructor(id: number, plateNumber: string, parkingLocation: ParkingLocation | null = null) {
    this.id = id;
    this.plateNumber = plateNumber;
    this.parkingLocation = parkingLocation || null;
  }

  getId(): number {
    return this.id;
  }

  getPlateNumber(): string {
    return this.plateNumber;
  }

  setParkingLocation(location: ParkingLocation | null): void {
    if (location && !isValidLocation(location)) {
      throw new AppError('Invalid location.');
    }
    if (this.parkingLocation && location && isSameLocation(this.parkingLocation, location)) {
      throw new AppError('The vehicle is already parked at this location.');
    }
    this.parkingLocation = location;
  }

  getParkingLocation(): ParkingLocation | null {
    return this.parkingLocation;
  }
}
