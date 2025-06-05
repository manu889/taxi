# Taxi Mysore 🚕

A specialized web application for taxi and tour package advance bookings in Mysuru, Karnataka, India.

## 🎯 Project Overview

Taxi Mysore is a comprehensive booking platform specializing in:
- Outstation Trips
- Hourly Rentals
- Curated Taxi Tour Packages
- Corporate Bookings

## 🏗️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **State Management:** React Query + Zustand
- **Authentication:** NextAuth.js
- **Maps:** Google Maps Platform
- **UI Components:** Shadcn/ui
- **Deployment:** Vercel

### Backend
- **Framework:** NestJS
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Caching:** Redis
- **Queue:** BullMQ
- **Authentication:** JWT
- **Payment:** Razorpay/Stripe
- **Deployment:** Railway/Render

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- PostgreSQL >= 15
- Redis >= 7
- pnpm (recommended) or npm

### Development Setup

1. Clone the repository:
```bash
git clone https://github.com/your-org/taxi-mysore.git
cd taxi-mysore
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
# Copy example env files
cp apps/web/.env.example apps/web/.env
cp apps/api/.env.example apps/api/.env
```

4. Start development servers:
```bash
pnpm dev
```

## 📁 Project Structure

```
taxi-mysore/
├── apps/
│   ├── web/                 # Next.js frontend
│   └── api/                 # NestJS backend
├── packages/
│   ├── database/           # Prisma schema and migrations
│   ├── shared-types/       # Shared TypeScript types
│   └── ui/                 # Shared UI components
├── package.json
└── turbo.json
```

## 🔐 Environment Variables

### Frontend (.env)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_MAPS_API_KEY=your-key
```

### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/taxi_mysore"
REDIS_URL="redis://localhost:6379"
JWT_SECRET=your-secret
RAZORPAY_KEY_ID=your-key
RAZORPAY_KEY_SECRET=your-secret
```

## 📝 License

This project is proprietary and confidential.

## 🤝 Contributing

Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests. 