import {
  VehicleType,
  VEHICLE_PRICING,
  HOURLY_PACKAGES,
  ADDITIONAL_CHARGES,
  NIGHT_HOURS,
  PEAK_SEASON_DATES,
  NIGHT_CHARGE_WINDOW_START_HOUR,
  NIGHT_CHARGE_WINDOW_END_HOUR,
  NIGHT_SURCHARGE_FLAT_FEE,
} from './pricing-config';
import { GoogleMapsService, Location } from './services/google-maps-service';

export interface BaseFareInput {
  vehicleType: VehicleType;
  distance: number;
  isRoundTrip: boolean;
  numberOfDays: number;
  tollCharges: number;
  parkingCharges: number;
  waitingHours: number;
  isHillStation: boolean;
  pickupTime: Date;
}

export interface HourlyFareInput {
  vehicleType: VehicleType;
  packageType: keyof typeof HOURLY_PACKAGES;
  pickupTime: Date;
  parkingCharges: number;
  extraHours: number;
  extraKilometers: number;
}

export class FareCalculator {
  private static isNightTime(date: Date): boolean {
    const hour = date.getHours();
    return hour >= NIGHT_CHARGE_WINDOW_START_HOUR || hour < NIGHT_CHARGE_WINDOW_END_HOUR;
  }

  private static isPeakSeason(date: Date): boolean {
    const dateStr = date.toISOString().split('T')[0];
    return PEAK_SEASON_DATES.some(
      (range) => dateStr >= range.start && dateStr <= range.end
    );
  }

  private static calculateWaitingCharges(waitingHours: number): number {
    const freeWaitingHours = ADDITIONAL_CHARGES.freeWaitingMinutes / 60;
    const chargeableHours = Math.max(0, waitingHours - freeWaitingHours);
    return chargeableHours * ADDITIONAL_CHARGES.waitingChargePerHour;
  }

  public static async calculateBaseFare(input: BaseFareInput): Promise<number> {
    const {
      vehicleType,
      distance,
      isRoundTrip,
      numberOfDays,
      tollCharges,
      parkingCharges,
      waitingHours,
      isHillStation,
      pickupTime,
    } = input;

    const baseRate = VEHICLE_PRICING[vehicleType].baseRate;
    const perKmRate = VEHICLE_PRICING[vehicleType].perKmRate;
    const waitingRate = VEHICLE_PRICING[vehicleType].waitingRate;

    // Calculate base fare
    let fare = baseRate + distance * perKmRate;

    // Apply round trip multiplier if applicable
    if (isRoundTrip) {
      fare *= 2;
    }

    // Apply hill station surcharge if applicable
    if (isHillStation) {
      fare *= 1.2; // 20% surcharge for hill stations
    }

    // Add waiting charges
    fare += waitingHours * waitingRate;

    // Add toll and parking charges
    fare += tollCharges + parkingCharges;

    // Apply night surcharge (10 PM to 5 AM)
    const hour = pickupTime.getHours();
    if (hour >= 22 || hour < 5) {
      fare *= 1.25; // 25% surcharge for night travel
    }

    // Multiply by number of days for multi-day trips
    fare *= numberOfDays;

    return Math.round(fare);
  }

  public static async calculateHourlyFare(input: HourlyFareInput): Promise<number> {
    const {
      vehicleType,
      packageType,
      pickupTime,
      parkingCharges,
      extraHours,
      extraKilometers,
    } = input;

    const packageDetails = HOURLY_PACKAGES[packageType];
    const baseRate = VEHICLE_PRICING[vehicleType].baseRate;
    const perKmRate = VEHICLE_PRICING[vehicleType].perKmRate;
    const waitingRate = VEHICLE_PRICING[vehicleType].waitingRate;

    // Calculate base fare for the package
    let fare = packageDetails.baseFare;

    // Add extra hours charges
    if (extraHours > 0) {
      fare += extraHours * waitingRate;
    }

    // Add extra kilometers charges
    if (extraKilometers > 0) {
      fare += extraKilometers * perKmRate;
    }

    // Add parking charges
    fare += parkingCharges;

    // Apply night surcharge (10 PM to 5 AM)
    const hour = pickupTime.getHours();
    if (hour >= 22 || hour < 5) {
      fare *= 1.25; // 25% surcharge for night travel
    }

    return Math.round(fare);
  }

  public static async calculateDistance(
    origin: Location,
    destination: Location
  ): Promise<number> {
    try {
      const result = await GoogleMapsService.getInstance().getDistanceMatrix(
        origin,
        destination
      );
      return result.distance;
    } catch (error) {
      console.error("Error calculating distance:", error);
      throw new Error("Failed to calculate distance");
    }
  }
} 