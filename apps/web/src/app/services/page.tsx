"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Plane, 
  MapPin, 
  Calendar, 
  Users, 
  Clock, 
  Car,
  Phone,
  Mail,
  MessageSquare,
  Star,
  Shield,
  Coffee,
  Wifi,
  Snowflake,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Airport Transfer",
    description: "Reliable airport transfers with flight tracking",
    icon: Plane,
    link: "/airport",
    color: "from-blue-500/20 to-blue-600/20"
  },
  {
    title: "City Tours",
    description: "Explore Mysore's heritage with expert guides",
    icon: MapPin,
    link: "/city-tours",
    color: "from-green-500/20 to-green-600/20"
  },
  {
    title: "Outstation Trips",
    description: "Comfortable long-distance travel",
    icon: Calendar,
    link: "/outstation",
    color: "from-purple-500/20 to-purple-600/20"
  },
  {
    title: "Wedding & Events",
    description: "Luxury vehicles for special occasions",
    icon: Users,
    link: "/wedding-events",
    color: "from-pink-500/20 to-pink-600/20"
  },
  {
    title: "Hourly Rental",
    description: "Flexible taxi service by the hour",
    icon: Clock,
    link: "/hourly",
    color: "from-orange-500/20 to-orange-600/20"
  },
  {
    title: "Corporate Travel",
    description: "Business travel solutions",
    icon: Car,
    link: "/corporate",
    color: "from-red-500/20 to-red-600/20"
  },
  {
    title: "Local Service",
    description: "Quick and reliable city travel",
    icon: MapPin,
    link: "/local",
    color: "from-teal-500/20 to-teal-600/20"
  },
  {
    title: "Tour Packages",
    description: "Curated travel experiences",
    icon: Star,
    link: "/packages",
    color: "from-yellow-500/20 to-yellow-600/20"
  }
];

const features = [
  {
    title: "Safe & Reliable",
    description: "Well-maintained vehicles with professional drivers",
    icon: Shield
  },
  {
    title: "24/7 Service",
    description: "Round-the-clock availability",
    icon: Clock
  },
  {
    title: "Free WiFi",
    description: "Stay connected during your journey",
    icon: Wifi
  },
  {
    title: "Climate Control",
    description: "Comfortable temperature throughout",
    icon: Snowflake
  },
  {
    title: "Refreshments",
    description: "Complimentary water bottles",
    icon: Coffee
  },
  {
    title: "Professional Drivers",
    description: "Experienced and courteous chauffeurs",
    icon: CheckCircle2
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-primary/40 via-blue-200 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide shadow mb-4">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Premium Transportation Solutions
            </h1>
            <p className="text-lg text-muted-foreground">
              Experience the best taxi services in Mysore with our comprehensive range of transportation solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={service.link}>
                  <Card className="h-full hover:shadow-lg transition-all group">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <service.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
              Why Choose Us
            </span>
            <h2 className="text-3xl font-bold mb-4">
              Your Trusted Transportation Partner
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-sm font-semibold mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Need a Custom Service?</h2>
              <p className="text-muted-foreground">
                Contact us to discuss your specific transportation requirements
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Call Us</p>
                  <p className="font-medium">+91 1234567890</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Email Us</p>
                  <p className="font-medium">info@taximysore.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">WhatsApp</p>
                  <p className="font-medium">+91 1234567890</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button size="lg" className="rounded-full">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 