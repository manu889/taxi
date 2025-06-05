interface PriceCalculationParams {
  packageId: number;
  distance?: number;
  hours?: number;
  passengers?: number;
  isRoundTrip?: boolean;
  extraServices?: string[];
}

interface Package {
  id: number;
  basePrice: number;
  pricePerKm: number;
  minHours: number;
  pricePerHour?: number;
  pricePerPassenger?: number;
}

export const calculatePrice = ({
  packageId,
  distance = 0,
  hours = 0,
  passengers = 1,
  isRoundTrip = false,
  extraServices = []
}: PriceCalculationParams): number => {
  // Get package details from localStorage
  const packageData = localStorage.getItem('selectedPackage');
  if (!packageData) return 0;
  
  const pkg: Package = JSON.parse(packageData);
  
  let totalPrice = pkg.basePrice;

  // Calculate distance-based price
  if (distance > 0) {
    totalPrice += distance * pkg.pricePerKm;
  }

  // Calculate time-based price
  if (hours > 0) {
    const effectiveHours = Math.max(hours, pkg.minHours);
    if (pkg.pricePerHour) {
      totalPrice += effectiveHours * pkg.pricePerHour;
    }
  }

  // Add passenger surcharge if applicable
  if (pkg.pricePerPassenger && passengers > 1) {
    totalPrice += (passengers - 1) * pkg.pricePerPassenger;
  }

  // Apply round trip discount or surcharge
  if (isRoundTrip) {
    // 10% discount for round trips
    totalPrice = totalPrice * 1.8; // 2x for return + 10% discount
  }

  // Add extra services
  extraServices.forEach(service => {
    switch (service) {
      case 'driver':
        totalPrice += 500; // Driver allowance
        break;
      case 'waiting':
        totalPrice += 200; // Waiting time per hour
        break;
      case 'night':
        totalPrice += 1000; // Night journey surcharge
        break;
      // Add more services as needed
    }
  });

  return Math.round(totalPrice);
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
}; 