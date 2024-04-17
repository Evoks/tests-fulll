import db from '../db/dbManager';
import type { IVehicleRepository } from '../../domain/repositories/IVehicleRepository';
import type { ParkingLocation } from '../../domain/entities/vehicle';
import { Vehicle } from '../../domain';

export class VehicleRepository implements IVehicleRepository {
  /**
   * Create a new vehicle with the given plate number
   * @param plateNumber The plate number of the vehicle
   * @returns Promise<Vehicle | undefined>
   */
  async create(plateNumber: string): Promise<Vehicle | undefined> {
    const queryResult = await db.getConnection()?.run('INSERT INTO vehicles (plateNumber) VALUES (?)', [plateNumber]);
    if (!queryResult || !queryResult?.lastID) return undefined;
    return new Vehicle(queryResult.lastID, plateNumber);
  }

  /**
   * Find a vehicle by its id
   * @param vehicleId The id of the vehicle
   * @returns Promise<Vehicle | undefined>
   */
  async findOneById(vehicleId: number): Promise<Vehicle | undefined> {
    const vehicleData = await db.getConnection()?.get('SELECT * FROM vehicles WHERE id = ?', [vehicleId]);
    if (!vehicleData) return undefined;
    const locationData = {
      lat: vehicleData.lat,
      lng: vehicleData.lng,
      alt: vehicleData.alt,
    };
    return new Vehicle(vehicleData.id, vehicleData.plateNumber, locationData);
  }

  /**
   * Find a vehicle by its plate number
   * @param plateNumber The plate number of the vehicle
   * @returns Promise<Vehicle | undefined>
   */
  async findOneByPlateNumber(plateNumber: string): Promise<Vehicle | undefined> {
    const vehicleData = await db.getConnection()?.get('SELECT * FROM vehicles WHERE plateNumber = ?', [plateNumber]);
    if (!vehicleData) return undefined;
    const locationData = {
      lat: vehicleData.lat,
      lng: vehicleData.lng,
      alt: vehicleData.alt,
    };
    return new Vehicle(vehicleData.id, vehicleData.plateNumber, locationData);
  }

  /**
   * Find a vehicle by its fleet id and plate number
   * @param fleetId
   * @param plateNumber
   * @returns Promise<Vehicle | undefined>
   */
  async findOneByFleetAndPlateNumber(fleetId: number, plateNumber: string): Promise<Vehicle | undefined> {
    const fleetVehicle = await db
      .getConnection()
      ?.get('SELECT * FROM fleet_vehicles WHERE fleetId = ? AND plateNumber = ?', [fleetId, plateNumber]);
    if (!fleetVehicle) return undefined;
    return this.findOneByPlateNumber(plateNumber);
  }

  /**
   * Set the location of a vehicle
   * @param plateNumber The plate number of the vehicle
   * @param parkingLocation The location of the vehicle
   * @returns Promise<void>
   */
  async setLocation(plateNumber: string, parkingLocation: ParkingLocation): Promise<void> {
    await db
      .getConnection()
      .run('UPDATE vehicles SET lat, lng, alt WHERE plateNumber = ?', [
        parkingLocation.lat,
        parkingLocation.lng,
        parkingLocation.alt,
        plateNumber,
      ]);
  }

  /**
   * Update a vehicle
   * @param vehicle Vehicle
   * @returns Promise<void>
   */
  async update(vehicle: Vehicle): Promise<void> {
    await db
      .getConnection()
      .run('INSERT OR REPLACE INTO vehicles (id, plateNumber, lat, lng, alt) VALUES (?, ?, ?, ?, ?)', [
        vehicle.getId(),
        vehicle.getPlateNumber(),
        vehicle.getParkingLocation()?.lat,
        vehicle.getParkingLocation()?.lng,
        vehicle.getParkingLocation()?.alt,
      ]);
  }
}
