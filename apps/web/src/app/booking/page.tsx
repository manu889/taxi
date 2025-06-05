"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Clock, Users, Car } from "lucide-react";
import { calculatePrice, formatPrice } from "@/lib/price-calculator";

interface BookingStep {
  id: number;
  title: string;
  description: string;
}

const bookingSteps: BookingStep[] = [
  { id: 1, title: "Trip Details", description: "Enter your journey information" },
  { id: 2, title: "Select Vehicle", description: "Choose your preferred vehicle" },
  { id: 3, title: "Personal Details", description: "Enter your contact information" },
  { id: 4, title: "Confirmation", description: "Review and confirm your booking" },
];

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

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const packageId = searchParams.get("packageId");

  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    pickup: "",
    dropoff: "",
    date: new Date(),
    time: "",
    passengers: 1,
    selectedVehicle: null,
    name: "",
    email: "",
    phone: "",
    distance: 0,
  });

  const [estimatedPrice, setEstimatedPrice] = useState(0);

  useEffect(() => {
    // Calculate distance when pickup and dropoff are entered
    if (bookingData.pickup && bookingData.dropoff) {
      // This is a placeholder. In a real app, you would use a mapping service API
      const mockDistance = Math.floor(Math.random() * 50) + 10; // Random distance between 10-60 km
      setBookingData(prev => ({ ...prev, distance: mockDistance }));
    }
  }, [bookingData.pickup, bookingData.dropoff]);

  useEffect(() => {
    // Calculate price whenever relevant data changes
    if (bookingData.distance > 0 && bookingData.selectedVehicle) {
      const price = calculatePrice({
        packageId: Number(packageId),
        distance: bookingData.distance,
        passengers: bookingData.passengers,
      });
      setEstimatedPrice(price);
    }
  }, [bookingData.distance, bookingData.passengers, bookingData.selectedVehicle, packageId]);

  const handleNext = () => {
    if (currentStep < bookingSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Here you would typically send the booking data to your backend
    console.log("Booking submitted:", bookingData);
    // Navigate to success page
    router.push("/booking/success");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="pickup">Pickup Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="pickup"
                    placeholder="Enter pickup location"
                    className="pl-9"
                    value={bookingData.pickup}
                    onChange={(e) => setBookingData({ ...bookingData, pickup: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dropoff">Drop-off Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="dropoff"
                    placeholder="Enter drop-off location"
                    className="pl-9"
                    value={bookingData.dropoff}
                    onChange={(e) => setBookingData({ ...bookingData, dropoff: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {bookingData.date ? format(bookingData.date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={bookingData.date}
                        onSelect={(date) => setBookingData({ ...bookingData, date: date || new Date() })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={bookingData.time}
                    onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="passengers">Number of Passengers</Label>
                <Select
                  value={bookingData.passengers.toString()}
                  onValueChange={(value) => setBookingData({ ...bookingData, passengers: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select passengers" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "Passenger" : "Passengers"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid gap-6">
              {vehicles.map((vehicle) => (
                <Card
                  key={vehicle.id}
                  className={`cursor-pointer transition-all ${
                    bookingData.selectedVehicle === vehicle.id
                      ? "border-primary ring-2 ring-primary"
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => setBookingData({ ...bookingData, selectedVehicle: vehicle.id })}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{vehicle.name}</CardTitle>
                      <div className="text-lg font-bold text-primary">{vehicle.price}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-24 h-24 object-contain"
                      />
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{vehicle.capacity} Seats</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {vehicle.features.map((feature) => (
                            <span
                              key={feature}
                              className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={bookingData.name}
                  onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={bookingData.email}
                  onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">From</span>
                    <span className="font-medium">{bookingData.pickup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">To</span>
                    <span className="font-medium">{bookingData.dropoff}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date & Time</span>
                    <span className="font-medium">
                      {format(bookingData.date, "PPP")} at {bookingData.time}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Passengers</span>
                    <span className="font-medium">{bookingData.passengers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vehicle</span>
                    <span className="font-medium">
                      {vehicles.find((v) => v.id === bookingData.selectedVehicle)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Distance</span>
                    <span className="font-medium">{bookingData.distance} km</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount</span>
                      <span className="text-primary">{formatPrice(estimatedPrice)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between">
              {bookingSteps.map((step) => (
                <div
                  key={step.id}
                  className={`flex flex-col items-center ${
                    step.id < currentStep ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                      step.id <= currentStep
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.id}
                  </div>
                  <span className="text-sm font-medium">{step.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{bookingSteps[currentStep - 1].title}</CardTitle>
            </CardHeader>
            <CardContent>{renderStepContent()}</CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            {currentStep === bookingSteps.length ? (
              <Button onClick={handleSubmit}>Confirm Booking</Button>
            ) : (
              <Button onClick={handleNext}>Next</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 