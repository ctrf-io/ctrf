import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'CTRF: Common Test Report Format',
  tagline: 'A common JSON test automation results report',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://ctrf.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ctrf', // Usually your GitHub org/user name.
  projectName: 'ctrf', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        googleAnalytics: {
          trackingID: 'GT-5TQFGJL',
        },
        googleTagManager: {
          containerId: 'GTM-M6WNX85V',
        },
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/ctrf-io/ctrf/tree/main/',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/ctrf-io/ctrf/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/logo.png',
    navbar: {
      title: 'Common Test Report Format',
      logo: {
        alt: 'CTRF Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/ctrf-io',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Released under the MIT License. 
      <br />
      Copyright © ${new Date().getFullYear()}`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
