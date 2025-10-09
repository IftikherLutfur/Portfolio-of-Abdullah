import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "i.ibb.co",
      "avatars.githubusercontent.com",
      "download.logo.wine",
      "repository-images.githubusercontent.com",
      "upload.wikimedia.org",
      "encrypted-tbn0.gstatic.com",
      "images.unsplash.com"
    ]
  }
};

export default nextConfig;
