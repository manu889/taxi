"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Users, Luggage, Car, Shield, 
  CheckCircle2, ChevronRight, Clock,
  Wifi, Snowflake, Coffee, MapPin,
  Calendar, Plane, ArrowLeft
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { formatPrice } from "@/lib/price-calculator";

const vehicles = [
  {
    id: 1,
    name: "Toyota Etios",
    image: "/images/Etios.png",
    capacity: 4,
    features: ["AC", "Music System", "Comfortable Seats"],
    price: "₹15/km",
    basePrice: 2500,
  },
  {
    id: 2,
    name: "Maruti Ertiga",
    image: "/images/Ertiga.png",
    capacity: 6,
    features: ["AC", "Music System", "Spacious Interior"],
    price: "₹18/km",
    basePrice: 3000,
  },
  {
    id: 3,
    name: "Maruti Dzire",
    image: "/images/Dzire.png",
    capacity: 4,
    features: ["AC", "Music System", "Premium Interior"],
    price: "₹16/km",
    basePrice: 2800,
  },
];

const amenities = [
  {
    icon: Shield,
    title: "Safe & Reliable",
    description: "Well-maintained vehicles with professional drivers"
  },
  {
    icon: Clock,
    title: "24/7 Service",
    description: "Round-the-clock service for all your travel needs"
  },
  {
    icon: Wifi,
    title: "Free WiFi",
    description: "Stay connected during your journey"
  },
  {
    icon: Snowflake,
    title: "Climate Control",
    description: "Comfortable temperature throughout the ride"
  },
  {
    icon: Coffee,
    title: "Refreshments",
    description: "Complimentary water bottles available"
  },
  {
    icon: CheckCircle2,
    title: "Professional Drivers",
    description: "Experienced and courteous chauffeurs"
  }
];

export default function VehicleSelectionPage() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<any>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);

  useEffect(() => {
    // Get booking data from localStorage
    const storedData = localStorage.getItem("bookingData");
    if (!storedData) {
      router.push("/"); // Redirect to home if no booking data
      return;
    }
    setBookingData(JSON.parse(storedData));
  }, [router]);

  const handleVehicleSelect = (vehicleId: number) => {
    setSelectedVehicle(vehicleId);
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (vehicle) {
      // Update booking data with selected vehicle
      const updatedData = {
        ...bookingData,
        selectedVehicle: vehicle,
        finalPrice: vehicle.basePrice + (bookingData.distance * parseInt(vehicle.price.replace("₹", "").replace("/km", "")))
      };
      localStorage.setItem("bookingData", JSON.stringify(updatedData));
    }
  };

  const handleContinue = () => {
    if (selectedVehicle) {
      router.push("/booking/personal-details");
    }
  };

  if (!bookingData) {
    return null; // or loading state
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Mobile Booking Summary - Only visible on small screens */}
        <div className="md:hidden mb-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">From</p>
                    <p className="font-medium text-sm">{bookingData.pickup}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">To</p>
                    <p className="font-medium text-sm">{bookingData.dropoff}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date & Time</p>
                    <p className="font-medium text-sm">
                      {new Date(bookingData.date).toLocaleDateString()} at {bookingData.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Passengers</p>
                    <p className="font-medium text-sm">{bookingData.passengers}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Distance</p>
                    <p className="font-medium text-sm">{bookingData.distance} km</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
          {/* Desktop Booking Summary - Hidden on mobile */}
          <div className="hidden md:block md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent>
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
                      <p className="text-sm text-muted-foreground">Distance</p>
                      <p className="font-medium">{bookingData.distance} km</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.back()}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Booking
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vehicle Selection */}
          <div className="md:col-span-2">
            <div className="grid gap-4 sm:gap-6">
              {vehicles.map((vehicle) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card
                    className={`cursor-pointer transition-all ${
                      selectedVehicle === vehicle.id
                        ? "border-primary ring-2 ring-primary"
                        : "hover:border-primary/50"
                    }`}
                    onClick={() => handleVehicleSelect(vehicle.id)}
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
                        />
                        <div className="flex-grow w-full">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                            <div>
                              <h3 className="text-lg sm:text-xl font-semibold">{vehicle.name}</h3>
                              <p className="text-sm sm:text-base text-muted-foreground">{vehicle.price}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Base Price</p>
                              <p className="font-semibold text-primary">
                                {formatPrice(vehicle.basePrice)}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{vehicle.capacity} Seats</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {vehicle.features.map((feature) => (
                                <span
                                  key={feature}
                                  className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {selectedVehicle && (
              <div className="mt-6">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleContinue}
                >
                  Continue to Personal Details
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 