"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Users, Luggage, Car, Shield, 
  CheckCircle2, ChevronRight, Clock,
  Wifi, Snowflake, Coffee, MapPin,
  Calendar, Plane
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const vehicles = [
  {
    name: "Sedan",
    description: "Perfect for individuals and small families traveling light",
    image: "/images/fleet/sedan.jpg",
    features: [
      { icon: Users, text: "4 Passengers" },
      { icon: Luggage, text: "2 Large Bags" },
      { icon: Car, text: "Toyota Etios" },
      { icon: Clock, text: "24/7 Service" }
    ],
    amenities: ["AC", "Music System", "Comfortable Seats"],
    price: "Starting from ₹500"
  },
  {
    name: "SUV",
    description: "Spacious and comfortable for families and groups with more luggage",
    image: "/images/fleet/suv.jpg",
    features: [
      { icon: Users, text: "6 Passengers" },
      { icon: Luggage, text: "4 Large Bags" },
      { icon: Car, text: "Toyota Innova" },
      { icon: Clock, text: "24/7 Service" }
    ],
    amenities: ["AC", "Music System", "Comfortable Seats", "Extra Legroom"],
    price: "Starting from ₹1,500"
  },
  {
    name: "Premium SUV",
    description: "Luxury travel experience with premium amenities",
    image: "/images/fleet/premium-suv.jpg",
    features: [
      { icon: Users, text: "6 Passengers" },
      { icon: Luggage, text: "4 Large Bags" },
      { icon: Car, text: "Toyota Fortuner" },
      { icon: Clock, text: "24/7 Service" }
    ],
    amenities: ["AC", "Premium Sound System", "Leather Seats", "Extra Legroom", "Refreshments"],
    price: "Starting from ₹2,000"
  },
  {
    name: "Tempo Traveler",
    description: "Ideal for large groups and family outings",
    image: "/images/fleet/tempo.jpg",
    features: [
      { icon: Users, text: "12 Passengers" },
      { icon: Luggage, text: "8 Large Bags" },
      { icon: Car, text: "Force Tempo" },
      { icon: Clock, text: "24/7 Service" }
    ],
    amenities: ["AC", "Music System", "Comfortable Seats", "Spacious Interior"],
    price: "Starting from ₹3,000"
  }
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
  const searchParams = useSearchParams();
  const bookingType = searchParams.get("type") || "one-way";
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";
  const returnDate = searchParams.get("returnDate") || "";
  const returnTime = searchParams.get("returnTime") || "";
  const flightNumber = searchParams.get("flightNumber") || "";
  const passengers = searchParams.get("passengers") || "1";

  const getBookingSummary = () => {
    switch (bookingType) {
      case "airport":
        return (
          <>
            <div className="flex items-center gap-2">
              <Plane className="h-4 w-4 text-primary" />
              <span>Flight: {flightNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{from} → {to}</span>
            </div>
          </>
        );
      case "round-trip":
        return (
          <>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{from} ↔ {to}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>Departure: {date} at {time}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>Return: {returnDate} at {returnTime}</span>
            </div>
          </>
        );
      default:
        return (
          <>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{from} → {to}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{date} at {time}</span>
            </div>
          </>
        );
    }
  };

  const getBackLink = () => {
    switch (bookingType) {
      case "airport":
        return "/airport";
      case "round-trip":
        return "/?tab=round-trip";
      case "local":
        return "/?tab=local";
      default:
        return "/?tab=one-way";
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/40 via-blue-200 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Choose Your Vehicle
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Select from our range of comfortable and reliable vehicles for your journey.
                All vehicles are well-maintained and driven by professional chauffeurs.
              </p>
            </motion.div>

            {/* Booking Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-primary/30 mb-8"
            >
              <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
              <div className="space-y-2">
                {getBookingSummary()}
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>{passengers} Passenger{passengers !== "1" ? "s" : ""}</span>
                </div>
              </div>
            </motion.div>

            <div className="text-center">
              <Link href={getBackLink()}>
                <Button variant="outline" className="rounded-full">
                  <ChevronRight className="mr-2 h-4 w-4 rotate-180" />
                  Back to Booking
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Selection */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Available Vehicles</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our selection of vehicles for your journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles
              .filter(vehicle => vehicle.name !== 'Tempo Traveler')
              .map((vehicle, index) => (
              <motion.div
                key={vehicle.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="min-w-[300px]"
              >
                <Card className="overflow-hidden">
                  <div className="relative h-64">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2">{vehicle.name}</h3>
                        <p className="text-white/90">{vehicle.description}</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {vehicle.features.map((feature) => (
                        <div key={feature.text} className="flex items-center gap-2">
                          <feature.icon className="h-5 w-5 text-primary" />
                          <span className="text-sm">{feature.text}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {vehicle.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-lg font-bold text-primary">
                        {vehicle.price}
                      </div>
                      <Button 
                        className="rounded-full"
                        onClick={() => {
                          // Here you would typically handle the vehicle selection
                          // and proceed to the next step of booking
                          console.log("Selected vehicle:", vehicle.name);
                        }}
                      >
                        Select Vehicle
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Premium Amenities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enjoy a comfortable and luxurious journey with our premium amenities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => (
              <motion.div
                key={amenity.title}
                className="bg-card rounded-xl p-6 border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <amenity.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{amenity.title}</h3>
                <p className="text-muted-foreground">{amenity.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Complete Your Booking?</h2>
            <p className="text-lg opacity-90 mb-8">
              Choose your preferred vehicle and proceed with your booking
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={getBackLink()}>
                <Button size="lg" variant="secondary" className="rounded-full">
                  Back to Booking
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full border-white text-white hover:bg-white/10"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 