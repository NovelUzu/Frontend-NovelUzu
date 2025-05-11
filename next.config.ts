/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // para exportar como HTML estático
  images: {
    unoptimized: true,
  },
  trailingSlash: true, // importante para GitHub Pages
  basePath: '/NovelUzu',
  assetPrefix: '/NovelUzu',
};

module.exports = nextConfig;
