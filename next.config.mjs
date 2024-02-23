const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    assetPrefix: isProd ? undefined : './',
};

export default nextConfig;
