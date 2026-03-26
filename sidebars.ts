import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'category',
      label: 'Getting Started',
      items: ['intro', 'getting-started'],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/auth',
        'api/users',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'architecture/overview',
        {
          type: 'category',
          label: 'Database Schema',
          items: [
            'architecture/database/overview',
            'architecture/database/users',
            'architecture/database/employees',
            'architecture/database/vacancies',
            'architecture/database/candidates',
            'architecture/database/migrations',
          ],
        },
        'architecture/security',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/hr-guide',
        'guides/employee-guide',
        'guides/deployment',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      items: [
        'development/git-workflow',
      ],
    },
  ],
};

export default sidebars;