"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, MapPin, Clock, Users, Calendar, Filter, Search, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const packageTypes = [
  { id: "all", label: "All Packages" },
  { id: "city", label: "City Tours" },
  { id: "outstation", label: "Outstation" },
  { id: "group", label: "Group Tours" },
  { id: "custom", label: "Custom Packages" },
];

const durationFilters = [
  { id: "all", label: "Any Duration" },
  { id: "half-day", label: "Half Day" },
  { id: "full-day", label: "Full Day" },
  { id: "multi-day", label: "Multi Day" },
];

const packages = [
  {
    id: 1,
    title: "Mysore City Tour",
    description: "Explore the royal city of Mysore with its magnificent palaces, temples, and local markets.",
    features: [
      "8 Hours Service",
      "Fuel Included",
      "Driver Allowance",
      "All Taxes",
      "Flexible Stops"
    ],
    image: "/images/packages/Mysore_Tour_Package.jpg",
    price: "₹2,500/day",
    duration: "8 Hours",
    location: "Mysore City",
    type: "city",
    durationType: "full-day",
    rating: 4.8,
    reviews: 124,
    icon: MapPin,
    basePrice: 2500,
    pricePerKm: 15,
    minHours: 8
  },
  {
    id: 2,
    title: "Coorg Tour Package",
    description: "Experience the beauty of Coorg with its coffee plantations, waterfalls, and scenic views.",
    features: [
      "2 Days Service",
      "Fuel Included",
      "Driver Stay",
      "Flexible Itinerary",
      "Photo Stops"
    ],
    image: "/images/packages/Coorg_Tour_Package.jpg",
    price: "₹5,000/day",
    duration: "2 Days",
    location: "Coorg",
    type: "outstation",
    durationType: "multi-day",
    rating: 4.9,
    reviews: 89,
    icon: MapPin,
    basePrice: 5000,
    pricePerKm: 20,
    minHours: 24
  },
  {
    id: 3,
    title: "Weekend Getaway",
    description: "Perfect weekend escape to nearby destinations with comfortable travel and flexible plans.",
    features: [
      "2 Days Service",
      "Fuel Included",
      "Driver Stay",
      "Flexible Itinerary",
      "Photo Stops"
    ],
    image: "/images/packages/2.jpg",
    price: "₹5,000/day",
    duration: "2 Days",
    location: "Multiple Destinations",
    type: "outstation",
    durationType: "multi-day",
    rating: 4.7,
    reviews: 156,
    icon: Calendar
  },
  {
    id: 4,
    title: "Group Tour Package",
    description: "Special packages for group travel with spacious vehicles and experienced drivers.",
    features: [
      "Group Discount",
      "Spacious Vehicles",
      "Experienced Drivers",
      "Flexible Hours",
      "Special Rates"
    ],
    image: "/images/packages/3.jpg",
    price: "Contact Us",
    duration: "Custom",
    location: "Anywhere",
    type: "group",
    durationType: "custom",
    rating: 4.9,
    reviews: 67,
    icon: Users
  }
];

export default function PackagesPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPackages = packages.filter(pkg => {
    const matchesType = selectedType === "all" || pkg.type === selectedType;
    const matchesDuration = selectedDuration === "all" || pkg.durationType === selectedDuration;
    const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesDuration && matchesSearch;
  });

  const handlePackageSelect = (packageId: number) => {
    // Store the selected package in localStorage for price calculation
    const selectedPackage = packages.find(pkg => pkg.id === packageId);
    if (selectedPackage) {
      localStorage.setItem('selectedPackage', JSON.stringify(selectedPackage));
      // Navigate to the booking form with the package ID
      router.push(`/booking?packageId=${packageId}`);
    }
  };

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
              Tour Packages
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Explore Our Tour Packages
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose from our curated packages designed to make your travel experience seamless and enjoyable
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {packageTypes.map(type => (
                <Badge
                  key={type.id}
                  variant={selectedType === type.id ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10"
                  onClick={() => setSelectedType(type.id)}
                >
                  {type.label}
                </Badge>
              ))}
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search packages..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  {durationFilters.map(filter => (
                    <SelectItem key={filter.id} value={filter.id}>
                      {filter.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredPackages.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No packages found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card 
                    className="overflow-hidden hover:shadow-lg transition-all group h-full flex flex-col cursor-pointer"
                    onClick={() => handlePackageSelect(pkg.id)}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                        <div className="p-4 text-white">
                          <span className="text-sm font-medium">Select Package</span>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-semibold">{pkg.rating}</span>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {pkg.title}
                          </CardTitle>
                          <CardDescription className="text-sm mt-2 line-clamp-2">
                            {pkg.description}
                          </CardDescription>
                        </div>
                        <div className="text-lg font-bold text-primary">{pkg.price}</div>
                      </div>
                      <div className="flex gap-4 mt-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{pkg.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <pkg.icon className="h-4 w-4" />
                          <span>{pkg.location}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-2 mb-6">
                        {pkg.features.slice(0, 3).map((feature) => (
                          <li key={feature} className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto">
                        <Button className="w-full group-hover:bg-primary/90 transition-colors">
                          Select Package
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Custom Package Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-primary/5 to-blue-50 rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Need a Custom Package?</h2>
              <p className="text-muted-foreground">
                We can create a custom package tailored to your specific needs and preferences.
              </p>
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