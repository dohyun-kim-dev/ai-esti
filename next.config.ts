import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
      fileName: true,
      meaninglessFileNames: ["index"],
      pure: true,
      transpileTemplateLiterals: true,
      topLevelImportPaths: ["styled-components"],
    },
  },
  // Add webpack config to optimize bundle size
  webpack: (config, { dev, isServer }) => {
    // Production optimizations only
    if (!dev && !isServer) {
      // Enable tree shaking for MUI icons
      config.resolve.alias = {
        ...config.resolve.alias,
        '@mui/icons-material': '@mui/icons-material/esm',
      };
    }
    return config;
  },
};

export default nextConfig;