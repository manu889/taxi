"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CalendarIcon, Loader2, MapPin, Car, Users, Clock, ChevronRight } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FareCalculator } from "@/lib/fare-calculator";
import { VehicleType } from "@/lib/pricing-config";
import { LocationSearch } from "@/components/location-search";
import { Location } from "@/lib/services/google-maps-service";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  pickupLocation: z.string().min(1, "Pickup location is required"),
  dropLocation: z.string().min(1, "Drop location is required"),
  pickupDate: z.date({
    required_error: "Pickup date is required",
  }),
  vehicleType: z.string({
    required_error: "Please select a vehicle type",
  }),
  tripType: z.string({
    required_error: "Please select a trip type",
  }),
  distance: z.string().min(1, "Distance is required"),
  days: z.string().optional(),
  tollCharges: z.string().optional(),
  parkingCharges: z.string().optional(),
  waitingHours: z.string().optional(),
  isHillStation: z.boolean().default(false),
});

export function OutstationBookingForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pickupLocation, setPickupLocation] = useState<Location | null>(null);
  const [dropLocation, setDropLocation] = useState<Location | null>(null);
  const [distance, setDistance] = useState<number>(0);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupLocation: "",
      dropLocation: "",
      tripType: "one-way",
      distance: "",
      days: "",
      tollCharges: "",
      parkingCharges: "",
      waitingHours: "",
      isHillStation: false,
    },
  });

  const tripType = form.watch("tripType");

  const calculateDistance = async () => {
    if (pickupLocation && dropLocation) {
      try {
        const calculatedDistance = await FareCalculator.calculateDistance(
          pickupLocation,
          dropLocation
        );
        setDistance(calculatedDistance);
        form.setValue("distance", calculatedDistance.toString());
      } catch (error) {
        console.error("Error calculating distance:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to calculate distance. Please try again.",
        });
      }
    }
  };

  useEffect(() => {
    calculateDistance();
  }, [pickupLocation, dropLocation]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const searchParams = new URLSearchParams({
        type: "outstation",
        pickupLocation: values.pickupLocation,
        dropLocation: values.dropLocation,
        date: format(values.pickupDate, "yyyy-MM-dd"),
        vehicleType: values.vehicleType,
        tripType: values.tripType,
        distance: values.distance,
        days: values.days || "1",
        tollCharges: values.tollCharges || "0",
        parkingCharges: values.parkingCharges || "0",
        waitingHours: values.waitingHours || "0",
        isHillStation: values.isHillStation.toString(),
        pickupLat: pickupLocation?.lat.toString() || "",
        pickupLng: pickupLocation?.lng.toString() || "",
        dropLat: dropLocation?.lat.toString() || "",
        dropLng: dropLocation?.lng.toString() || "",
      });

      router.push(`/vehicles?${searchParams.toString()}`);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="pickupLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup Location</FormLabel>
                <FormControl>
                  <LocationSearch
                    name="pickupLocation"
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
            name="dropLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Drop Location</FormLabel>
                <FormControl>
                  <LocationSearch
                    name="dropLocation"
                    label="Drop Location"
                    placeholder="Enter drop location"
                    onLocationSelect={(location) => {
                      setDropLocation(location);
                      field.onChange(location.address);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="pickupDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Pickup Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
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
            name="vehicleType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a vehicle" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="hatchback">Hatchback</SelectItem>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="innova">Innova</SelectItem>
                    <SelectItem value="tempo">Tempo Traveller</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="tripType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trip Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select trip type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="one-way">One Way</SelectItem>
                    <SelectItem value="round">Round Trip</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="distance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Distance (in km)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter distance"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {form.watch("tripType") === "round" && (
          <FormField
            control={form.control}
            name="days"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Days</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter number of days"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="tollCharges"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Toll Charges (₹)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter toll charges"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="parkingCharges"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parking Charges (₹)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter parking charges"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="waitingHours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Waiting Hours</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter waiting hours"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isHillStation"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Hill Station Route</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="rounded-lg bg-muted p-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Estimated Fare:</span>
            <span className="text-2xl font-bold">₹{distance}</span>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Book Now
              <ChevronRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
} 