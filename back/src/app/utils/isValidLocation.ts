import type { ParkingLocation } from '../../domain/entities/vehicle';

/**
 * Utility function to check if a location is valid
 * @param location
 * @returns
 */
export default function isValidLocation(location: ParkingLocation) {
  return location.lat >= -90 && location.lat <= 90 && location.lng >= -180 && location.lng <= 180 && location.alt >= 0;
}
