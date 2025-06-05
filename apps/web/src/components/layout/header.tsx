"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, LogIn, UserPlus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserNav } from "@/components/layout/user-nav";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-black/95 text-white backdrop-blur supports-[backdrop-filter]:bg-black/80">
      <div className="max-w-[1350px] mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 text-white font-bold text-xl">
          Taxi Mysore
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center items-center space-x-8">
          <Link href="/services" className="text-base font-medium hover:text-primary transition-colors">Services</Link>
          <Link href="/fleet" className="text-base font-medium hover:text-primary transition-colors">Fleet</Link>
          <Link href="/packages" className="text-base font-medium hover:text-primary transition-colors">Packages</Link>
          <Link href="/about" className="text-base font-medium hover:text-primary transition-colors">About</Link>
          <Link href="/contact" className="text-base font-medium hover:text-primary transition-colors">Contact</Link>
        </nav>
        {/* Right side items */}
        <div className="hidden md:flex items-center gap-4">
          {/* User Navigation */}
          <UserNav />
          {/* Support Phone */}
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            <span className="font-semibold">24/7</span>
            <a href="tel:+919876543210" className="underline hover:text-primary ml-1 whitespace-nowrap">+91 98765 43210</a>
          </div>
        </div>
        {/* Hamburger (mobile) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 ml-2"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 text-white flex flex-col">
          <div className="flex items-center justify-between h-14 px-4 border-b border-white/10">
            <Link href="/" className="flex items-center space-x-2 text-white font-bold text-xl" onClick={() => setIsMenuOpen(false)}>
              Taxi Mysore
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-6 text-lg font-medium px-8 py-8">
            <Link href="/services" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">Services</Link>
            <Link href="/fleet" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">Fleet</Link>
            <Link href="/packages" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">Packages</Link>
            <Link href="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">About</Link>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">Contact</Link>
            {/* Mobile User Navigation */}
            <div className="mt-8">
              <UserNav />
            </div>
            <div className="flex items-center gap-2 mt-8">
              <Phone className="h-5 w-5 text-primary" />
              <span className="font-semibold">24/7</span>
              <a href="tel:+919876543210" className="underline hover:text-primary ml-1 whitespace-nowrap">+91 98765 43210</a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
} 