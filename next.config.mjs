/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      loader: 'custom',
      loaderFile: './myLoader.ts',
    },
  }

export default nextConfig;
