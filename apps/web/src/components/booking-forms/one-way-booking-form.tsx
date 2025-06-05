"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Clock, Users } from "lucide-react";
import { calculatePrice, formatPrice } from "@/lib/price-calculator";

export function OneWayBookingForm() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState({
    pickup: "",
    dropoff: "",
    date: new Date(),
    time: "",
    passengers: 1,
    distance: 0,
  });

  const [estimatedPrice, setEstimatedPrice] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store booking data in localStorage
    localStorage.setItem("bookingData", JSON.stringify({
      ...bookingData,
      type: "one-way",
      basePrice: 2500, // Base price for one-way trips
      pricePerKm: 15,  // Price per kilometer
    }));

    // Navigate to vehicle selection
    router.push("/vehicles");
  };

  // Calculate distance when pickup and dropoff are entered
  const calculateDistance = () => {
    if (bookingData.pickup && bookingData.dropoff) {
      // This is a placeholder. In a real app, you would use a mapping service API
      const mockDistance = Math.floor(Math.random() * 50) + 10; // Random distance between 10-60 km
      setBookingData(prev => ({ ...prev, distance: mockDistance }));
      
      // Calculate estimated price
      const price = calculatePrice({
        packageId: 1, // One-way package ID
        distance: mockDistance,
        passengers: bookingData.passengers,
      });
      setEstimatedPrice(price);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
              onChange={(e) => {
                setBookingData({ ...bookingData, pickup: e.target.value });
                calculateDistance();
              }}
              required
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
              onChange={(e) => {
                setBookingData({ ...bookingData, dropoff: e.target.value });
                calculateDistance();
              }}
              required
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
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="passengers">Number of Passengers</Label>
          <Select
            value={bookingData.passengers.toString()}
            onValueChange={(value) => {
              setBookingData({ ...bookingData, passengers: parseInt(value) });
              calculateDistance();
            }}
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

      {bookingData.distance > 0 && (
        <div className="bg-primary/5 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Estimated Distance</p>
              <p className="font-semibold">{bookingData.distance} km</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estimated Price</p>
              <p className="font-semibold text-primary">{formatPrice(estimatedPrice)}</p>
            </div>
          </div>
        </div>
      )}

      <Button type="submit" className="w-full">
        Continue to Vehicle Selection
      </Button>
    </form>
  );
} 