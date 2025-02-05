import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import clsx from 'clsx';
import styles from './styles.module.css';
const exampleReport = `
{
  "results": {
    "tool": {
      "name": "AnyTool"
    },
    "summary": {
      "tests": 1,
      "passed": 1,
      "failed": 0,
      "pending": 0,
      "skipped": 0,
      "other": 0,
      "start": 1706828654274,
      "stop": 1706828655782
    },
    "tests": [
      {
        "name": "should be able to login",
        "status": "passed",
        "duration": 801
      }
    ],
    "environment": {
      "appName": "MyApp",
      "buildName": "MyApp",
      "buildNumber": "100"
    }
  }
}
`;

const schemaExplanation = [
  {
    field: 'stats',
    description: 'Overall test execution statistics',
    children: [
      { field: 'suites', description: 'Total number of test suites executed' },
      { field: 'tests', description: 'Total number of individual tests run' },
      { field: 'passes', description: 'Number of passing tests' },
      { field: 'failures', description: 'Number of failed tests' },
      { field: 'pending', description: 'Number of skipped or pending tests' },
      { field: 'duration', description: 'Total execution time in milliseconds' },
      { field: 'start', description: 'Test execution start timestamp' },
      { field: 'end', description: 'Test execution end timestamp' },
    ],
  },
  {
    field: 'results',
    description: 'Array of test suite results',
    children: [
      { field: 'title', description: 'Name of the test suite' },
      { 
        field: 'tests', 
        description: 'Array of test results within the suite',
        children: [
          { field: 'title', description: 'Name of the individual test' },
          { field: 'status', description: 'Test result status (passed, failed, pending)' },
          { field: 'duration', description: 'Individual test execution time' },
          { field: 'error', description: 'Error message if the test failed' },
        ],
      },
    ],
  },
];

function SchemaItem({ field, description, children }) {
  return (
    <div className="schema-item margin-bottom--sm">
      <div className="schema-header">
        <code className="schema-field">{field}</code>
        <span className="schema-description">{description}</span>
      </div>
      {children && (
        <div className="schema-children margin-left--md">
          {children.map((child, idx) => (
            <SchemaItem key={idx} {...child} />
          ))}
        </div>
      )}
    </div>
  );
}

function CodeFrame({ children }) {
  return (
    <div className={styles['code-frame']}>
      <div className={styles['code-frame__header']}>
        <div className={styles['code-frame__buttons']}>
          <span className={clsx(styles['code-frame__button'], styles['code-frame__button--red'])}></span>
          <span className={clsx(styles['code-frame__button'], styles['code-frame__button--yellow'])}></span>
          <span className={clsx(styles['code-frame__button'], styles['code-frame__button--green'])}></span>
        </div>
        <div className={styles['code-frame__title']}>ctrf/ctrf-report.json</div>
      </div>
      <div className={styles['code-frame__content']}>
        {children}
      </div>
    </div>
  );
}

export default function CodeSection(): JSX.Element {
  return (
    <div className="container margin-top--xl margin-bottom--xl">
      <h1 className="text--center"> Straightforward JSON Report</h1>
      <div className="row">
        <div className="col col--6">
          <CodeFrame>
            <CodeBlock language="javascript" className="margin-bottom--xl">
              {exampleReport}
            </CodeBlock>
          </CodeFrame>
        </div>
        
        <div className="col col--6">
          <div className="schema-documentation" style={{ 
            display: 'flex', 
            flexDirection: 'column',
            height: '100%'
          }}>
            <div className="card margin-bottom--md text--center" style={{ flex: 1 }}>
              <div className="card__body">
                <h2>Simple Design</h2>
                <p>Just three essential properties required for each test - name, duration, and status, simplifying the test report while capturing crucial information.</p>
              </div>
            </div>
            <div className="card margin-bottom--md text--center" style={{ flex: 1 }}>
              <div className="card__body">
                <h2>Comprehensive Data</h2>
                <p>Beyond the essential properties, the report includes a variety of optional properties, encompassing extensive detail about the tests, tools, environment, and build.</p>
              </div>
            </div>
            <div className="card margin-bottom--md text--center" style={{ flex: 1 }}>
              <div className="card__body">
                <h2>Fully Extendable</h2>
                <p>The report is designed with extendability at its core, allowing for the addition of extra properties, catering to additional report requirements.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
