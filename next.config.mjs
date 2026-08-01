/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // The coffee page became the generic Insights hub.
      { source: "/coffee", destination: "/insights", permanent: true },
    ];
  },
};

export default nextConfig;
