import React from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';

import ReactIcon from '@site/static/img/playwright.svg';
import VueIcon from '@site/static/img/jest.svg';
import AngularIcon from '@site/static/img/jenkins.svg';
import DevToolsIcon from '@site/static/img/github.svg';

const DeveloperTools: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.textSection}>
          <h2>Connect Any Framework to Developer Tools</h2>
          <p>CTRF seamlessly bridges your favorite frameworks with powerful developer tools</p>
        </div>
        
        <div className={styles.visualSection}>
          <div className={styles.frameworkIcons}>
            <ReactIcon className={styles.icon} />
            <VueIcon className={styles.icon} />
            <AngularIcon className={styles.icon} />
          </div>
          
          <div className={styles.arrows}>
            {/* Animated arrows will be created using CSS */}
            <div className={styles.arrow}></div>
            <div className={styles.arrow}></div>
            <div className={styles.arrow}></div>
          </div>
          
          <div className={styles.devTools}>
            <DevToolsIcon className={styles.devToolsIcon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperTools;
