/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // The coffee page became the generic Insights hub.
      { source: "/coffee", destination: "/insights", permanent: true },
    ];
  },
  async rewrites() {
    return [
      // Serve the self-contained Kodagu Sankalpa page (public/sankalpa/index.html)
      // at the clean /sankalpa URL. It's a standalone sub-brand page, so it
      // bypasses the app's shared Header/Footer entirely.
      { source: "/sankalpa", destination: "/sankalpa/index.html" },
    ];
  },
};

export default nextConfig;
