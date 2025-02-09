import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Common Test Report Format',
  tagline: 'A JSON test report schema and integration tooling',
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
        gtag: {
          trackingID: 'G-VHP5B22KSH',
          anonymizeIP: true,
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
    metadata: [{name: 'description', content: 'A common universal JSON test report schema that provides standardized format for JSON test results reports'}],
    // Replace with your project's social card
    image: 'img/logo.png',
    announcementBar: {
      id: 'support_us',
      content:
'<b>⭐ If you like CTRF, consider following us on <a target="_blank" rel="noopener noreferrer" href="https://github.com/ctrf-io">GitHub<img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub logo" style="width: 20px; height: 20px; vertical-align: middle;"/></a></b>',
      backgroundColor: '#d1d1d1',
      textColor: '#000000',
      isCloseable: true,
    },
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
        { to: '/integrations', label: 'Integrations', position: 'left' },
        { to: '/docs/contributing/', label: 'Contribute', position: 'left'},
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/ctrf-io',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Built and maintained by <a href="https://github.com/ma11hewthomas">Matthew Thomas</a>
      <br />
      Released under the MIT License. 
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
