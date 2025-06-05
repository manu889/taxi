"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarIcon } from "lucide-react";
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

const formSchema = z.object({
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string().min(1, "Time is required"),
  passengers: z.string().min(1, "Number of passengers is required"),
  // We might need additional fields depending on package details, e.g., pickup location if not included
});

type FormValues = z.infer<typeof formSchema>;

interface PackageBookingFormProps {
  packageSlug: string;
  packageTitle: string;
}

export function PackageBookingForm({ packageSlug, packageTitle }: PackageBookingFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passengers: "1",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      // Construct the URL with booking details and package info
      const searchParams = new URLSearchParams({
        type: "package",
        packageSlug: packageSlug,
        date: format(values.date, "yyyy-MM-dd"),
        time: values.time,
        passengers: values.passengers,
        // Add other relevant package details as needed, e.g., pickup/drop-off if not fixed
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
        <h3 className="text-lg font-semibold">Booking for: {packageTitle}</h3> {/* Display package title */}
        
        {/* Date and Time Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        {/* Passengers Field */}
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