/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.indium.tech',
        port: '',
      },
    ],
  },
};
export default nextConfig;
