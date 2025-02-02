/** @type {import('next').NextConfig} */
import nextMDX from '@next/mdx'
import remarkFrontmatter from 'remark-frontmatter'

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter],
    rehypePlugins: []
  }
})

const nextConfig = withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    mdxRs: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
});

export default nextConfig;
