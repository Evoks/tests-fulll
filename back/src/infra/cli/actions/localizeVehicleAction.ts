import AppError from '../../../app/classes/appError';
import validateFloatParam from '../../../app/utils/validateFloatParam';
import validateIntParam from '../../../app/utils/validateIntParam';
import { findOneFleetQueryHandler, setVehicleLocationCommandHandler } from '../../config';

/**
 * CLI action handler to localize a vehicle in a fleet
 * @param paramFleetId
 * @param vehiclePlateNumber
 * @param lat
 * @param lng
 * @param alt
 */
export default async function localizeVehicleAction(
  paramFleetId: string,
  vehiclePlateNumber: string,
  lat: string,
  lng: string,
  alt?: string,
): Promise<void> {
  try {
    const fleetId = validateIntParam(paramFleetId, 'FleetId');
    const latitude = validateFloatParam(lat, 'Latitude');
    const longitude = validateFloatParam(lng, 'Longitude');
    const altitude = alt ? validateFloatParam(alt, 'Altitude') : 0;

    const fleet = await findOneFleetQueryHandler.handle({ fleetId });
    if (!fleet) throw new AppError(`Fleet ${fleetId} does not exist`);

    await setVehicleLocationCommandHandler.handle({
      fleetId: fleetId,
      plateNumber: vehiclePlateNumber,
      lat: latitude,
      lng: longitude,
      alt: altitude,
    });

    console.log(
      `Vehicle [${vehiclePlateNumber}] parked at location [lat: ${lat}, lng: ${lng}, ${altitude}m] successfully`,
    );
  } catch (error) {
    if (error instanceof AppError) {
      console.error(error.message);
    } else {
      console.error('ERROR - localizeVehicleAction');
    }
  }
}
