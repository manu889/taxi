"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Clock, MapPin, Users, Car, 
  Calendar, DollarSign, ChevronRight 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  OneWayBookingForm, 
  RoundTripBookingForm, 
  LocalBookingForm, 
  AirportBookingForm,
  PackageBookingForm
} from "@/components/booking-forms";

const packages = {
  "mysore-bangalore": {
    title: "Mysore to Bangalore Package",
    description: "Comfortable and reliable taxi service between Mysore and Bangalore",
    duration: "3.5 hours",
    distance: "145 km",
    price: "₹2,500",
    features: [
      "One-way transfer",
      "Professional driver",
      "AC vehicle",
      "Free waiting time",
      "Toll charges included",
      "24/7 support"
    ],
    itinerary: [
      {
        title: "Pickup from Mysore",
        description: "Flexible pickup time from your location in Mysore"
      },
      {
        title: "Comfortable Journey",
        description: "Travel in a well-maintained vehicle with a professional driver"
      },
      {
        title: "Drop at Bangalore",
        description: "Drop at your preferred location in Bangalore"
      }
    ],
    image: "/images/packages/mysore-bangalore.jpg"
  },
  "mysore-ooty": {
    title: "Mysore to Ooty Package",
    description: "Scenic journey from Mysore to the beautiful hill station of Ooty",
    duration: "3 hours",
    distance: "125 km",
    price: "₹2,800",
    features: [
      "One-way transfer",
      "Professional driver",
      "AC vehicle",
      "Free waiting time",
      "Toll charges included",
      "24/7 support"
    ],
    itinerary: [
      {
        title: "Pickup from Mysore",
        description: "Flexible pickup time from your location in Mysore"
      },
      {
        title: "Scenic Drive",
        description: "Enjoy the beautiful landscapes and tea gardens"
      },
      {
        title: "Drop at Ooty",
        description: "Drop at your preferred location in Ooty"
      }
    ],
    image: "/images/packages/mysore-ooty.jpg"
  }
};

export default function PackagePage() {
  const params = useParams();
  const packageData = packages[params.slug as keyof typeof packages];

  if (!packageData) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Package not found</h1>
        <p className="mt-4 text-muted-foreground">
          The package you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${packageData.image})` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {packageData.title}
            </h1>
            <p className="text-lg text-white/90">
              {packageData.description}
            </p>
          </div>
        </div>
      </div>

      {/* Package Details */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Package Info */}
          <div className="md:col-span-2 space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card p-4 rounded-lg border">
                <Clock className="h-5 w-5 text-primary mb-2" />
                <h3 className="font-medium">Duration</h3>
                <p className="text-muted-foreground">{packageData.duration}</p>
              </div>
              <div className="bg-card p-4 rounded-lg border">
                <MapPin className="h-5 w-5 text-primary mb-2" />
                <h3 className="font-medium">Distance</h3>
                <p className="text-muted-foreground">{packageData.distance}</p>
              </div>
              <div className="bg-card p-4 rounded-lg border">
                <Users className="h-5 w-5 text-primary mb-2" />
                <h3 className="font-medium">Capacity</h3>
                <p className="text-muted-foreground">4-6 Passengers</p>
              </div>
              <div className="bg-card p-4 rounded-lg border">
                <Car className="h-5 w-5 text-primary mb-2" />
                <h3 className="font-medium">Vehicle</h3>
                <p className="text-muted-foreground">Sedan/SUV</p>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-2xl font-bold mb-4">Package Features</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {packageData.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-2xl font-bold mb-4">Itinerary</h2>
              <div className="space-y-6">
                {packageData.itinerary.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="md:col-span-1">
            <div className="sticky top-24 bg-card rounded-lg border p-6 max-w-xl mx-auto">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {packageData.price}
                </div>
                <p className="text-muted-foreground">One-way trip</p>
              </div>

              <Tabs defaultValue="one-way" className="w-full">
                <TabsList className="grid w-full grid-cols-1 mb-6">
                  <TabsTrigger value="one-way">Book Now</TabsTrigger>
                </TabsList>
                <TabsContent value="one-way">
                  <PackageBookingForm packageSlug={packageData.slug} packageTitle={packageData.title} />
                </TabsContent>
              </Tabs>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Flexible booking</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>No hidden charges</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 