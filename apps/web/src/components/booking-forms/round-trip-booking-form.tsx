"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarIcon, Loader2, MapPin, Car, Users, Luggage, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DateRange } from "react-day-picker";

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

const vehicles = [
  {
    id: "sedan",
    name: "Sedan",
    description: "Comfortable 4-seater car",
    price: "₹2,500",
    features: ["4 Passengers", "2 Luggage", "AC", "Comfortable"],
    image: "/images/fleet/sedan.jpg"
  },
  {
    id: "suv",
    name: "SUV",
    description: "Spacious 6-seater vehicle",
    price: "₹3,500",
    features: ["6 Passengers", "3 Luggage", "AC", "Spacious"],
    image: "/images/fleet/suv.jpg"
  },
  {
    id: "van",
    name: "Van/Tempo Traveler",
    description: "Large 12-seater vehicle",
    price: "₹4,500",
    features: ["12 Passengers", "Large Luggage", "AC", "Comfortable"],
    image: "/images/fleet/van.jpg"
  }
];

const formSchema = z.object({
  from: z.string().min(1, "Pickup location is required"),
  to: z.string().min(1, "Destination is required"),
  date: z.date({
    required_error: "Please select a departure date",
  }),
  time: z.string().min(1, "Departure time is required"),
  returnDate: z.date({
    required_error: "Please select a return date",
  }),
  returnTime: z.string().min(1, "Return time is required"),
  passengers: z.string().min(1, "Number of passengers is required"),
});

type FormValues = z.infer<typeof formSchema>;

export function RoundTripBookingForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: "",
      to: "",
      passengers: "1",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      // Construct the URL with booking details
      const searchParams = new URLSearchParams({
        type: "round-trip",
        from: values.from,
        to: values.to,
        date: format(values.date, "yyyy-MM-dd"),
        time: values.time,
        returnDate: format(values.returnDate, "yyyy-MM-dd"),
        returnTime: values.returnTime,
        passengers: values.passengers,
      });

      // Redirect to vehicle selection page
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
          name="from"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Location</FormLabel>
                  <FormControl>
                <Input placeholder="Enter pickup location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
          name="to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination</FormLabel>
                  <FormControl>
                <Input placeholder="Enter destination" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
            name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                <FormLabel>Departure Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                        className={`w-full pl-3 text-left font-normal bg-white text-black ${
                            !field.value && "text-muted-foreground"
                        }`}
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
                <FormLabel>Departure Time</FormLabel>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="returnDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Return Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={`w-full pl-3 text-left font-normal bg-white text-black ${
                          !field.value && "text-muted-foreground"
                        }`}
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
            name="returnTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Return Time</FormLabel>
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

            <FormField
              control={form.control}
              name="passengers"
              render={({ field }) => (
                <FormItem>
              <FormLabel>Passengers</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                  <SelectTrigger className="bg-white text-black">
                        <SelectValue placeholder="Select passengers" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => (i + 1).toString()).map(
                    (num) => (
                      <SelectItem key={num} value={num}>
                        {num} {num === "1" ? "Passenger" : "Passengers"}
                        </SelectItem>
                    )
                  )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

              <Button 
                type="submit" 
          className="w-full rounded-full"
          disabled={isSubmitting}
              >
          {isSubmitting ? "Processing..." : "Continue to Vehicle Selection"}
              </Button>
      </form>
    </Form>
  );
} 