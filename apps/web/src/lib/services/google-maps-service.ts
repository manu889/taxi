import { Loader } from "@googlemaps/js-api-loader";

export interface Location {
  placeId: string;
  address: string;
  lat: number;
  lng: number;
}

export interface DistanceMatrixResult {
  distance: number; // in kilometers
  duration: number; // in minutes
}

export class GoogleMapsService {
  private static instance: GoogleMapsService;
  private loader: Loader;
  private maps: google.maps.Maps | null = null;
  private placesService: google.maps.places.PlacesService | null = null;
  private geocoder: google.maps.Geocoder | null = null;

  private constructor() {
    this.loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
      version: "weekly",
      libraries: ["places", "geocoding"],
    });
  }

  public static getInstance(): GoogleMapsService {
    if (!GoogleMapsService.instance) {
      GoogleMapsService.instance = new GoogleMapsService();
    }
    return GoogleMapsService.instance;
  }

  public async initialize(): Promise<void> {
    if (!this.maps) {
      const google = await this.loader.load();
      this.maps = google.maps;
      this.placesService = new google.maps.places.PlacesService(
        document.createElement("div")
      );
      this.geocoder = new google.maps.Geocoder();
    }
  }

  public async searchLocations(query: string): Promise<Location[]> {
    await this.initialize();

    return new Promise((resolve, reject) => {
      if (!this.placesService) {
        reject(new Error("Places service not initialized"));
        return;
      }

      const request = {
        query,
        fields: ["place_id", "formatted_address", "geometry"],
      };

      this.placesService.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const locations = results.map((place) => ({
            placeId: place.place_id || "",
            address: place.formatted_address || "",
            lat: place.geometry?.location?.lat() || 0,
            lng: place.geometry?.location?.lng() || 0,
          }));
          resolve(locations);
        } else {
          reject(new Error("Failed to search locations"));
        }
      });
    });
  }

  public async getDistanceMatrix(
    origin: Location,
    destination: Location
  ): Promise<DistanceMatrixResult> {
    await this.initialize();

    return new Promise((resolve, reject) => {
      if (!this.maps) {
        reject(new Error("Maps not initialized"));
        return;
      }

      const service = new google.maps.DistanceMatrixService();
      const request = {
        origins: [{ lat: origin.lat, lng: origin.lng }],
        destinations: [{ lat: destination.lat, lng: destination.lng }],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
      };

      service.getDistanceMatrix(request, (response, status) => {
        if (status === "OK" && response) {
          const result = response.rows[0].elements[0];
          resolve({
            distance: result.distance.value / 1000, // Convert meters to kilometers
            duration: result.duration.value / 60, // Convert seconds to minutes
          });
        } else {
          reject(new Error("Failed to calculate distance"));
        }
      });
    });
  }

  public async getLocationFromPlaceId(placeId: string): Promise<Location> {
    await this.initialize();

    return new Promise((resolve, reject) => {
      if (!this.placesService) {
        reject(new Error("Places service not initialized"));
        return;
      }

      const request = {
        placeId,
        fields: ["place_id", "formatted_address", "geometry"],
      };

      this.placesService.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          resolve({
            placeId: place.place_id || "",
            address: place.formatted_address || "",
            lat: place.geometry?.location?.lat() || 0,
            lng: place.geometry?.location?.lng() || 0,
          });
        } else {
          reject(new Error("Failed to get location details"));
        }
      });
    });
  }
} 