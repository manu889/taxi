import { z } from "zod";

// User Schema
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Vehicle Schema
export const vehicleSchema = z.object({
  id: z.string(),
  type: z.enum(["hatchback", "sedan", "suv", "innova"]),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  capacity: z.string(),
  features: z.array(z.string()),
  isAvailable: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Booking Schema
export const bookingSchema = z.object({
  id: z.string(),
  userId: z.string(),
  vehicleId: z.string(),
  type: z.enum(["local", "airport", "outstation", "round-trip", "package", "one-way"]),
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
  pickupLocation: z.string(),
  dropLocation: z.string(),
  pickupDate: z.date(),
  pickupTime: z.string(),
  returnDate: z.date().optional(),
  returnTime: z.string().optional(),
  distance: z.number().optional(),
  duration: z.number().optional(),
  fare: z.number(),
  additionalCharges: z.object({
    toll: z.number().optional(),
    parking: z.number().optional(),
    waiting: z.number().optional(),
  }).optional(),
  customerDetails: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string().optional(),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Driver Schema
export const driverSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
  licenseNumber: z.string(),
  vehicleId: z.string(),
  isAvailable: z.boolean(),
  currentLocation: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Payment Schema
export const paymentSchema = z.object({
  id: z.string(),
  bookingId: z.string(),
  amount: z.number(),
  status: z.enum(["pending", "completed", "failed", "refunded"]),
  paymentMethod: z.string(),
  transactionId: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Review Schema
export const reviewSchema = z.object({
  id: z.string(),
  bookingId: z.string(),
  userId: z.string(),
  driverId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
}); 