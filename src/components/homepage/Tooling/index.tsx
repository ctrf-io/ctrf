import clsx from 'clsx';
import styles from './styles.module.css';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

type ToolingItem = {
  name: string;
  image: string;
  hasDarkVersion?: boolean;
};

const FeatureList: ToolingItem[] = [
  { name: 'Playwright', image: '/img/playwright.svg' },
  { name: 'Jest', image: '/img/jest.svg' },
  { name: 'Cypress', image: '/img/cypress.svg', hasDarkVersion: true },
  { name: 'WebdriverIO', image: '/img/wdio.svg' },
  { name: 'Go', image: '/img/go.svg' },
  { name: 'Postman', image: '/img/postman.svg' },
  { name: 'Mocha', image: '/img/mochajs.svg' },
  { name: '.NET', image: '/img/dotnet.svg' },
  { name: 'xUnit', image: '/img/xunit.svg' },
  { name: 'Nightwatch', image: '/img/nightwatch.svg' },
  { name: 'JUnit', image: '/img/junit.svg' },
  { name: 'Selenium', image: '/img/selenium.svg' },
  { name: 'Vitest', image: '/img/vitest.svg' },
  { name: 'Jasmine', image: '/img/jasmine.svg' },
  { name: 'Pytest', image: '/img/pytest.svg' },
  { name: 'RSpec', image: '/img/rspec.svg' },
  { name: 'GitHub', image: '/img/github.svg', hasDarkVersion: true },
  { name: 'Slack', image: '/img/slack.svg' },
  { name: 'Microsoft Teams', image: '/img/teams.svg' },
  { name: 'Jenkins', image: '/img/jenkins.svg' },
  { name: 'Mattermost', image: '/img/mattermost.svg' },
  { name: 'OpenAI', image: '/img/openai.svg', hasDarkVersion: true },
  { name: 'Anthropic', image: '/img/anthropic.svg', hasDarkVersion: true },
  { name: 'Jira', image: '/img/jira2.svg' },
];

function Tooling({ name, image, hasDarkVersion }: ToolingItem) {
  const imagePath = image.replace('.svg', '');
  return (
    <div className={clsx(styles.toolingItem)}>
      <div className="text--center">
        {hasDarkVersion ? (
          <ThemedImage
            alt={name}
            sources={{
              light: useBaseUrl(`${imagePath}.svg`),
              dark: useBaseUrl(`${imagePath}-dark.svg`),
            }}
            className={styles.featureSvg}
            role="img"
          />
        ) : (
          <img
            src={useBaseUrl(image)}
            alt={name}
            className={styles.featureSvg}
            role="img"
          />
        )}
        <div className={styles.tooltip}>{name}</div>
      </div>
    </div>
  );
}

export default function HomepageTooling(): JSX.Element {
  return (
    <div className={styles.toolingContainer}>
      <section className={styles.features}>
        <div className="container">
          <h1 className="text--center">Supporting your favorite test frameworks and developer tools</h1>
          <div className={clsx('row', styles.toolingGrid)}>
            {FeatureList.map((props, idx) => (
              <Tooling key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
