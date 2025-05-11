/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true, // importante para GitHub Pages
  basePath: '/NovelUzu',
  assetPrefix: '/NovelUzu',
};

module.exports = nextConfig;
