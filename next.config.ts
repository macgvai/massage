import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Включаем standalone режим для Docker
  output: 'standalone',
  
  // Оптимизации для продакшена
  experimental: {
    optimizePackageImports: ['@heroui/react']
  },
  
  // Настройки изображений
  images: {
    domains: ['localhost'],
    unoptimized: true
  }
};

export default nextConfig;
