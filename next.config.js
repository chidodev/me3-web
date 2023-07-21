/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.experiments = {
      asyncWebAssembly: true, // *NEW*
      layers: true, // *NEW*
    },
    config.resolve = {
      ...config.resolve,
      fallback: {
        "fs": false,
        "path": false,
        "os": false,
        "child_process": false,
        "http2": false,
        "net": false,
        "tls": false
      }
    }
    return config
  },
}

module.exports = nextConfig
