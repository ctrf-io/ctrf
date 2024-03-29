import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Consistency Across Tools',
    Svg: require('@site/static/img/hammer.svg').default,
    description: (
      <>
        Ensures a uniform structure, making it easier to understand and compare test reports, regardless of the testing tool used.
      </>
    ),
  },
  {
    title: 'Open Source Plugins',
    Svg: require('@site/static/img/globe.svg').default,
    description: (
      <>
        Supports a broad ecosystem with its extensive range of open source reporters and plugins.
      </>
    ),
  },
  {
    title: 'Facilitates Enhanced Programmatic Use',
    Svg: require('@site/static/img/cog.svg').default,
    description: (
      <>
        Programatic use with test results reports becomes more straightforward.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>

  );
}
