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
    title: 'Consistency',
    Svg: require('@site/static/img/hammer.svg').default,
    description: (
      <>
        The same JSON structure no matter the test framework.
      </>
    ),
  },
  {
    title: 'Developer Tooling',
    Svg: require('@site/static/img/globe.svg').default,
    description: (
      <>
        A wide variety of plugins for integration with developer tools.
      </>
    ),
  },
  {
    title: 'Open Source',
    Svg: require('@site/static/img/cog.svg').default,
    description: (
      <>
        Created by the community, open-source, licensed under MIT, with millions of user downloads
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

export default function Features(): JSX.Element {
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
