import React, { useState } from 'react';
import Layout from '@theme/Layout';
import styles from './integrations.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';

interface Reporter {
  name: string;
  description: string;
  image?: string;
  source: 'official' | 'built-in' | 'community';
  language: string;
  type: 'reporter' | 'plugin';
  githubUrl: string;
  category?: 'CI' | 'Messaging' | 'AI' | 'Platform' | 'Utility';
}

const OfficialTag = () => (
  <span className={`${styles.tag} ${styles.officialTag}`}>
    Official
  </span>
);

const BuiltInTag = () => (
  <span className={`${styles.tag} ${styles.builtInTag}`}>
    Built-in
  </span>
);

const CommunityTag = () => (
  <span className={`${styles.tag} ${styles.communityTag}`}>
    Community
  </span>
);

const ReporterCard: React.FC<Reporter> = React.memo(({ name, description, image, source, language, type, githubUrl, category }) => {
  const hasDarkVersion = ['github', 'cypress', 'openai', 'anthropic', 'openrouter'];
  
  const baseImage = useBaseUrl(image || '/img/no-image.svg');
  const darkImagePath = image && hasDarkVersion.some(name => image.includes(name))
    ? image.replace('.svg', '-dark.svg')
    : image || '/img/no-image.svg';
  const darkImage = useBaseUrl(darkImagePath);

  return (
    <div className={styles.card}>
      <ThemedImage
        sources={{
          light: baseImage,
          dark: darkImage
        }}
        alt={name} 
        className={styles.cardImage} 
      />
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3>{name}</h3>
          <div className={styles.tags}>
            {source === 'official' && <OfficialTag />}
            {source === 'built-in' && <BuiltInTag />}
            {source === 'community' && <CommunityTag />}
          </div>
        </div>
        <p className={styles.description}>{description}</p>
        <div className={styles.cardFooter}>
          <a 
            href={githubUrl} 
            className={styles.githubButton} 
            target="_blank" 
            rel="noopener noreferrer"
            title="View on GitHub"
            aria-label="View on GitHub"
          >
            <svg height="20" viewBox="0 0 16 16" width="20" className={styles.githubIcon}>
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
});

ReporterCard.displayName = 'ReporterCard';

const ReportersPage: React.FC = () => {
  const [filters, setFilters] = useState({
    languages: new Set<string>(),
    types: new Set<string>(),
    sources: new Set<string>(),
    categories: new Set<string>(),
    showAll: true,
  });

  const reporters: Reporter[] = [
    {
      name: 'Jest Reporter',
      description: 'Jest is a delightful JavaScript Testing Framework with a focus on simplicity.',
      image: '/img/jest.svg',
      source: 'official',
      language: 'JavaScript',
      type: 'reporter',
      githubUrl: 'https://github.com/ctrf-io/jest-ctrf-json-reporter',
    },
    {
      name: 'Playwright Reporter',
      description: 'Playwright enables reliable end-to-end testing for modern web apps.',
      image: '/img/playwright.svg',
      source: 'official',
      language: 'JavaScript',
      type: 'reporter',
      githubUrl: 'https://github.com/ctrf-io/playwright-ctrf-json-report',
    },
    {
      name: 'Cypress Reporter',
      description: 'With Cypress, you can easily create tests for your modern web applications, debug them visually, and automatically run them in your continuous integration builds.',
      image: '/img/cypress.svg',
      source: 'official',
      language: 'JavaScript',
      type: 'reporter',
      githubUrl: 'https://github.com/ctrf-io/cypress-ctrf-json-reporter',
    },
    {
      name: 'WebdriverIO Reporter',
      description: 'Next-gen browser and mobile automation test framework for Node.js.',
      image: '/img/wdio.svg',
      source: 'official',
      language: 'JavaScript',
      type: 'reporter',
      githubUrl: 'https://github.com/ctrf-io/wdio-ctrf-json-reporter',
    },
    {
      name: 'Go Test Reporter',
      description: 'Build simple, secure, scalable systems with Go',
      image: '/img/go.svg',
      source: 'official',
      language: 'Go',
      type: 'reporter',
      githubUrl: 'https://github.com/ctrf-io/go-ctrf-json-reporter',
    },
    {
      name: 'Postman Newman Reporter',
      description: 'Newman is a command-line tool for running Postman Collections',
      image: '/img/postman.svg',
      source: 'official',
      language: 'JavaScript',
      type: 'reporter',
      githubUrl: 'https://github.com/ctrf-io/newman-reporter-ctrf-json',
    },
    {
      name: 'Mocha Reporter',
      description: 'Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun.',
      image: '/img/mochajs.svg',
      source: 'official',
      language: 'JavaScript',
      type: 'reporter',
      githubUrl: 'https://github.com/ctrf-io/mocha-ctrf-json-reporter',
    },
    {
      name: '.NET Reporter',
      description: '.NET is the free, open-source, cross-platform framework for building modern apps and powerful cloud services.',
      image: '/img/dotnet.svg',
      source: 'official',
      language: 'C#',
      type: 'reporter',
      githubUrl: 'https://github.com/ctrf-io/dotnet-ctrf-json-reporter',
    },
    {
      name: 'MSTest Reporter',
      description: 'Microsoft Testing Framework is a test framework for .NET applications.',
      image: '/img/dotnet.svg',
      source: 'official',
      language: 'C#',
      type: 'reporter',
      githubUrl: 'https://github.com/ctrf-io/dotnet-ctrf-json-reporter',
    },
    {
      name: 'Nunit Reporter',
      description: 'NUnit is a unit-testing framework for all .NET languages.',
      image: '/img/dotnet.svg',
      source: 'official',
      language: 'C#',
      type: 'reporter',
      githubUrl: 'https://github.com/ctrf-io/dotnet-ctrf-json-reporter',
    },
    {
      name: 'xUnit Reporter',
      description: 'xUnit.net is a free, open source, community-focused unit testing tool for the .NET Framework.',
      image: '/img/xunit.svg',
      source: 'built-in',
      language: 'C#',
      type: 'reporter',
      githubUrl: 'https://github.com/xunit/xunit',
    },
    {
      name: 'Nightwatch Reporter',
      description: 'No-compromise test automation framework with a powerful set of tools to write, run and debug your tests across web and native mobile applications.',
      image: '/img/nightwatch.svg',
      source: 'official',
      language: 'JavaScript',
      type: 'reporter',
      githubUrl: 'https://github.com/ctrf-io/nightwatch-ctrf-json-reporter',
    },
    {
      name: 'JUnit Reporter',
      description: 'Programmer-friendly testing framework for Java and the JVM',
      image: '/img/junit.svg',
      source: 'community',
      language: 'Java',
      type: 'reporter',
      githubUrl: 'https://github.com/alexshamrai/junit-ctrf-extension',
    },
    {
      name: 'Selenium Reporter',
      description: 'Selenium automates browsers. That\'s it!',
      image: '/img/selenium.svg',
      source: 'official',
      language: 'Java',
      type: 'reporter',
      githubUrl: 'https://github.com/orgs/ctrf-io/repositories',
    },
    {
      name: 'CodeceptJS Reporter',
      description: 'Supercharged End 2 End Testing',
      image: '/img/codeceptjs.svg',
      source: 'official',
      language: 'JavaScript',
      type: 'reporter',
      githubUrl: 'https://github.com/ctrf-io/codeceptjs-ctrf-json-reporter',
    },
    {
      name: 'Jasmine Reporter',
      description: 'Behavior Driven Development testing framework for JavaScript.',
      image: '/img/jasmine.svg',
      source: 'official',
      language: 'JavaScript',
      type: 'reporter',
      githubUrl: 'https://github.com/ctrf-io/jasmine-ctrf-json-reporter',
    },
    {
      name: 'Pytest Reporter',
      description: 'The pytest framework makes it easy to write small, readable tests, and can scale to support complex functional testing for applications and libraries.',
      image: '/img/pytest.svg',
      source: 'community',
      language: 'Python',
      type: 'reporter',
      githubUrl: 'https://github.com/infopulse/pytest-common-test-report-json',
    },
    {
      name: 'RSpec Reporter',
      description: 'Behaviour Driven Development for Ruby. Making TDD Productive and Fun.',
      image: '/img/rspec.svg',
      source: 'community',
      language: 'Ruby',
      type: 'reporter',
      githubUrl: 'https://github.com/dusc-dev/rspec-ctrf',
    }, 
    {
      name: 'Cucumber Ruby Reporter',
      description: 'Cucumber Ruby lets you write automated tests in plain language',
      image: '/img/cucumber.svg',
      source: 'community',
      language: 'Ruby',
      type: 'reporter',
      githubUrl: 'https://github.com/dusc-dev/cucumber-ctrf',
    },
    {
      name: 'Vitest Reporter',
      description: 'Next Generation Testing Framework',
      image: '/img/vitest.svg',
      source: 'community',
      language: 'JavaScript',
      type: 'reporter',
      githubUrl: 'https://github.com/avinyaweb/vitest-ctrf-json-reporter',
    },
    // Plugins
    {
      name: 'GitHub Plugin',
      description: 'Build and ship software on a single, collaborative platform',
      image: '/img/github.svg',
      source: 'official',
      language: 'JavaScript',
      type: 'plugin',
      githubUrl: 'https://github.com/ctrf-io/github-test-reporter',
      category: 'CI'
    },
    {
      name: 'Slack Plugin',
      description: 'Slack is a new way to communicate with your team',
      image: '/img/slack.svg',
      source: 'official',
      language: 'JavaScript',
      type: 'plugin',
      githubUrl: 'https://github.com/ctrf-io/slack-test-reporter',
      category: 'Messaging'
    },
    {
      name: 'Microsoft Teams Plugin',
      description: 'Connect and collaborate with Teams, the smart place to work—at home, in the office, and on-the-go.',
      image: '/img/teams.svg',
      source: 'official',
      language: 'JavaScript',
      type: 'plugin',
      githubUrl: 'https://github.com/ctrf-io/microsoft-teams-test-reporter',
      category: 'Messaging'
    },
    {
      name: 'Jenkins Plugin',
      description: 'The leading open source automation server, Jenkins provides hundreds of plugins to support building, deploying and automating any project.',
      image: '/img/jenkins.svg',
      source: 'official',
      language: 'Java',
      type: 'plugin',
      githubUrl: 'https://github.com/jenkinsci/ctrf-json-plugin',
      category: 'CI'
    },
    {
      name: 'Mattermost Plugin',
      description: 'Collaboration for Mission-Critical Work.',
      image: '/img/mattermost.svg',
      source: 'official',
      language: 'JavaScript',
      type: 'plugin',
      githubUrl: 'https://github.com/ctrf-io/mattermost-test-reporter',
      category: 'Messaging'
    },
    {
      name: 'Katalon Studio Plugin',
      description: 'Katalon is the all-in-one test automation platform for easy web, mobile, API, and desktop app testing.',
      image: '/img/katalon.svg',
      source: 'built-in',
      language: 'JavaScript',
      type: 'plugin',
      githubUrl: 'https://github.com/katalon-studio/katalon-studio-ctrf-report-plugin',
      category: 'Platform'
    },
    {
      name: 'OpenAI Plugin',
      description: 'OpenAI is an AI research and deployment company.',
      image: '/img/openai.svg',
      source: 'official',
      language: 'None',
      type: 'plugin',
      githubUrl: 'https://github.com/ctrf-io/ai-test-reporter',
      category: 'AI'
    },
    {
      name: 'Anthropic Plugin',
      description: 'Anthropic is an AI safety and research company that\'s working to build reliable, interpretable, and steerable AI systems.',
      image: '/img/anthropic.svg',
      source: 'official',
      language: 'JavaScript',
      type: 'plugin',
      githubUrl: 'https://github.com/ctrf-io/ai-test-reporter',
      category: 'AI'
    },
    {
      name: 'Azure OpenAI Plugin',
      description: 'Azure OpenAI Service offers industry-leading coding and language AI models that you can fine-tune to your specific needs for a variety of use cases.',
      image: '/img/azure.svg',
      source: 'official',
      language: 'JavaScript',
      type: 'plugin',
      githubUrl: 'https://github.com/ctrf-io/ai-test-reporter',
      category: 'AI'
    },
    {
      name: 'Jira Plugin',
      description: 'The only project management tool you need to plan and track work across every team.',
      image: '/img/jira.svg',
      source: 'official',
      language: 'JavaScript',
      type: 'plugin',
      githubUrl: 'https://github.com/ctrf-io/jira-test-reporter',
      category: 'Utility'
    },
    {
      name: 'DeepSeek Plugin',
      description: 'DeepSeek, unravel the mystery of AGI with curiosity. Answer the essential question with long-termism.',
      image: '/img/deepseek.svg',
      source: 'official',
      language: 'JavaScript',
      type: 'plugin',
      githubUrl: 'https://github.com/ctrf-io/ai-test-reporter',
      category: 'AI'
    },
    {
      name: 'Perplexity Plugin',
      description: 'Perplexity is a free AI-powered answer engine that provides accurate, trusted, and real-time answers to any question.',
      image: '/img/perplexity.svg',
      source: 'official',
      language: 'JavaScript',
      type: 'plugin',
      githubUrl: 'https://github.com/ctrf-io/ai-test-reporter',
      category: 'AI'
    },
    {
      name: 'Mistral Plugin',
      description: 'Mistral AI is the world\'s greenest and leading independent AI lab',
      image: '/img/mistral.svg',
      source: 'official',
      language: 'JavaScript',
      type: 'plugin',
      githubUrl: 'https://github.com/ctrf-io/ai-test-reporter',
      category: 'AI'
    },
    {
      name: 'Gemini Plugin',
      description: 'Get help with writing, planning, learning, and more from Google AI.',
      image: '/img/gemini.svg',
      source: 'official',
      language: 'JavaScript',
      type: 'plugin',
      githubUrl: 'https://github.com/ctrf-io/ai-test-reporter',
      category: 'AI'
    },
    {
      name: 'OpenRouter Plugin',
      description: 'A unified interface for LLMs',
      image: '/img/openrouter.svg',
      source: 'official',
      language: 'JavaScript',
      type: 'plugin',
      githubUrl: 'https://github.com/ctrf-io/ai-test-reporter',
      category: 'AI'
    },
    {
      name: 'CTRF Utility',
      description: 'Various CTRF utilities available programatically and by command line',
      source: 'official',
      language: 'JavaScript',
      type: 'plugin',
      githubUrl: 'https://github.com/ctrf-io/ctrf-cli',
      category: 'Utility'
    },
    {
      name: 'Junit Converter',
      description: 'Convert JUnit reports to CTRF reports',
      image: '/img/junit.svg',
      source: 'official',
      language: 'Java',
      type: 'plugin',
      githubUrl: 'https://github.com/ctrf-io/junit-to-ctrf',
      category: 'Utility'
    },
    {
      name: 'Cotton',
      description: 'Cotton is a markdown-formatted API specification runner. Cotton promotes the readability and understandability of API specification.',
      source: 'built-in',
      language: 'JavaScript',
      type: 'reporter',
      githubUrl: 'https://github.com/chonla/cotton',
    }
    
  ];

  const handleFilterChange = React.useCallback(
    (filterType: 'languages' | 'types' | 'sources' | 'categories', value: string) => {
      setFilters(prev => {
        const newSet = new Set(prev[filterType]);
        if (newSet.has(value)) {
          newSet.delete(value);
        } else {
          newSet.add(value);
        }
        return { 
          ...prev, 
          [filterType]: newSet,
          showAll: false 
        };
      });
    },
    []
  );

  const handleShowAll = React.useCallback(() => {
    setFilters({
      languages: new Set<string>(),
      types: new Set<string>(),
      sources: new Set<string>(),
      categories: new Set<string>(),
      showAll: true,
    });
  }, []);

  const filteredReporters = React.useMemo(() => 
    reporters.filter(reporter => {
      if (filters.showAll) return true;
      
      if (filters.languages.size > 0 && !filters.languages.has(reporter.language)) return false;
      if (filters.types.size > 0 && !filters.types.has(reporter.type)) return false;
      if (filters.sources.size > 0 && !filters.sources.has(reporter.source)) return false;
      if (filters.categories.size > 0) {
        if (reporter.type === 'plugin') {
          if (!reporter.category || !filters.categories.has(reporter.category)) return false;
        } else {
          return false;
        }
      }
      return true;
    }),
    [filters]
  );

  return (
    <Layout title="CTRF Reporters">
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <div className={styles.filterSection}>
            <h3>Filters</h3>
            <div className={styles.filterGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={filters.showAll}
                  onChange={handleShowAll}
                />
                <span>Show All</span>
              </label>
            </div>
            
            <div className={styles.filterGroup}>
              <h4>Type</h4>
              {[
                { value: 'reporter', label: 'Reporter' },
                { value: 'plugin', label: 'Plugin' }
              ].map(({ value, label }) => (
                <label key={value} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={filters.types.has(value)}
                    onChange={() => handleFilterChange('types', value)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>


            <div className={styles.filterGroup}>
              <h4>Category</h4>
              {[
                { value: 'CI', label: 'CI' },
                { value: 'Messaging', label: 'Messaging' },
                { value: 'AI', label: 'AI' },
                { value: 'Utility', label: 'Utility' },
                { value: 'Platform', label: 'Platform' }
              ].map(({ value, label }) => (
                <label key={value} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={filters.categories.has(value)}
                    onChange={() => handleFilterChange('categories', value)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>

            <div className={styles.filterGroup}>
              <h4>Language</h4>
              {['JavaScript', 'Python', 'Java', 'C#', 'Go', 'Ruby'].map(language => (
                <label key={language} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={filters.languages.has(language)}
                    onChange={() => handleFilterChange('languages', language)}
                  />
                  <span>{language}</span>
                </label>
              ))}
            </div>

            <div className={styles.filterGroup}>
              <h4>Source</h4>
              {[
                { value: 'official', label: 'Official' },
                { value: 'built-in', label: 'Built-in' },
                { value: 'community', label: 'Community' }
              ].map(({ value, label }) => (
                <label key={value} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={filters.sources.has(value)}
                    onChange={() => handleFilterChange('sources', value)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>

          </div>
        </aside>

        <main className={styles.content}>
          <div className={styles.grid}>
            {filteredReporters.map((reporter, index) => (
              <ReporterCard key={index} {...reporter} />
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default ReportersPage;
  