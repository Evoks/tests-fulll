import type { ParkingLocation } from '../../domain/entities/vehicle';

/**
 * Utility function to compare two locations
 * @param locationA
 * @param locationB
 * @returns
 */
export default function isSameLocation(locationA: ParkingLocation, locationB: ParkingLocation) {
  return locationA.lat === locationB.lat && locationA.lng === locationB.lng && locationA.alt === locationB.alt;
}
