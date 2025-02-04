// import clsx from 'clsx';
// import Heading from '@theme/Heading';
// import styles from './styles.module.css';
// import CodeBlock from '@theme/CodeBlock'

// type FeatureItem = {
//   title: string;
//   Svg: React.ComponentType<React.ComponentProps<'svg'>>;
//   description: JSX.Element;
// };

// const FeatureList: FeatureItem[] = [
//   {
//     title: 'Common Report',
//     Svg: require('@site/static/img/hammer.svg').default,
//     description: (
//       <>
//         The same JSON structure no matter the test framework.
//       </>
//     ),
//   },
//   {
//     title: 'Developer Tooling',
//     Svg: require('@site/static/img/globe.svg').default,
//     description: (
//       <>
//         A wide variety of plugins for integration with developer tools.
//       </>
//     ),
//   },
//   {
//     title: 'Open Source',
//     Svg: require('@site/static/img/cog.svg').default,
//     description: (
//       <>
//         Created by the community, open-source, MIT license and millions of downloads
//       </>
//     ),
//   },
// ];

// function Code({ title, Svg, description }: FeatureItem) {
//   return (
//     <div className={clsx('col col--4')}>


//       <div className="card-demo item shadow--md text--center">
//         <div className="card">
//           <div className="card__header text--bold">
//             <Heading as="h3">{title}</Heading>
//           </div>
//           <div className="card__body">
//             <p>{description}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function CodeSection(): JSX.Element {
//   return (
//     <section className={styles.features}>
//       <div className="container">
//         <div className="row">
//             <CodeBlock language='js'children='console.log("hello world!")'></CodeBlock>
//           {FeatureList.map((props, idx) => (
//             <Code key={idx} {...props} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// src/pages/index.js

import React from 'react';
import Layout from '@theme/Layout';

export default function Code() {
  return (
    <Layout
      title="Home"
      description="A simple responsive grid test for Docusaurus"
    >
      <main>
        {/* Container gives us some horizontal padding */}
        <div className="container margin-top--xl margin-bottom--xl">

          <h2 style={{ textAlign: 'center' }}>Responsive Grid Example</h2>

          <div className="row">
            {/* Each column is full-width on small screens (col--12),
                half-width on medium (col--md-6),
                and one-third on large (col--lg-4). */}
            <div className="col col--12 col--md-6 col--lg-4">
              <div
                style={{
                  backgroundColor: 'lightblue',
                  padding: '1rem',
                  textAlign: 'center',
                }}
              >
                Column 1
              </div>
            </div>

            <div className="col col--12 col--md-6 col--lg-4">
              <div
                style={{
                  backgroundColor: 'lightgreen',
                  padding: '1rem',
                  textAlign: 'center',
                }}
              >
                Column 2
              </div>
            </div>

            <div className="col col--12 col--md-6 col--lg-4">
              <div
                style={{
                  backgroundColor: 'lightcoral',
                  padding: '1rem',
                  textAlign: 'center',
                }}
              >
                Column 3
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
