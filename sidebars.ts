import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'category',
      label: 'Backend',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Getting Started',
          items: ['backend/intro', 'backend/getting-started'],
        },
        {
          type: 'category',
          label: 'API Reference',
          items: [
            'backend/api/auth',
            'backend/api/users',
            'backend/api/swagger-decorators',
          ],
        },
        {
          type: 'category',
          label: 'Architecture',
          items: [
            'backend/architecture/overview',
            'backend/architecture/exception-handling',
            {
              type: 'category',
              label: 'Database Schema',
              items: [
                'backend/architecture/database/overview',
                'backend/architecture/database/users',
                'backend/architecture/database/employees',
                'backend/architecture/database/vacancies',
                'backend/architecture/database/candidates',
                'backend/architecture/database/migrations',
              ],
            },
            {
              type: 'category',
              label: 'RBAC System',
              items: [
                'backend/architecture/rbac/roles-overview',
                'backend/architecture/rbac/permissions-system',
                'backend/architecture/rbac/role-permission-matrix',
                'backend/architecture/rbac/scope-vs-actions',
              ],
            },
            'backend/architecture/security',
          ],
        },
        {
          type: 'category',
          label: 'Guides',
          items: [
            'backend/guides/hr-guide',
            'backend/guides/employee-guide',
            'backend/guides/deployment',
          ],
        },
        {
          type: 'category',
          label: 'Development',
          items: [
            'backend/development/git-workflow',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Frontend',
      collapsed: false,
      items: [
        'frontend/intro',
        {
          type: 'category',
          label: 'Core Modules',
          collapsed: false,
          items: [
            'frontend/auth-identity-management',
            'frontend/system-administration',
            'frontend/hr-operations',
            'frontend/employee-management-profile',
            'frontend/user-profile-self-service',
            'frontend/organization-structure-charts',
            'frontend/manager-view',
          ],
        },
        {
          type: 'category',
          label: 'Operations',
          collapsed: false,
          items: [
            'frontend/calendar-event-management',
            'frontend/task-management-collaboration',
            'frontend/notification-system-alerts',
            'frontend/recruitment-ats',
            'frontend/employee-onboarding-lifecycle',
            'frontend/absence-leave-management',
          ],
        },
        {
          type: 'category',
          label: 'System Engines',
          collapsed: false,
          items: [
            'frontend/access-control-permissions',
            'frontend/custom-fields-engine',
          ],
        },
      ],
    },
  ],
};

export default sidebars;