"use client";

import { motion } from "framer-motion";
import { 
  Users, Luggage, Car, Shield, 
  CheckCircle2, ChevronRight, Clock,
  Wifi, Snowflake, Coffee
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
    description: "Round-the-clock airport transfer service"
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
    title: "Meet & Greet",
    description: "Driver meets you at the arrival gate"
  }
];

export default function VehicleSelectionPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/40 via-blue-200 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Choose Your Vehicle
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Select from our range of comfortable and reliable vehicles for your airport transfer.
                All vehicles are well-maintained and driven by professional chauffeurs.
              </p>
              <Link href="/airport">
                <Button variant="outline" className="rounded-full">
                  <ChevronRight className="mr-2 h-4 w-4 rotate-180" />
                  Back to Airport Services
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vehicle Selection */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {vehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
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
                      <Button className="rounded-full">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Book Your Airport Transfer?</h2>
            <p className="text-lg opacity-90 mb-8">
              Choose your preferred vehicle and book your airport transfer now
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/airport">
                <Button size="lg" variant="secondary" className="rounded-full">
                  Book Now
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