"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Car, MapPin, Clock, Users, CreditCard, Banknote } from "lucide-react";
import { formatPrice } from "@/lib/price-calculator";

const PAYMENT_PERCENTAGES = [
  { value: "0", label: "0%" },
  { value: "25", label: "25%" },
  { value: "50", label: "50%" },
  { value: "100", label: "100%" },
];

export default function PaymentPage() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentPercentage, setPaymentPercentage] = useState("100");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
  });

  useEffect(() => {
    // Get booking data from localStorage
    const storedData = localStorage.getItem("bookingData");
    if (!storedData) {
      router.push("/"); // Redirect to home if no booking data
      return;
    }
    setBookingData(JSON.parse(storedData));
  }, [router]);

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Calculate payment amount based on percentage
    const paymentAmount = (bookingData.finalPrice * parseInt(paymentPercentage)) / 100;
    const remainingAmount = bookingData.finalPrice - paymentAmount;

    // Update booking data with payment details
    const updatedData = {
      ...bookingData,
      payment: {
        method: paymentMethod,
        percentage: paymentPercentage,
        amount: paymentAmount,
        remainingAmount,
        cardDetails: paymentMethod === "card" ? cardDetails : null,
      }
    };
    localStorage.setItem("bookingData", JSON.stringify(updatedData));
    router.push("/booking/confirmation");
  };

  if (!bookingData) {
    return null; // or loading state
  }

  const paymentAmount = (bookingData.finalPrice * parseInt(paymentPercentage)) / 100;
  const remainingAmount = bookingData.finalPrice - paymentAmount;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Mobile Booking Summary - Only visible on small screens */}
        <div className="md:hidden mb-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">From</p>
                    <p className="font-medium text-sm">{bookingData.pickup}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">To</p>
                    <p className="font-medium text-sm">{bookingData.dropoff}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date & Time</p>
                    <p className="font-medium text-sm">
                      {new Date(bookingData.date).toLocaleDateString()} at {bookingData.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Passengers</p>
                    <p className="font-medium text-sm">{bookingData.passengers}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Selected Vehicle</p>
                    <p className="font-medium text-sm">{bookingData.selectedVehicle.name}</p>
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-sm">Total Amount</p>
                    <p className="text-lg font-bold text-primary">
                      {formatPrice(bookingData.finalPrice)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
          {/* Desktop Booking Summary - Hidden on mobile */}
          <div className="hidden md:block md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">From</p>
                      <p className="font-medium">{bookingData.pickup}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">To</p>
                      <p className="font-medium">{bookingData.dropoff}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date & Time</p>
                      <p className="font-medium">
                        {new Date(bookingData.date).toLocaleDateString()} at {bookingData.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Passengers</p>
                      <p className="font-medium">{bookingData.passengers}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Selected Vehicle</p>
                      <p className="font-medium">{bookingData.selectedVehicle.name}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">Total Amount</p>
                      <p className="text-xl font-bold text-primary">
                        {formatPrice(bookingData.finalPrice)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.back()}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Personal Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <Label>Payment Method</Label>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      <div>
                        <RadioGroupItem
                          value="card"
                          id="card"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="card"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <CreditCard className="mb-3 h-6 w-6" />
                          <span>Credit/Debit Card</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem
                          value="cash"
                          id="cash"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="cash"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Banknote className="mb-3 h-6 w-6" />
                          <span>Cash</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-4">
                    <Label>Payment Percentage</Label>
                    <RadioGroup
                      value={paymentPercentage}
                      onValueChange={setPaymentPercentage}
                      className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                    >
                      {PAYMENT_PERCENTAGES.map((option) => (
                        <div key={option.value}>
                          <RadioGroupItem
                            value={option.value}
                            id={option.value}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={option.value}
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <span className="text-lg font-medium">{option.label}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            value={cardDetails.cardNumber}
                            onChange={handleCardInputChange}
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="name">Name on Card</Label>
                          <Input
                            id="name"
                            name="name"
                            value={cardDetails.name}
                            onChange={handleCardInputChange}
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            value={cardDetails.expiryDate}
                            onChange={handleCardInputChange}
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            value={cardDetails.cvv}
                            onChange={handleCardInputChange}
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">Payment Amount</p>
                      <p className="text-lg font-bold text-primary">
                        {formatPrice(paymentAmount)}
                      </p>
                    </div>
                    {paymentPercentage !== "100" && (
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">Remaining Amount</p>
                        <p className="text-lg font-bold text-primary">
                          {formatPrice(remainingAmount)}
                        </p>
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Complete Booking
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 