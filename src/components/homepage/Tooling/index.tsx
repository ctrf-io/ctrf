import clsx from 'clsx';
import styles from './styles.module.css';

type ToolingItem = {
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  name: string;
};

const FeatureList: ToolingItem[] = [
  { Svg: require('@site/static/img/playwright.svg').default, name: 'Playwright' },
  { Svg: require('@site/static/img/jest.svg').default, name: 'Jest' },
  { Svg: require('@site/static/img/cypress.svg').default, name: 'Cypress' },
  { Svg: require('@site/static/img/wdio.svg').default, name: 'WebdriverIO' },
  { Svg: require('@site/static/img/go.svg').default, name: 'Go' },
  { Svg: require('@site/static/img/postman.svg').default, name: 'Postman' },
  { Svg: require('@site/static/img/mochajs.svg').default, name: 'Mocha' },
  { Svg: require('@site/static/img/dotnet.svg').default, name: '.NET' },
  { Svg: require('@site/static/img/xunit.svg').default, name: 'xUnit' },
  { Svg: require('@site/static/img/nightwatch.svg').default, name: 'Nightwatch' },
  { Svg: require('@site/static/img/junit.svg').default, name: 'JUnit' },
  { Svg: require('@site/static/img/selenium.svg').default, name: 'Selenium' },
  { Svg: require('@site/static/img/codeceptjs.svg').default, name: 'CodeceptJS' },
  { Svg: require('@site/static/img/jasmine.svg').default, name: 'Jasmine' },
  { Svg: require('@site/static/img/pytest.svg').default, name: 'Pytest' },
  { Svg: require('@site/static/img/rspec.svg').default, name: 'RSpec' },
  { Svg: require('@site/static/img/github.svg').default, name: 'GitHub' },
  { Svg: require('@site/static/img/slack.svg').default, name: 'Slack' },
  { Svg: require('@site/static/img/teams.svg').default, name: 'Microsoft Teams' },
  { Svg: require('@site/static/img/jenkins.svg').default, name: 'Jenkins' },
  { Svg: require('@site/static/img/mattermost.svg').default, name: 'Mattermost' },
  { Svg: require('@site/static/img/openai.svg').default, name: 'OpenAI' },
  { Svg: require('@site/static/img/anthropic.svg').default, name: 'Anthropic' },
  { Svg: require('@site/static/img/jira2.svg').default, name: 'Jira' },
];


function Tooling({ Svg, name }: ToolingItem) {
  return (
    <div className={clsx(styles.toolingItem)}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
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
      <h1>Supporting your favorite frameworks and tools</h1>
      <div className={clsx('row', styles.rowBackground)}>
        {FeatureList.map((props, idx) => (
          <Tooling key={idx} {...props} />
        ))}
      </div>
    </div>
  </section>
  </div>
  );
}
