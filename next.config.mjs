/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
      loader: 'custom',
      loaderFile: './myLoader.ts',
    },
  }

export default nextConfig;
