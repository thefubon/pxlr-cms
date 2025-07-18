import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Optional: Add other configuration
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

// Wrap MDX and Next.js config with each other
export default withMDX(nextConfig);
