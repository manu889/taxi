"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Users, Clock, Shield } from "lucide-react"

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in every aspect of our service, from vehicle maintenance to customer care."
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Your satisfaction is our priority. We listen to your needs and go the extra mile to exceed expectations."
  },
  {
    icon: Clock,
    title: "Reliability",
    description: "We value your time. Our services are punctual, efficient, and dependable."
  },
  {
    icon: Shield,
    title: "Safety",
    description: "Your safety is non-negotiable. Our vehicles and drivers meet the highest safety standards."
  }
]

const team = [
  {
    name: "Ravi Kumar",
    role: "Founder & CEO",
    image: "/images/team/ravi.jpg",
    description: "With over 15 years of experience in the transportation industry, Ravi leads our company with vision and passion."
  },
  {
    name: "Priya Sharma",
    role: "Operations Manager",
    image: "/images/team/priya.jpg",
    description: "Priya ensures smooth operations and maintains our high service standards across all departments."
  },
  {
    name: "Sunil Patel",
    role: "Lead Driver",
    image: "/images/team/sunil.jpg",
    description: "Sunil leads our team of professional drivers, ensuring safe and comfortable journeys for all our customers."
  }
]

export default function AboutPage() {
  return (
    <div className="max-w-[1350px] mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your trusted partner for safe, reliable, and comfortable transportation in Mysore
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Our Story</h2>
          <p className="text-muted-foreground">
            Founded in 2010, Taxi Mysore has grown from a small fleet of 5 vehicles to one of the most trusted taxi services in the region. Our journey has been driven by a commitment to excellence and customer satisfaction.
          </p>
          <p className="text-muted-foreground">
            Today, we serve thousands of customers annually, from local commuters to international tourists, providing safe and comfortable transportation solutions.
          </p>
        </div>
        <div className="relative aspect-video">
          <img
            src="/images/about/office.jpg"
            alt="Our Office"
            className="object-cover w-full h-full rounded-2xl"
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Our Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <Card key={value.title} className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{value.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member) => (
            <Card key={member.name} className="text-center">
              <div className="aspect-square relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-full rounded-t-lg"
                />
              </div>
              <CardHeader>
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <CardDescription>{member.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-primary/5 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Join Our Journey</h2>
        <p className="text-muted-foreground mb-6">
          Experience the difference of traveling with a company that puts you first.
        </p>
        <Button size="lg">Book Your Ride</Button>
      </div>
    </div>
  )
} 