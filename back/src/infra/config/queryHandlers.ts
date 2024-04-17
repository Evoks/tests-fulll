import { FindOneFleetQueryHandler } from '../../app/queries/Fleet/findOneFleetQueryHandler';
import { FindOneVehicleByPlateNumberQueryHandler } from '../../app/queries/Vehicle/findOneVehicleByPlateNumberQueryHandler';
import { FindOneVehicleByFleetAndPlateNumberQueryHandler } from '../../app/queries/Vehicle/findOneVehicleByFleetAndPlateNumberQueryHandler';
import { vehicleRepository, fleetRepository } from './repositories';

// wire up query handlers
const findOneFleetQueryHandler = new FindOneFleetQueryHandler(fleetRepository);
const findOneVehicleByPlateNumberQueryHandler = new FindOneVehicleByPlateNumberQueryHandler(vehicleRepository);
const findOneVehicleByFleetAndPlateNumberQueryHandler = new FindOneVehicleByFleetAndPlateNumberQueryHandler(
  vehicleRepository,
);

export {
  findOneFleetQueryHandler,
  findOneVehicleByPlateNumberQueryHandler,
  findOneVehicleByFleetAndPlateNumberQueryHandler,
};
