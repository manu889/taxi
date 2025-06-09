"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Car, Calendar, Clock, MapPin, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { VEHICLE_PRICING, HOURLY_PACKAGES, VehicleType } from "@/lib/pricing-config";
import { FareCalculator } from "@/lib/fare-calculator";
import { BookingService } from "@/lib/services/booking-service";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(10, "Address must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function BookingDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    const details = {
      city: searchParams.get("city"),
      date: searchParams.get("date"),
      time: searchParams.get("time"),
      hours: searchParams.get("hours"),
      vehicleType: searchParams.get("vehicleType"),
      pickupLocation: searchParams.get("pickupLocation"),
      dropLocation: searchParams.get("dropLocation"),
      fare: searchParams.get("fare"),
    };
    setBookingDetails(details);
  }, [searchParams]);

  const handleBack = () => {
    router.back();
  };

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      // Prepare booking data
      const bookingData = {
        ...bookingDetails,
        customerDetails: {
          name: values.fullName,
          email: values.email,
          phone: values.phone,
          address: values.address,
        },
        status: "pending",
      };

      // Create booking
      const booking = await BookingService.createBooking(bookingData);

      // Show success message
      toast({
        title: "Booking Successful",
        description: "Your booking has been confirmed. We'll send you a confirmation email shortly.",
      });

      // Redirect to booking confirmation page
      router.push(`/booking/confirmation/${booking.id}`);
    } catch (error) {
      console.error("Error creating booking:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create booking. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (!bookingDetails) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <p className="text-xl text-muted-foreground">Loading booking details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <Button
          variant="ghost"
          className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground"
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Vehicle Selection
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-6">Booking Summary</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-muted-foreground mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">City</p>
                    <p className="font-medium">{bookingDetails.city}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-muted-foreground mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">
                      {format(new Date(bookingDetails.date), "PPP")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-muted-foreground mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium">{bookingDetails.time}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Car className="h-5 w-5 text-muted-foreground mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Vehicle Type</p>
                    <p className="font-medium capitalize">{bookingDetails.vehicleType}</p>
                  </div>
                </div>

                {bookingDetails.pickupLocation && (
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-muted-foreground mr-3 mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Pickup Location</p>
                      <p className="font-medium">{bookingDetails.pickupLocation}</p>
                    </div>
                  </div>
                )}

                {bookingDetails.dropLocation && (
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-muted-foreground mr-3 mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Drop Location</p>
                      <p className="font-medium">{bookingDetails.dropLocation}</p>
                    </div>
                  </div>
                )}

                <div className="bg-primary/5 rounded-lg p-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Fare:</span>
                    <span className="text-2xl font-bold">₹{bookingDetails.fare}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-3xl font-bold mb-6">Complete Your Booking</h1>
              <p className="text-muted-foreground mb-8">
                Please provide your details to complete the booking. We'll use these details to send you the booking confirmation.
              </p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" type="tel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Processing..." : "Complete Booking"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 