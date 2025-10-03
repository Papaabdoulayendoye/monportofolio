/** @type {import('next').NextConfig} */
const nextConfig = {
output: "standalone",   
eslint: {
ignoreDuringBuilds: true,
},
typescript: {
ignoreBuildErrors: true,
},
images: {
unoptimized: true,
},
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,           // Vérifie les changements toutes les 1s
        aggregateTimeout: 300 // Délais pour réduire le spam rebuild
      }
    }
    return config
  },
}
export default nextConfig
