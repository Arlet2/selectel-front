/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    publicRuntimeConfig: {
        VK_APP_ID: "51863397",
        VK_REDIRECT_URL: "https://petdonor.ru/vk-redirect",
    },
};

export default nextConfig;
