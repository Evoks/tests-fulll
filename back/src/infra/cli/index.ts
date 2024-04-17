import dotenv from 'dotenv';
import dbManager from '../db/dbManager';
import { Command } from 'commander';
import createUserFleetAction from './actions/createUserFleetAction';
import localizeVehicleAction from './actions/localizeVehicleAction';
import registerVehicleAction from './actions/registerVehicleAction';

dotenv.config();

/**
 * Handle CLI commands
 */
const handleCLICommand = () => {
  const program = new Command();
  program.command('create <userId>').description('Create a new user').action(createUserFleetAction);

  program
    .command('register-vehicle <fleetId> <vehiclePlateNumber>')
    .description('Register a vehicle into a fleet')
    .action(registerVehicleAction);

  program
    .command('localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]')
    .description('Set location of a vehicle')
    .action(localizeVehicleAction);

  program.parse(process.argv);
};

const main = async () => {
  await dbManager.initDB();
  handleCLICommand();
};

main();
