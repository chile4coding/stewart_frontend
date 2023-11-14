require("dotenv").config()
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    NEXT_PUBLIC_MONI_API_KEY: process.env.NEXT_PUBLIC_MONI_API_KEY,
    NEXT_PUBLIC_contractCode: process.env.NEXT_PUBLIC_contractCode
    // Add more variables as needed
  },
};

module.exports = nextConfig;
