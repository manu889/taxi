"use client";

import { motion } from "framer-motion";
import { 
  Clock, MapPin, Plane, Shield, 
  CheckCircle2, ChevronRight, Users, 
  Luggage, DollarSign, Phone 
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AirportBookingForm } from "@/components/booking-forms";

const airports = [
  {
    name: "Mysore Airport",
    code: "MYQ",
    distance: "10 km",
    time: "30 mins",
    price: "₹500",
    features: ["Domestic Flights", "24/7 Service", "Meet & Greet"]
  },
  {
    name: "Bangalore International Airport",
    code: "BLR",
    distance: "145 km",
    time: "3.5 hours",
    price: "₹2,500",
    features: ["International Flights", "24/7 Service", "Flight Tracking"]
  },
  {
    name: "Mangalore International Airport",
    code: "IXE",
    distance: "200 km",
    time: "4.5 hours",
    price: "₹3,500",
    features: ["International Flights", "24/7 Service", "Flight Tracking"]
  }
];

const features = [
  {
    icon: Clock,
    title: "24/7 Service",
    description: "Round-the-clock airport transfer service for all flights"
  },
  {
    icon: Shield,
    title: "Safe & Reliable",
    description: "Professional drivers and well-maintained vehicles"
  },
  {
    icon: Plane,
    title: "Flight Tracking",
    description: "Real-time flight tracking for timely pickups"
  },
  {
    icon: Users,
    title: "Meet & Greet",
    description: "Driver meets you at the arrival gate with a name board"
  }
];

const faqs = [
  {
    question: "How do I book an airport transfer?",
    answer: "You can book through our website, mobile app, or by calling our 24/7 customer service. We recommend booking at least 24 hours in advance for better rates."
  },
  {
    question: "What happens if my flight is delayed?",
    answer: "We track your flight in real-time and adjust the pickup time accordingly. Our drivers will wait for you at no extra charge for up to 60 minutes after the scheduled landing time."
  },
  {
    question: "Are the rates fixed or metered?",
    answer: "All our airport transfer rates are fixed, with no hidden charges. The price includes toll charges, parking fees, and waiting time."
  },
  {
    question: "What if I need to cancel my booking?",
    answer: "Free cancellation up to 2 hours before the scheduled pickup time. Cancellations made within 2 hours may be subject to a cancellation fee."
  }
];

export default function AirportPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/40 via-blue-200 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold">
                Airport Transfer Services
              </h1>
              <p className="text-lg text-muted-foreground">
                Reliable and comfortable airport transfers to and from Mysore Airport, 
                Bangalore International Airport, and Mangalore International Airport. 
                Professional drivers, flight tracking, and 24/7 service.
              </p>
              <div className="flex flex-wrap gap-4">
                {features.slice(0, 2).map((feature) => (
                  <div key={feature.title} className="flex items-center gap-2">
                    <feature.icon className="h-5 w-5 text-primary" />
                    <span>{feature.title}</span>
                  </div>
                ))}
              </div>
              <Link href="/airport/vehicles">
                <Button variant="outline" className="rounded-full mt-4">
                  View Available Vehicles
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-xl mx-auto"
            >
              <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-primary/30">
                <h2 className="text-xl font-bold mb-6 text-center">Book Airport Transfer</h2>
                <AirportBookingForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Available Airports */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Available Airports</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide reliable transfer services to and from major airports in the region
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {airports.map((airport) => (
              <Card key={airport.code} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{airport.name}</h3>
                      <p className="text-sm text-muted-foreground">Code: {airport.code}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">{airport.price}</div>
                      <div className="text-sm text-muted-foreground">one way</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm">{airport.distance}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm">{airport.time}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {airport.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Airport Transfer Service?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience hassle-free airport transfers with our premium service
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-card rounded-xl p-6 border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <feature.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our airport transfer service
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                className="bg-card rounded-xl p-6 border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Help with Your Booking?</h2>
            <p className="text-lg opacity-90 mb-8">
              Our customer service team is available 24/7 to assist you with your airport transfer booking
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="rounded-full">
                Book Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full border-white text-white hover:bg-white/10"
              >
                <Phone className="mr-2 h-4 w-4" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 