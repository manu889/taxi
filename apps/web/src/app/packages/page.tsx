"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

const packages = [
  {
    title: "City Explorer",
    description: "Perfect for exploring Mysore's main attractions in a day. Includes palace, zoo, and local markets.",
    features: [
      "8 Hours Service",
      "Fuel Included",
      "Driver Allowance",
      "All Taxes",
      "Flexible Stops"
    ],
    image: "/images/packages/city.jpg",
    price: "₹2,500/day"
  },
  {
    title: "Airport Special",
    description: "Reliable airport transfers with flight tracking and meet & greet service.",
    features: [
      "Flight Tracking",
      "Meet & Greet",
      "Luggage Handling",
      "Waiting Time",
      "Return Booking"
    ],
    image: "/images/packages/airport.jpg",
    price: "₹1,200/way"
  },
  {
    title: "Weekend Getaway",
    description: "Escape to nearby destinations like Ooty, Coorg, or Bangalore for a perfect weekend.",
    features: [
      "2 Days Service",
      "Fuel Included",
      "Driver Stay",
      "Flexible Itinerary",
      "Photo Stops"
    ],
    image: "/images/packages/weekend.jpg",
    price: "₹5,000/day"
  },
  {
    title: "Wedding Package",
    description: "Special transportation for wedding events with decorated vehicles and professional drivers.",
    features: [
      "Decorated Vehicles",
      "Professional Drivers",
      "Flexible Hours",
      "Group Discount",
      "Special Rates"
    ],
    image: "/images/packages/wedding.jpg",
    price: "Contact Us"
  }
]

export default function PackagesPage() {
  return (
    <div className="max-w-[1350px] mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Packages</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose from our curated packages designed to make your travel experience seamless and enjoyable
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {packages.map((pkg) => (
          <Card key={pkg.title} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="object-cover w-full h-full"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{pkg.title}</CardTitle>
                  <CardDescription className="text-base">{pkg.description}</CardDescription>
                </div>
                <div className="text-lg font-bold text-primary">{pkg.price}</div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                {pkg.features.map((feature) => (
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
        <h2 className="text-2xl font-bold mb-4">Need a Custom Package?</h2>
        <p className="text-muted-foreground mb-6">
          We can create a custom package tailored to your specific needs and preferences.
        </p>
        <Button size="lg">Contact Us</Button>
      </div>
    </div>
  )
} 