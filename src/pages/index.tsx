import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/homepage/Features';
import useBaseUrl from '@docusaurus/useBaseUrl'
import HomepageCode from '../components/homepage/Code';
import Heading from '@theme/Heading';

import styles from './index.module.css';
// import HomepageTooling from '../components/homepage/Tooling';
import GitHubButton from 'react-github-btn';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading
          as="h1"
          className={styles.heroTitle}
        >
          <span style={{ color: '#45ba4b' }}>CTRF</span> is a JSON test report
          that simplifies developer tooling integration
        </Heading>
        <div>
          <Link
            className={clsx('button button--secondary button--lg', styles.customButton)}
            to="/docs/intro"
          >
            What is CTRF?
          </Link>
          <Link
            className={clsx('button button--secondary button--lg', styles.customButton)}
            to="/docs/schema/overview"
          >
            Schema
          </Link>
          {/* <a
            className={clsx('button button--secondary button--lg', styles.customButton)}
            href="https://github.com/ctrf-io"
          >
            View on GitHub
          </a> */}
          <span style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '10px',
            marginLeft: '8px',
            height: '100%',
            verticalAlign: 'middle',
            position: 'relative',
            top: '6px',
            transform: 'scale(1.8)',
            transformOrigin: 'left center'
          }}>
            <GitHubButton href="https://github.com/ctrf-io" data-color-scheme="no-preference: light_high_contrast; light: light_high_contrast; dark: light_high_contrast;" data-size="large" data-show-countaria-label="Follow @ctrf-io on GitHub">Follow</GitHubButton>
            <GitHubButton href="https://github.com/ctrf-io/ctrf" data-color-scheme="no-preference: light_high_contrast; light: light_high_contrast; dark: light_high_contrast;" data-icon="octicon-star" data-size="large" aria-label="Star ctrf-io/ctrf on GitHub">Star</GitHubButton>
            <GitHubButton href="https://github.com/ctrf-io/ctrf/discussions" data-color-scheme="no-preference: light_high_contrast; light: light_high_contrast; dark: light_high_contrast;" data-icon="octicon-comment-discussion" data-size="large" aria-label="Discuss ctrf-io/ctrf on GitHub">Discuss</GitHubButton>
          </span>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      description="A universal standard for JSON test results report with a wide range of reporters and plugins supporting modern test automation frameworks">
      <HomepageHeader />
      <main>
        {/* <HomepageCode /> */}
        <HomepageFeatures />
        {/* <HomepageTooling /> */}
      </main>
    </Layout>
  );
}
