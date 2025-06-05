/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@taxi-mysore/ui", "@taxi-mysore/database"],
  images: {
    domains: [
      "images.unsplash.com", // For demo images
      "lh3.googleusercontent.com", // For Google profile images
    ],
  },
  // experimental: {
  //   serverActions: true,
  // },
};

module.exports = nextConfig; 