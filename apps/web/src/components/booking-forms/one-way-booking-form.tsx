"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { formatPrice } from "@/lib/price-calculator";
import { LocationSearch } from "@/components/location-search";
import { Location } from "@/lib/services/google-maps-service";
import { FareCalculator } from "@/lib/fare-calculator";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  pickup: z.string().min(1, "Pickup location is required"),
  dropoff: z.string().min(1, "Drop-off location is required"),
  date: z.date({
    required_error: "Date is required",
  }),
  time: z.string().min(1, "Time is required"),
});

type FormValues = z.infer<typeof formSchema>;

export function OneWayBookingForm() {
  const router = useRouter();
  const [pickupLocation, setPickupLocation] = useState<Location | null>(null);
  const [dropoffLocation, setDropoffLocation] = useState<Location | null>(null);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [isCalculatingFare, setIsCalculatingFare] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickup: "",
      dropoff: "",
      date: new Date(),
      time: "09:00", // Default time
    },
  });

  const { watch, setValue } = form;
  const pickup = watch("pickup");
  const dropoff = watch("dropoff");
  const date = watch("date");
  const time = watch("time");

  useEffect(() => {
    const calculateEstimatedFare = async () => {
      if (pickupLocation && dropoffLocation && date && time) {
        setIsCalculatingFare(true);
        try {
          const distance = await FareCalculator.calculateDistance(
            pickupLocation,
            dropoffLocation
          );
          
          // Assuming a basic fare calculation for one-way for now
          // You'll need to define a more specific fare structure for one-way
          const basicFare = distance * 10; // Example: 10 Rs per km
          setEstimatedPrice(basicFare);

          // Update the form's distance value for submission if needed
          // form.setValue("distance", distance); // This would require 'distance' in formSchema
        } catch (error) {
          console.error("Error calculating estimated fare:", error);
          setEstimatedPrice(0); // Reset on error
        } finally {
          setIsCalculatingFare(false);
        }
      } else {
        setEstimatedPrice(0); // Reset if locations or time are missing
      }
    };
    calculateEstimatedFare();
  }, [pickupLocation, dropoffLocation, date, time]);


  async function onSubmit(values: FormValues) {
    if (!pickupLocation || !dropoffLocation) {
      // This case should ideally be caught by Zod validation if pickup/dropoff are properly linked to LocationSearch
      return;
    }

    try {
      const distance = await FareCalculator.calculateDistance(
        pickupLocation,
        dropoffLocation
      );

      localStorage.setItem("bookingData", JSON.stringify({
        type: "one-way",
        pickupLocation: pickupLocation.address,
        dropoffLocation: dropoffLocation.address,
        date: format(values.date, "yyyy-MM-dd"),
        time: values.time,
        distance,
        pickupLat: pickupLocation.lat,
        pickupLng: pickupLocation.lng,
        dropoffLat: dropoffLocation.lat,
        dropoffLng: dropoffLocation.lng,
        estimatedFare: estimatedPrice,
      }));

      router.push("/vehicles");
    } catch (error) {
      console.error("Error in one-way booking submission:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="pickup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup Location</FormLabel>
                <FormControl>
                  <LocationSearch
                    name={field.name}
                    label="Pickup Location"
                    placeholder="Enter pickup location"
                    onLocationSelect={(location) => {
                      setPickupLocation(location);
                      field.onChange(location.address);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dropoff"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Drop-off Location</FormLabel>
                <FormControl>
                  <LocationSearch
                    name={field.name}
                    label="Drop-off Location"
                    placeholder="Enter drop-off location"
                    onLocationSelect={(location) => {
                      setDropoffLocation(location);
                      field.onChange(location.address);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "PPP") : "Pick a date"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 24 }).map((_, i) => {
                        const hour = i.toString().padStart(2, "0");
                        return (
                          <SelectItem key={hour} value={`${hour}:00`}>
                            {`${hour}:00`}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {(pickupLocation && dropoffLocation && !isCalculatingFare) && (
          <div className="bg-primary/5 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Estimated Price</p>
                <p className="font-semibold text-primary">{formatPrice(estimatedPrice)}</p>
              </div>
            </div>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isCalculatingFare}>
          Continue to Vehicle Selection
        </Button>
      </form>
    </Form>
  );
} 