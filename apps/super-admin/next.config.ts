import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@evdance/types', '@evdance/validation'],
};
export default nextConfig;
