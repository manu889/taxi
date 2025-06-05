"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Luggage, Snowflake, Wifi } from "lucide-react"

const vehicles = [
  {
    title: "Sedan",
    description: "Comfortable and economical for up to 4 passengers. Perfect for city travel and airport transfers.",
    features: [
      { icon: Users, text: "4 Passengers" },
      { icon: Luggage, text: "2 Large Bags" },
      { icon: Snowflake, text: "AC" },
      { icon: Wifi, text: "Free WiFi" }
    ],
    image: "/images/fleet/sedan.jpg",
    price: "From ₹15/km"
  },
  {
    title: "SUV",
    description: "Spacious and powerful for up to 6 passengers. Ideal for family trips and group travel.",
    features: [
      { icon: Users, text: "6 Passengers" },
      { icon: Luggage, text: "4 Large Bags" },
      { icon: Snowflake, text: "AC" },
      { icon: Wifi, text: "Free WiFi" }
    ],
    image: "/images/fleet/suv.jpg",
    price: "From ₹20/km"
  },
  {
    title: "Luxury Sedan",
    description: "Premium comfort and style for up to 4 passengers. Perfect for business travel and special occasions.",
    features: [
      { icon: Users, text: "4 Passengers" },
      { icon: Luggage, text: "3 Large Bags" },
      { icon: Snowflake, text: "Climate Control" },
      { icon: Wifi, text: "Premium WiFi" }
    ],
    image: "/images/fleet/luxury.jpg",
    price: "From ₹25/km"
  },
  {
    title: "Tempo Traveller",
    description: "Large capacity vehicle for up to 12 passengers. Great for group tours and events.",
    features: [
      { icon: Users, text: "12 Passengers" },
      { icon: Luggage, text: "8 Large Bags" },
      { icon: Snowflake, text: "AC" },
      { icon: Wifi, text: "Free WiFi" }
    ],
    image: "/images/fleet/tempo.jpg",
    price: "From ₹30/km"
  }
]

export default function FleetPage() {
  return (
    <div className="max-w-[1350px] mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Fleet</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose from our range of well-maintained vehicles, each offering comfort, safety, and style
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.title} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative">
              <img
                src={vehicle.image}
                alt={vehicle.title}
                className="object-cover w-full h-full"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{vehicle.title}</CardTitle>
                  <CardDescription className="text-base">{vehicle.description}</CardDescription>
                </div>
                <div className="text-lg font-bold text-primary">{vehicle.price}</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {vehicle.features.map((feature) => (
                  <div key={feature.text} className="flex items-center gap-2">
                    <feature.icon className="h-5 w-5 text-primary" />
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full">Book Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 bg-primary/5 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Need a Special Vehicle?</h2>
        <p className="text-muted-foreground mb-6">
          We can arrange special vehicles for your specific needs. Contact us to discuss your requirements.
        </p>
        <Button size="lg">Contact Us</Button>
      </div>
    </div>
  )
} 