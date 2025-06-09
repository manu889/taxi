"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarIcon, MapPin } from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LocationSearch } from "@/components/location-search";
import { Location } from "@/lib/services/google-maps-service";

const airports = [
  { value: "mysore", label: "Mysore Airport" },
  { value: "bangalore", label: "Bangalore International Airport" },
  { value: "cochin", label: "Cochin International Airport" },
];

const formSchema = z.object({
  bookingType: z.enum(["pickup", "drop"], {
    required_error: "Please select booking type.",
  }),
  from: z.string().min(1, "Pickup location is required"),
  to: z.string().min(1, "Destination is required"),
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string().min(1, "Time is required"),
  flightNumber: z.string().optional(), // Flight number is optional for drop off
}).superRefine((data, ctx) => {
  if (data.bookingType === 'pickup' && !airports.some(airport => airport.value === data.from)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please select a valid pickup airport.",
      path: ['from'],
    });
  }
  if (data.bookingType === 'drop' && !airports.some(airport => airport.value === data.to)) {
     ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please select a valid drop-off airport.",
      path: ['to'],
    });
  }
});

type FormValues = z.infer<typeof formSchema>;

export function AirportBookingForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pickupLocation, setPickupLocation] = useState<Location | null>(null);
  const [dropLocation, setDropLocation] = useState<Location | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookingType: "pickup",
      from: "",
      to: "",
      flightNumber: "",
    },
  });

  const bookingType = form.watch("bookingType");

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      const searchParams = new URLSearchParams({
        type: "airport",
        bookingType: values.bookingType,
        from: values.from,
        to: values.to,
        date: format(values.date, "yyyy-MM-dd"),
        time: values.time,
        ...(values.flightNumber && { flightNumber: values.flightNumber }),
        ...(pickupLocation && {
          pickupLat: pickupLocation.lat.toString(),
          pickupLng: pickupLocation.lng.toString(),
        }),
        ...(dropLocation && {
          dropLat: dropLocation.lat.toString(),
          dropLng: dropLocation.lng.toString(),
        }),
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-2xl mx-auto">
        <FormField
          control={form.control}
          name="bookingType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Booking Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white text-black">
                    <SelectValue placeholder="Select booking type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="pickup">Pickup from Airport</SelectItem>
                  <SelectItem value="drop">Drop to Airport</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookingType === 'pickup' ? (
            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Airport</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white text-black">
                        <SelectValue placeholder="Select pickup airport" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {airports.map((airport) => (
                        <SelectItem key={airport.value} value={airport.value}>
                          {airport.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Location</FormLabel>
                  <FormControl>
                    <LocationSearch
                      name="from"
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
          )}

          {bookingType === 'drop' ? (
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Drop-off Airport</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white text-black">
                        <SelectValue placeholder="Select drop-off airport" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {airports.map((airport) => (
                        <SelectItem key={airport.value} value={airport.value}>
                          {airport.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Drop-off Location</FormLabel>
                  <FormControl>
                    <LocationSearch
                      name="to"
                      label="Drop-off Location"
                      placeholder="Enter drop-off location"
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
          )}

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
                        className={`w-full pl-3 text-left font-normal bg-white text-black ${!field.value && "text-muted-foreground"}`}
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
                  <PopoverContent className="w-auto p-0 bg-white" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
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
            name="time"
              render={({ field }) => (
                <FormItem>
                <FormLabel>Time</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white text-black">
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

        {bookingType === 'pickup' && (
            <FormField
              control={form.control}
            name="flightNumber"
              render={({ field }) => (
                <FormItem>
                <FormLabel>Flight Number (Optional)</FormLabel>
                  <FormControl>
                  <Input placeholder="Enter flight number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        )}

              <Button 
                type="submit" 
          className="w-full"
          disabled={isSubmitting}
              >
          {isSubmitting ? "Processing..." : "Continue to Vehicle Selection"}
              </Button>
      </form>
    </Form>
  );
} 