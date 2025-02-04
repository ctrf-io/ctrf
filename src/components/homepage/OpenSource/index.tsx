import clsx from 'clsx';
import styles from './styles.module.css';

type ToolingItem = {
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  name: string;
};

function Tooling({ Svg, name }: ToolingItem) {
  return (
    <div className={clsx('col col--2', styles.toolingItem)}>
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
    <p>CTRF tooling is free and open source </p>
    </div>
  </section>
  </div>
  
  );
}
