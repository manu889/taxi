"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Clock, Star, Car, DollarSign, LifeBuoy, 
  MousePointerClick, ChevronRight, MapPin 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  OneWayBookingForm, 
  RoundTripBookingForm, 
  LocalBookingForm, 
  AirportBookingForm 
} from "@/components/booking-forms";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("one-way");

  return (
    <>
      {/* Hero Section with Modern Gradient and Highlight - Compact Landing Page Layout */}
      <div className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center bg-gradient-to-br from-primary/40 via-blue-200 to-white overflow-hidden">
        {/* Radial highlight behind text */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2/3 h-2/3 pointer-events-none" style={{ zIndex: 1 }}>
          <div className="w-full h-full rounded-full bg-white/40 blur-3xl opacity-60" />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-between h-full px-4 py-8 w-full gap-8">
          {/* Left Column (Text Content) */}
          <motion.div 
            className="flex-1 space-y-4 lg:pr-8 text-black text-center lg:text-left flex flex-col justify-center items-center lg:items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide shadow mb-2">
              Premium Taxi Service in Mysuru
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight drop-shadow-xl text-black">
              Ride <span className="text-primary">Smarter</span>, Ride <span className="text-primary">Safer</span>
            </h1>
            <p className="max-w-md text-base text-gray-700 leading-relaxed drop-shadow">
              Experience the next generation of taxi services—fast, safe, and always at your fingertips. Airport transfers, outstation trips, and more, 24/7.
            </p>
            {/* Features List */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-4">
              {[
                { text: "24/7 Service", icon: <Clock className="w-4 h-4 text-primary" /> },
                { text: "Pro Drivers", icon: <Star className="w-4 h-4 text-primary" /> },
                { text: "Fixed Pricing", icon: <DollarSign className="w-4 h-4 text-primary" /> },
                { text: "Clean Cars", icon: <Car className="w-4 h-4 text-primary" /> }
              ].map((feature) => (
                <div key={feature.text} className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full shadow-sm text-xs font-medium text-primary">
                  {feature.icon}
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 mt-6 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="rounded-full bg-primary hover:bg-primary/90 text-base px-6 py-3 shadow transition-transform hover:scale-105"
                onClick={() => setActiveTab("one-way")}
              >
                <span className="flex items-center gap-2">
                  <MousePointerClick className="h-4 w-4" /> Book Now
                </span>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full border-primary text-primary hover:bg-primary/10 text-base px-6 py-3 shadow transition-transform hover:scale-105"
                asChild
              >
                <Link href="/fleet" className="flex items-center gap-2">
                  <Car className="h-4 w-4" /> View Our Fleet
                </Link>
              </Button>
            </div>
          </motion.div>
          {/* Right Column (Booking Form) */}
          <motion.div 
            className="w-full max-w-xl flex justify-center lg:justify-end p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-primary/30 w-full">
              <h2 className="text-xl font-bold mb-4 text-center text-black dark:text-white">Book Your Ride</h2>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4 bg-primary/10 rounded-full">
                  <TabsTrigger value="one-way">One Way</TabsTrigger>
                  <TabsTrigger value="round-trip">Round Trip</TabsTrigger>
                  <TabsTrigger value="local">Local</TabsTrigger>
                  <TabsTrigger value="airport">Airport</TabsTrigger>
                </TabsList>
                <TabsContent value="one-way">
                  <OneWayBookingForm />
                </TabsContent>
                <TabsContent value="round-trip">
                  <RoundTripBookingForm />
                </TabsContent>
                <TabsContent value="local">
                  <LocalBookingForm />
                </TabsContent>
                <TabsContent value="airport">
                  <AirportBookingForm />
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-primary">
          <span className="text-xs mb-1">Scroll to explore</span>
          <div className="w-5 h-8 border-2 border-primary/40 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-1 bg-primary rounded-full mt-1"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-background">
        {/* Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                Our Services
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">How Can We Help You?</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Choose from our wide range of taxi services designed to meet all your transportation needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Airport Transfer",
                  description: "Reliable pickup and drop service to and from airports",
                  icon: "✈️",
                  link: "/airport"
                },
                {
                  title: "Outstation Trips",
                  description: "Comfortable long-distance travel to your favorite destinations",
                  icon: "🏞️",
                  link: "/outstation"
                },
                {
                  title: "Hourly Rental",
                  description: "Flexible taxi service charged on hourly basis",
                  icon: "🕒",
                  link: "/hourly"
                },
                {
                  title: "Tour Packages",
                  description: "Curated travel packages for popular tourist destinations",
                  icon: "🧳",
                  link: "/packages"
                }
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  className="bg-card rounded-xl p-6 border border-border/50 hover:shadow-lg transition-all group"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Link href={service.link} className="inline-flex items-center text-primary font-medium">
                    Learn more
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Taxi Packages Section (moved up) */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-white/80 to-primary/5 dark:from-gray-900/80 dark:via-gray-800/90 dark:to-gray-900/80">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                Taxi Packages
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">Popular Packages</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Explore our best-value taxi packages for top destinations
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* List at least 10 packages here */}
              {[
                {
                  slug: "mysore-bangalore",
                  title: "Mysore to Bangalore",
                  description: "Comfortable and reliable taxi service between Mysore and Bangalore.",
                  image: "/images/packages/mysore-bangalore.jpg",
                  price: "₹2,500"
                },
                {
                  slug: "mysore-ooty",
                  title: "Mysore to Ooty",
                  description: "Scenic journey from Mysore to the beautiful hill station of Ooty.",
                  image: "/images/packages/mysore-ooty.jpg",
                  price: "₹2,800"
                },
                {
                  slug: "mysore-coorg",
                  title: "Mysore to Coorg",
                  description: "Enjoy a comfortable ride to the coffee land of Coorg.",
                  image: "/images/packages/mysore-coorg.jpg",
                  price: "₹3,000"
                },
                {
                  slug: "mysore-wayanad",
                  title: "Mysore to Wayanad",
                  description: "Travel to the scenic hills of Wayanad with ease.",
                  image: "/images/packages/mysore-wayanad.jpg",
                  price: "₹3,200"
                },
                {
                  slug: "mysore-chikmagalur",
                  title: "Mysore to Chikmagalur",
                  description: "A relaxing journey to the coffee capital of Karnataka.",
                  image: "/images/packages/mysore-chikmagalur.jpg",
                  price: "₹3,500"
                },
                {
                  slug: "mysore-bandipur",
                  title: "Mysore to Bandipur",
                  description: "Wildlife adventure to Bandipur National Park.",
                  image: "/images/packages/mysore-bandipur.jpg",
                  price: "₹2,200"
                },
                {
                  slug: "mysore-hampi",
                  title: "Mysore to Hampi",
                  description: "Explore the UNESCO World Heritage site of Hampi.",
                  image: "/images/packages/mysore-hampi.jpg",
                  price: "₹4,500"
                },
                {
                  slug: "mysore-mangalore",
                  title: "Mysore to Mangalore",
                  description: "Coastal ride to the port city of Mangalore.",
                  image: "/images/packages/mysore-mangalore.jpg",
                  price: "₹4,000"
                },
                {
                  slug: "mysore-hassan",
                  title: "Mysore to Hassan",
                  description: "Visit the temple town of Hassan in comfort.",
                  image: "/images/packages/mysore-hassan.jpg",
                  price: "₹2,900"
                },
                {
                  slug: "mysore-shimoga",
                  title: "Mysore to Shimoga",
                  description: "Travel to the gateway of the Western Ghats.",
                  image: "/images/packages/mysore-shimoga.jpg",
                  price: "₹3,800"
                }
              ].map((pkg) => (
                <Link key={pkg.slug} href={`/packages/${pkg.slug}`} className="block bg-card rounded-lg border p-6 hover:shadow-lg transition">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-40 object-cover rounded mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{pkg.title}</h3>
                  <p className="text-muted-foreground mb-2">{pkg.description}</p>
                  <div className="text-lg font-bold text-primary">{pkg.price}</div>
                  <div className="mt-2 text-sm text-primary underline">View Details</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">The Taxi Mysore Advantage</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                We're committed to providing exceptional service that sets us apart
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Column - Features */}
              <div className="space-y-8">
                {[
                  {
                    icon: <Clock className="h-5 w-5 text-primary" />,
                    title: "Reliable & Punctual",
                    description: "Timely pickups and safe drop-offs for a stress-free journey."
                  },
                  {
                    icon: <Star className="h-5 w-5 text-primary" />,
                    title: "Experienced Drivers",
                    description: "Professional drivers with extensive route knowledge and training."
                  },
                  {
                    icon: <Car className="h-5 w-5 text-primary" />,
                    title: "Modern & Clean Fleet",
                    description: "Well-maintained vehicles for comfortable and safe travel."
                  },
                  {
                    icon: <DollarSign className="h-5 w-5 text-primary" />,
                    title: "Transparent Pricing",
                    description: "Clear and upfront pricing with no hidden costs."
                  }
                ].map((feature, index) => (
                  <motion.div 
                    key={feature.title}
                    className="flex gap-4 items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Right Column - Image */}
              <motion.div 
                className="relative rounded-2xl overflow-hidden aspect-[4/3]"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <img 
                  src="/images/why-choose.jpg" 
                  alt="Taxi Service" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm font-medium">4.9/5 Rating</span>
                    </div>
                    <p className="text-sm opacity-90">Based on 1000+ customer reviews</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Fleet Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                Our Fleet
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">Comfortable & Reliable Vehicles</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Choose from our range of well-maintained vehicles to suit your needs
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Sedans",
                  description: "Ideal for individuals and small families, offering comfort and efficiency for city rides and short trips.",
                  image: "/images/fleet/sedan.jpg",
                  features: ["4 Passengers", "2 Luggage", "AC", "Comfortable"]
                },
                {
                  title: "SUVs",
                  description: "Spacious and comfortable for longer journeys and group travel, with ample luggage space.",
                  image: "/images/fleet/suv.jpg",
                  features: ["6-7 Passengers", "3 Luggage", "AC", "Spacious"]
                },
                {
                  title: "Vans/Tempo Travelers",
                  description: "Perfect for larger groups and family outings, ensuring a comfortable journey for everyone.",
                  image: "/images/fleet/van.jpg",
                  features: ["9-12 Passengers", "Large Luggage", "AC", "Comfortable"]
                }
              ].map((vehicle, index) => (
                <motion.div 
                  key={vehicle.title}
                  className="rounded-xl overflow-hidden bg-card border border-border/50 group hover:shadow-lg transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                      <div className="p-4 text-white">
                        <span className="text-sm font-medium">View Details</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{vehicle.title}</h3>
                    <p className="text-muted-foreground mb-4">{vehicle.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {vehicle.features.map((feature) => (
                        <span key={feature} className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link href="/fleet">
                <Button size="lg" variant="outline" className="rounded-full">
                  View All Vehicles
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
              <path d="M0,0 L100,100 M100,0 L0,100" stroke="currentColor" strokeWidth="0.5"></path>
            </svg>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Book Your Ride?</h2>
              <p className="text-lg opacity-90 mb-8">
                Get a quick quote or book your taxi online in minutes.
                Reliable service and comfortable cars for all your travel needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="rounded-full">
                  Book Now
                </Button>
                <Button size="lg" variant="outline" className="rounded-full border-white text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Destinations Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                Popular Routes
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">Top Destinations</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Explore our most requested destinations with fixed transparent pricing
              </p>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Bangalore", distance: "145 km", time: "3.5 hours", image: "/images/destinations/bangalore.jpg" },
                { name: "Ooty", distance: "125 km", time: "3 hours", image: "/images/destinations/ooty.jpg" },
                { name: "Coorg", distance: "120 km", time: "3 hours", image: "/images/destinations/coorg.jpg" },
                { name: "Wayanad", distance: "115 km", time: "3 hours", image: "/images/destinations/wayanad.jpg" },
                { name: "Chikmagalur", distance: "150 km", time: "3.5 hours", image: "/images/destinations/chikmagalur.jpg" },
                { name: "Bandipur", distance: "80 km", time: "2 hours", image: "/images/destinations/bandipur.jpg" }
              ].map((destination, index) => (
                <motion.div 
                  key={destination.name}
                  className="rounded-xl overflow-hidden bg-card border border-border/50 group hover:shadow-lg transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={destination.image} 
                      alt={destination.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <h3 className="text-xl font-bold">{destination.name}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{destination.distance}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{destination.time}</span>
                      </div>
                    </div>
                    <Link 
                      href={`/outstation?dest=${destination.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="w-full inline-flex justify-center items-center py-2 px-4 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      Book Now
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">What Our Customers Say</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Don't just take our word for it - hear from our satisfied customers
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Rahul Sharma",
                  location: "Bangalore",
                  comment: "Excellent service! The driver was punctual, professional, and the car was very clean. Will definitely use again for my Mysore trips.",
                  rating: 5
                },
                {
                  name: "Priya Patel",
                  location: "Mumbai",
                  comment: "We booked a 3-day tour package and had a wonderful experience. Our driver was knowledgeable about all the tourist spots and very accommodating.",
                  rating: 5
                },
                {
                  name: "Michael Johnson",
                  location: "USA",
                  comment: "As a foreign tourist, I was worried about transportation in India, but Taxi Mysore made it so easy. Reliable service and fair pricing.",
                  rating: 4
                }
              ].map((testimonial, index) => (
                <motion.div 
                  key={testimonial.name}
                  className="bg-background rounded-xl p-6 border border-border/50 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`h-4 w-4 ${star <= testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                      />
                    ))}
                  </div>
                  <p className="mt-4 text-muted-foreground italic">"{testimonial.comment}"</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}