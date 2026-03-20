import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  emoji: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Employee Management',
    emoji: '👥',
    description: (
      <>
        Complete employee lifecycle management from hiring to offboarding.
        Track profiles, roles, departments, and employment history.
      </>
    ),
  },
  {
    title: 'Recruitment',
    emoji: '📝',
    description: (
      <>
        Streamlined hiring process with job postings, candidate tracking,
        interview scheduling, and offer management.
      </>
    ),
  },
  {
    title: 'Analytics',
    emoji: '📊',
    description: (
      <>
        Real-time dashboards and reports. Track key HR metrics,
        employee performance, and retention rates.
      </>
    ),
  },
  {
    title: 'Secure Authentication',
    emoji: '🔐',
    description: (
      <>
        Role-based access control (Admin, HR, Employee, Manager).
        JWT tokens with Argon2 password hashing.
      </>
    ),
  },
  {
    title: 'Modern Stack',
    emoji: '⚡',
    description: (
      <>
        Built with NestJS, PostgreSQL, TypeORM. Fully typed,
        scalable, and production-ready architecture.
      </>
    ),
  },
  {
    title: 'API First',
    emoji: '🚀',
    description: (
      <>
        RESTful API with Swagger documentation.
        Easy integration with any frontend framework.
      </>
    ),
  },
];

function Feature({ title, emoji, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <div className={styles.featureEmoji}>{emoji}</div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
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