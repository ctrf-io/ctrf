import clsx from 'clsx';
import styles from './styles.module.css';

export default function Schema(): JSX.Element {
  return (
    <section className={clsx(styles.section, 'hero hero--light')}>
      <div className="container">
        <h2 className="text--center">Why Choose Us?</h2>
        <p className="text--center">
          Our solution is designed to simplify test reporting and enhance team collaboration.
        </p>
      </div>
    </section>
  );
}
