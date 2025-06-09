import { bookingSchema } from "@/lib/db/schema";
import { FareCalculator } from "@/lib/fare-calculator";
import { VehicleType } from "@/lib/pricing-config";
import { supabase } from "@/lib/supabase";

export class BookingService {
  static async createBooking(bookingData: any) {
    try {
      // Validate booking data
      const validatedData = bookingSchema.parse(bookingData);
      
      // Calculate fare
      const fare = this.calculateFare(validatedData);
      
      // Create booking object
      const booking = {
        ...validatedData,
        fare,
        status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      // Save to Supabase
      const { data, error } = await supabase
        .from('bookings')
        .insert([booking])
        .select()
        .single();
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  }
  
  static async getBooking(id: string) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error fetching booking:', error);
      throw error;
    }
  }
  
  static async updateBooking(id: string, bookingData: any) {
    try {
      // Validate booking data
      const validatedData = bookingSchema.parse(bookingData);
      
      // Update in Supabase
      const { data, error } = await supabase
        .from('bookings')
        .update({
          ...validatedData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
  }
  
  static async deleteBooking(id: string) {
    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error deleting booking:', error);
      throw error;
    }
  }
  
  static async getBookingsByUser(userId: string) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      throw error;
    }
  }
  
  private static calculateFare(bookingData: any) {
    const {
      type,
      vehicleType,
      distance,
      duration,
      isRoundTrip,
      numberOfDays,
      tollCharges,
      parkingCharges,
      waitingHours,
      isHillStation,
      pickupTime,
    } = bookingData;
    
    if (type === "local") {
      return FareCalculator.calculateHourlyFare({
        vehicleType: vehicleType as VehicleType,
        packageType: "4hr",
        pickupTime: new Date(pickupTime),
        parkingCharges: parkingCharges || 0,
        extraHours: waitingHours || 0,
        extraKilometers: 0,
      });
    }
    
    return FareCalculator.calculateBaseFare({
      vehicleType: vehicleType as VehicleType,
      distance: distance || 0,
      isRoundTrip: isRoundTrip || false,
      numberOfDays: numberOfDays || 1,
      tollCharges: tollCharges || 0,
      parkingCharges: parkingCharges || 0,
      waitingHours: waitingHours || 0,
      isHillStation: isHillStation || false,
      pickupTime: new Date(pickupTime),
    });
  }
} 