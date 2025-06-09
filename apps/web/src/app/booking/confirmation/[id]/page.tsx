"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { Calendar, Clock, MapPin, Car, Users, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingService } from "@/lib/services/booking-service";

export default function BookingConfirmationPage() {
  const params = useParams();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooking() {
      try {
        const bookingData = await BookingService.getBooking(params.id as string);
        setBooking(bookingData);
      } catch (error) {
        console.error("Error fetching booking:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooking();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <p className="text-xl text-muted-foreground">Loading booking details...</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <p className="text-xl text-muted-foreground">Booking not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-center mb-6">
            <CheckCircle2 className="h-12 w-12 text-green-500 mr-3" />
            <h1 className="text-2xl font-bold">Booking Confirmed!</h1>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Booking ID</p>
                <p className="font-medium">{booking.id}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium capitalize">{booking.status}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-muted-foreground mr-3 mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Pickup Location</p>
                  <p className="font-medium">{booking.pickupLocation}</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-muted-foreground mr-3 mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Drop Location</p>
                  <p className="font-medium">{booking.dropLocation}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-muted-foreground mr-3 mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">
                    {format(new Date(booking.pickupDate), "PPP")}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-5 w-5 text-muted-foreground mr-3 mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium">{booking.pickupTime}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Car className="h-5 w-5 text-muted-foreground mr-3 mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Vehicle Type</p>
                  <p className="font-medium capitalize">{booking.vehicleType}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Users className="h-5 w-5 text-muted-foreground mr-3 mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Customer Details</p>
                  <p className="font-medium">{booking.customerDetails.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {booking.customerDetails.email}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {booking.customerDetails.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total Fare:</span>
                <span className="text-2xl font-bold">₹{booking.fare}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button variant="outline" onClick={() => window.print()}>
            Download Receipt
          </Button>
          <Button onClick={() => window.location.href = "/"}>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
} 