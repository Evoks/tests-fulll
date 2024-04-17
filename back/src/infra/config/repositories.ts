import { FleetRepository } from '../repositories/fleetRepository';
import { VehicleRepository } from '../repositories/vehicleRepository';

// instantiate repositories
const fleetRepository = new FleetRepository();
const vehicleRepository = new VehicleRepository();

export { fleetRepository, vehicleRepository };
