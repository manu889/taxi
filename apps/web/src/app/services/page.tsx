"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

const services = [
  {
    title: "Airport Transfer",
    description: "Reliable and comfortable airport transfers to and from Mysore Airport. Fixed rates, no hidden charges.",
    features: [
      "24/7 Service",
      "Flight Tracking",
      "Meet & Greet",
      "Fixed Rates",
      "Luggage Assistance"
    ],
    image: "/images/services/airport.jpg"
  },
  {
    title: "City Tours",
    description: "Explore Mysore's rich heritage with our guided city tours. Visit palaces, temples, and local attractions.",
    features: [
      "Expert Guides",
      "Flexible Itineraries",
      "Comfortable Vehicles",
      "Local Insights",
      "Photo Stops"
    ],
    image: "/images/services/city-tour.jpg"
  },
  {
    title: "Outstation Trips",
    description: "Travel to nearby destinations like Bangalore, Ooty, or Coorg with our comfortable and reliable service.",
    features: [
      "Long Distance Comfort",
      "Experienced Drivers",
      "Flexible Packages",
      "24/7 Support",
      "Route Planning"
    ],
    image: "/images/services/outstation.jpg"
  },
  {
    title: "Wedding & Events",
    description: "Special transportation services for weddings and events. Luxury vehicles and professional chauffeurs.",
    features: [
      "Luxury Vehicles",
      "Professional Drivers",
      "Flexible Hours",
      "Group Bookings",
      "Special Decorations"
    ],
    image: "/images/services/wedding.jpg"
  }
]

export default function ServicesPage() {
  return (
    <div className="max-w-[1350px] mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Experience premium taxi services in Mysore with our range of transportation solutions
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {services.map((service) => (
          <Card key={service.title} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative">
              <img
                src={service.image}
                alt={service.title}
                className="object-cover w-full h-full"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">{service.title}</CardTitle>
              <CardDescription className="text-base">{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full">Book Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 bg-primary/5 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Need a Custom Service?</h2>
        <p className="text-muted-foreground mb-6">
          We offer flexible solutions for all your transportation needs. Contact us to discuss your requirements.
        </p>
        <Button size="lg">Contact Us</Button>
      </div>
    </div>
  )
} 