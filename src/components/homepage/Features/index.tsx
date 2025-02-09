import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Consistency',
    description: (
      <>
        The same JSON structure no matter the test framework.
      </>
    ),
  },
  {
    title: 'Developer Tooling',
    description: (
      <>
        A wide variety of plugins for integration with developer tools.
      </>
    ),
  },
  {
    title: 'Open Source',
    description: (
      <>
        Created by the community, open-source, licensed under MIT, with millions of user downloads
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')} style={{ padding: '1rem' }}>
      <div className="card margin-bottom--lg">
        <div className="card__header">
        </div>
        <div className="card__body text--center">
          <Heading as="h2" className="text--xxl">{title}</Heading>
          <p>{description}</p>
        </div>
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
