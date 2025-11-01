import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/homepage/Features';
import HomepageTooling from '@site/src/components/homepage/Tooling';
// import DeveloperTools from '@site/src/components/homepage/DeveloperTools';
import HomepageCode from '../components/homepage/Code';
import Heading from '@theme/Heading';

import styles from './index.module.css';
import GitHubButton from 'react-github-btn';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading
          as="h1"
          className={styles.heroTitle}
        >
          <span style={{ color: '#45ba4b', display: 'block' }}>CTRF</span>
          Unified JSON Test Report With Seamless Developer Tool Integration
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
            to="/docs/specification/overview"
          >
            Specification
          </Link>
          <span className={styles.githubButtons}
          style={{ 
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
      
      <div style={{
        textAlign: 'center',
        padding: '2rem 0',
        fontSize: '1.2rem'
      }}>
        <div style={{ color: '#45ba4b', fontSize: '2rem' }}>💚</div>
        <h3 style={{ marginBottom: '0.3rem' }}>CTRF tooling is free and open source</h3>
        <h3 style={{ marginTop: '0.3rem' }}>You can support the project by following on GitHub</h3>
      </div>
      <HomepageFeatures />
      <HomepageTooling />

      <main>
        <HomepageCode />
        {/* <DeveloperTools /> */}
      </main>
    </Layout>
  );
}
