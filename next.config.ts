/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  staticPageGenerationTimeout: 180,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**',
      },
      // Add more domains as needed
      {
        protocol: 'https',
        hostname: 'example.com', // Your domain
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;