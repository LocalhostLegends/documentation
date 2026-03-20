import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/documentation/blog',
    component: ComponentCreator('/documentation/blog', '6e3'),
    exact: true
  },
  {
    path: '/documentation/blog/2026/03/20/project-launch',
    component: ComponentCreator('/documentation/blog/2026/03/20/project-launch', '0ec'),
    exact: true
  },
  {
    path: '/documentation/blog/archive',
    component: ComponentCreator('/documentation/blog/archive', 'f74'),
    exact: true
  },
  {
    path: '/documentation/blog/authors',
    component: ComponentCreator('/documentation/blog/authors', '6b6'),
    exact: true
  },
  {
    path: '/documentation/blog/tags',
    component: ComponentCreator('/documentation/blog/tags', 'c5d'),
    exact: true
  },
  {
    path: '/documentation/blog/tags/announcement',
    component: ComponentCreator('/documentation/blog/tags/announcement', '971'),
    exact: true
  },
  {
    path: '/documentation/blog/tags/hr-tech',
    component: ComponentCreator('/documentation/blog/tags/hr-tech', '494'),
    exact: true
  },
  {
    path: '/documentation/blog/tags/launch',
    component: ComponentCreator('/documentation/blog/tags/launch', '55c'),
    exact: true
  },
  {
    path: '/documentation/markdown-page',
    component: ComponentCreator('/documentation/markdown-page', '1c7'),
    exact: true
  },
  {
    path: '/documentation/docs',
    component: ComponentCreator('/documentation/docs', 'd9f'),
    routes: [
      {
        path: '/documentation/docs',
        component: ComponentCreator('/documentation/docs', '10b'),
        routes: [
          {
            path: '/documentation/docs',
            component: ComponentCreator('/documentation/docs', '4e4'),
            routes: [
              {
                path: '/documentation/docs/api/auth',
                component: ComponentCreator('/documentation/docs/api/auth', '177'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/documentation/docs/api/users',
                component: ComponentCreator('/documentation/docs/api/users', '247'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/documentation/docs/architecture/database/candidates',
                component: ComponentCreator('/documentation/docs/architecture/database/candidates', 'ab3'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/documentation/docs/architecture/database/employees',
                component: ComponentCreator('/documentation/docs/architecture/database/employees', '670'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/documentation/docs/architecture/database/migrations',
                component: ComponentCreator('/documentation/docs/architecture/database/migrations', '243'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/documentation/docs/architecture/database/overview',
                component: ComponentCreator('/documentation/docs/architecture/database/overview', 'd70'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/documentation/docs/architecture/database/users',
                component: ComponentCreator('/documentation/docs/architecture/database/users', '2dc'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/documentation/docs/architecture/database/vacancies',
                component: ComponentCreator('/documentation/docs/architecture/database/vacancies', 'f44'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/documentation/docs/architecture/overview',
                component: ComponentCreator('/documentation/docs/architecture/overview', '202'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/documentation/docs/architecture/security',
                component: ComponentCreator('/documentation/docs/architecture/security', '842'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/documentation/docs/getting-started',
                component: ComponentCreator('/documentation/docs/getting-started', '3ef'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/documentation/docs/guides/deployment',
                component: ComponentCreator('/documentation/docs/guides/deployment', '5a9'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/documentation/docs/guides/employee-guide',
                component: ComponentCreator('/documentation/docs/guides/employee-guide', '67a'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/documentation/docs/guides/hr-guide',
                component: ComponentCreator('/documentation/docs/guides/hr-guide', 'fef'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/documentation/docs/intro',
                component: ComponentCreator('/documentation/docs/intro', '6d8'),
                exact: true,
                sidebar: "docs"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/documentation/',
    component: ComponentCreator('/documentation/', '4a1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
