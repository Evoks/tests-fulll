import AppError from '../classes/appError';

/**
 * Utility function that validates a integer parameter and returns it as a number
 * @param intValue
 * @param name
 * @returns
 */
export default function validateIntParam(intValue: string, name: string) {
  const number = Number.parseInt(intValue);
  if (Number.isNaN(number)) {
    throw new AppError(`Invalid parameter: ${name} must be a valid number`);
  }
  return number;
}
