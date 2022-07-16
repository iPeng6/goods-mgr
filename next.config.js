/** @type {import('next').NextConfig} */


const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require('remark-prism')],
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
    config.resolveLoader.alias['myloader'] =
      require('path').resolve('./myloader');

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

module.exports = withMDX(nextConfig);
