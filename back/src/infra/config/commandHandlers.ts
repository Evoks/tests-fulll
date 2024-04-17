import { CreateFleetCommandHandler } from '../../app/commands/Fleet/createFleetCommandHandler';
import { CreateVehicleCommandHandler } from '../../app/commands/Vehicle/createVehicleCommandHandler';
import { SetVehicleLocationCommandHandler } from '../../app/commands/Vehicle/setVehicleLocationCommandHandler';
import { RegisterVehicleToFleetCommandHandler } from '../../app/commands/Fleet/registerVehicleToFleetCommandHandler';
import { fleetRepository, vehicleRepository } from './repositories';

// wire up command handlers
const createFleetCommandHandler = new CreateFleetCommandHandler(fleetRepository);
const createVehicleCommandHandler = new CreateVehicleCommandHandler(vehicleRepository);
const setVehicleLocationCommandHandler = new SetVehicleLocationCommandHandler(vehicleRepository);
const registerVehicleToFleetCommandHandler = new RegisterVehicleToFleetCommandHandler(fleetRepository);

export {
  createFleetCommandHandler,
  createVehicleCommandHandler,
  setVehicleLocationCommandHandler,
  registerVehicleToFleetCommandHandler,
};
