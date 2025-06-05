"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Car, MapPin, Clock, Users, CheckCircle2, Download } from "lucide-react";
import { formatPrice } from "@/lib/price-calculator";

export default function ConfirmationPage() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<any>(null);

  useEffect(() => {
    // Get booking data from localStorage
    const storedData = localStorage.getItem("bookingData");
    if (!storedData) {
      router.push("/"); // Redirect to home if no booking data
      return;
    }
    setBookingData(JSON.parse(storedData));
  }, [router]);

  const handleDownloadReceipt = () => {
    // Implement receipt download functionality
    console.log("Downloading receipt...");
  };

  if (!bookingData) {
    return null; // or loading state
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="p-4 sm:p-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mx-auto mb-4"
              >
                <CheckCircle2 className="h-16 w-16 text-green-500" />
              </motion.div>
              <CardTitle className="text-2xl sm:text-3xl">Booking Confirmed!</CardTitle>
              <p className="text-muted-foreground mt-2">
                Your booking has been successfully confirmed
              </p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-6">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-muted-foreground">Booking ID</p>
                    <p className="font-medium">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="text-green-500 font-medium">Confirmed</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">From</p>
                      <p className="font-medium">{bookingData.pickup}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">To</p>
                      <p className="font-medium">{bookingData.dropoff}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date & Time</p>
                      <p className="font-medium">
                        {new Date(bookingData.date).toLocaleDateString()} at {bookingData.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Passengers</p>
                      <p className="font-medium">{bookingData.passengers}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Selected Vehicle</p>
                      <p className="font-medium">{bookingData.selectedVehicle.name}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Total Amount</p>
                    <p className="text-xl font-bold text-primary">
                      {formatPrice(bookingData.finalPrice)}
                    </p>
                  </div>
                  {bookingData.payment?.percentage !== "100" && (
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-muted-foreground">Remaining Amount</p>
                      <p className="text-lg font-bold text-primary">
                        {formatPrice(bookingData.payment.remainingAmount)}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleDownloadReceipt}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Receipt
                  </Button>
                  <Button
                    className="w-full"
                    onClick={() => router.push("/")}
                  >
                    Back to Home
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 