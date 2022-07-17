/** @type {import('next').NextConfig} */
// import remarkExtendecTable from 'remark-extended-table';
import remarkGfm from 'remark-gfm';
import remarkPrism from 'remark-prism';
import nextMdx from '@next/mdx';
import path from 'path';
import remarkMdxImages from 'remark-mdx-images';

const withMDX = nextMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkPrism,
      // require('remark-mdx-images'),
      remarkGfm,
      remarkMdxImages,
      // remarkExtendecTable,
    ],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    providerImportSource: '@mdx-js/react',
  },
});

const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  webpack: (config, options) => {
    config.resolveLoader.alias['myloader'] = path.resolve('./myloader');

    config.module.rules.push({
      test: /\.md/,
      use: [
        {
          loader: 'myloader',
        },
      ],
    });

    return config;
  },
};

export default withMDX(nextConfig);
