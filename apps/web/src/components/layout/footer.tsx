import Link from "next/link";
import { Facebook, Twitter, Instagram, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Taxi Mysore</h3>
            <p className="text-muted-foreground">
              Your trusted partner for reliable and comfortable taxi services in Mysuru.
              We provide premium transportation solutions for all your travel needs.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { text: "About Us", href: "/about" },
                { text: "Our Services", href: "/services" },
                { text: "Fleet", href: "/fleet" },
                { text: "Tour Packages", href: "/packages" },
                { text: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.text}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Our Services</h3>
            <ul className="space-y-2">
              {[
                "Airport Transfer",
                "Outstation Trips",
                "Local Travel",
                "Hourly Rental",
                "Corporate Travel",
              ].map((service) => (
                <li key={service}>
                  <Link 
                    href={`/services/${service.toLowerCase().replace(" ", "-")}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">+91 1234567890</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">info@taximysore.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <span className="text-muted-foreground">
                  123 Main Street, Mysuru, Karnataka 570001
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Taxi Mysore. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link 
                href="/privacy-policy"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Terms of Service
              </Link>
              <Link 
                href="/sitemap"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 