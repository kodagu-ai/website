/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // The coffee page became the generic Insights hub.
      { source: "/coffee", destination: "/insights", permanent: true },
      // The walk page was briefly at /shakti; canonical URL is now /shakthi.
      { source: "/shakti", destination: "/shakthi", permanent: true },
    ];
  },
  async rewrites() {
    return [
      // Serve the self-contained Kodagu Sankalpa page (public/sankalpa/index.html)
      // at the clean /sankalpa URL. It's a standalone sub-brand page, so it
      // bypasses the app's shared Header/Footer entirely.
      { source: "/sankalpa", destination: "/sankalpa/index.html" },
      // Kodagu Shakthi Nadappu — the annual walk. Same standalone-page pattern.
      { source: "/shakthi", destination: "/shakthi/index.html" },
    ];
  },
};

export default nextConfig;
