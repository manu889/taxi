"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    content: "+91 98765 43210",
    description: "24/7 Customer Support"
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@taximysore.com",
    description: "Response within 24 hours"
  },
  {
    icon: MapPin,
    title: "Office",
    content: "123 Main Street, Mysore",
    description: "Karnataka, India - 570001"
  },
  {
    icon: Clock,
    title: "Hours",
    content: "24/7 Service",
    description: "Available round the clock"
  }
];

export default function ContactPage() {
  return (
    <div className="max-w-[1350px] mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get in touch with us for any inquiries, bookings, or support
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you as soon as possible
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Your Name
                  </label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </label>
                <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="How can we help you?"
                  className="min-h-[120px]"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Reach out to us through any of these channels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{info.title}</h3>
                      <p className="text-primary font-medium">{info.content}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Location</CardTitle>
              <CardDescription>
                Visit our office in Mysore
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video relative rounded-lg overflow-hidden">
                <img
                  src="/images/contact/map.jpg"
                  alt="Office Location"
                  className="object-cover w-full h-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-primary/5 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Need Immediate Assistance?</h2>
        <p className="text-muted-foreground mb-6">
          Call our 24/7 support line for instant help with your booking or any other queries.
        </p>
        <Button size="lg">Call Now: +91 98765 43210</Button>
      </div>
    </div>
  );
} 