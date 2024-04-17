import AppError from '../classes/appError';

/**
 * Utility function that validates a float parameter and returns it as a number
 * @param floatValue
 * @param name
 * @returns
 */
export default function validateFloatParam(floatValue: string, name: string): number {
  const number = Number.parseFloat(floatValue);
  if (Number.isNaN(number)) {
    throw new AppError(`Invalid parameter: ${name} must be a valid number`);
  }
  return number;
}
