import AppError from '../../../app/classes/appError';
import validateIntParam from '../../../app/utils/validateIntParam';
import { findOneFleetQueryHandler, createFleetCommandHandler } from '../../config';

/**
 * CLI action handler to create a fleet for a user
 * @param paramUserID
 */
export default async function createUserFleetAction(paramUserID: string): Promise<void> {
  const userId = validateIntParam(paramUserID, 'UserID');

  try {
    const fleet = await findOneFleetQueryHandler.handle({ fleetId: userId });
    if (fleet) throw new AppError(`User's fleet ${userId} already exists`);

    const createdFleet = await createFleetCommandHandler.handle({ userId });
    if (!createdFleet) throw new AppError('Error creating fleet');

    // displays fleetId on the standard output
    console.log(createdFleet.getId());
  } catch (error) {
    if (error instanceof AppError) {
      console.error(error.message);
    } else {
      console.error('ERROR - createUserAction');
    }
  }
}
