import type { Database } from 'sqlite';

export async function createEmptyTables(sqliteDB: Database) {
  if (!sqliteDB) throw new Error('Database connection is not available');
  await sqliteDB.run(`CREATE TABLE IF NOT EXISTS fleets (
		id INTEGER PRIMARY KEY AUTOINCREMENT
	)`);
  await sqliteDB.run(`CREATE TABLE IF NOT EXISTS vehicles (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		plateNumber TEXT,
		lat REAL,
		lng REAL,
		alt INTEGER OPTIONAL
	)`);
  await sqliteDB.run(`CREATE TABLE IF NOT EXISTS fleet_vehicles (
    fleetId INTEGER,
    vehicleId INTEGER,
    plateNumber TEXT,
    FOREIGN KEY (fleetId) REFERENCES fleets(id),
    FOREIGN KEY (vehicleId) REFERENCES vehicles(id),
    FOREIGN KEY (plateNumber) REFERENCES vehicles(plateNumber),
    PRIMARY KEY (fleetId, plateNumber)
	)`);
}
