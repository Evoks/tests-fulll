import db from '../db/dbManager';
import type { IFleetRepository } from '../../domain/repositories/IFleetRepository';
import { Fleet, Vehicle } from '../../domain';
import AppError from '../../app/classes/appError';

export class FleetRepository implements IFleetRepository {
  /**
   * Create a fleet
   * @param fleetId
   * @returns Promise<Fleet | undefined>
   */
  async create(fleetId: number): Promise<Fleet | undefined> {
    const sql = 'INSERT INTO fleets (id) VALUES (?)';
    const queryResult = await db.getConnection().run(sql, [fleetId]);
    if (!queryResult || !queryResult?.lastID) return undefined;
    return new Fleet(queryResult.lastID, []);
  }

  /**
   * Find a fleet by its id
   * @param fleetId
   * @returns Promise<Fleet | undefined>
   */
  async findOneById(fleetId: number): Promise<Fleet | undefined> {
    const sql = 'SELECT * FROM fleets WHERE id = ?';
    const fleet = await db.getConnection().get(sql, [fleetId]);
    if (!fleet) return undefined;

    return new Fleet(fleet.id, await this.findAllFleetVehicles(fleet.id));
  }

  /**
   * Find all vehicles in a fleet
   * @param fleetId
   * @returns Promise<Vehicle[]>
   */
  async findAllFleetVehicles(fleetId: number): Promise<Vehicle[]> {
    const fleetVehiclesSql = 'SELECT * FROM fleet_vehicles WHERE fleetId = ?';
    const vehiclesData = await db.getConnection().all(fleetVehiclesSql, [fleetId]);
    if (!vehiclesData) return [];
    const vehicles = vehiclesData.map((v) => new Vehicle(v.vehicleId, v.plateNumber));
    return vehicles;
  }

  /**
   * Update a fleet
   * @param fleet Fleet
   * @returns Promise<void>
   */
  async update(fleet: Fleet): Promise<void> {
    await db.getConnection().run('BEGIN TRANSACTION');
    try {
      // get the fleet vehicles plateNumbers from db
      const oldFleetVehicules = await this.findAllFleetVehicles(fleet.getId());
      const newFleetVehicles = fleet.getFleetVehicles();

      // we find the vehicles to delete in the db
      const vehiclesToDelete = oldFleetVehicules.filter(
        (v: Vehicle) => !newFleetVehicles.map((v) => v.getPlateNumber()).includes(v.getPlateNumber()),
      );
      const vehiclesToDeletePlateNumbers = vehiclesToDelete.map((v) => v.getPlateNumber());
      const sqlDeleteVehicles = 'DELETE FROM fleet_vehicles WHERE fleetId = ? AND plateNumber IN (?)';
      await db.getConnection().run(sqlDeleteVehicles, [fleet.getId(), vehiclesToDeletePlateNumbers]);

      // we find the vehicles to insert in the db
      const vehiclesToInsert = newFleetVehicles.filter(
        (v: Vehicle) => !oldFleetVehicules.map((v) => v.getPlateNumber()).includes(v.getPlateNumber()),
      );
      const placeholders = vehiclesToInsert.map(() => '(?, ?, ?)').join(', ');
      const sqlInsertVehicles = `INSERT INTO fleet_vehicles (vehicleId, plateNumber, fleetId) VALUES ${placeholders}`;
      const sqlInsertVehiclesValues = [];
      for (const v of vehiclesToInsert) {
        sqlInsertVehiclesValues.push(v.getId(), v.getPlateNumber(), fleet.getId());
      }
      await db.getConnection().run(sqlInsertVehicles, sqlInsertVehiclesValues);

      const res = await db.getConnection().run('COMMIT');
    } catch (error) {
      await db.getConnection().run('ROLLBACK');
      throw new AppError('Error updating fleet');
    }
  }
}
