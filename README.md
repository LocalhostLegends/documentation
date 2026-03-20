# HR Platform Documentation

[![Docusaurus](https://img.shields.io/badge/Docusaurus-3.x-green)](https://docusaurus.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

Documentation website for HR Platform - modern HR Tech solution for workforce management.

## 📋 Quick Start

### Prerequisites
- Node.js 20+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/LocalhostLegends/documentation.git
cd documentation

# Install dependencies
npm install

# Start development server
npm run start
```

Open http://localhost:3000/hr-platform-docs/ to view the documentation.

The server supports hot-reload - changes are reflected live without restarting.

## 📝 Editing Documentation

Documentation files are located in the docs/ folder:

```
docs/
├── intro.md                 # Introduction page
├── getting-started.md       # Getting started guide
├── api/                     # API documentation
│   ├── auth.md
│   └── users.md
├── architecture/            # Architecture docs
│   ├── overview.md
│   ├── security.md
│   └── database/
│       ├── overview.md
│       ├── users.md
│       └── employees.md
└── guides/                  # User guides
    ├── hr-guide.md
    ├── employee-guide.md
    └── deployment.md
```

### Adding New Pages
- Create a new .md file in the appropriate folder

- Add the page to sidebars.ts if needed

- Save and see changes immediately

### Blog Posts
Blog posts go in the blog/ folder:

```bash
# Create a new post
mkdir blog/2026-03-20-post-name
echo "# Post Title" > blog/2026-03-20-post-name/index.md
```

### 🔧 Configuration
Main configuration files:

- docusaurus.config.ts - Site title, navbar, footer, theme settings

- sidebars.ts - Documentation sidebar structure

- src/css/custom.css - Custom CSS overrides

### Related Repositories

- **[Backend API](https://github.com/LocalhostLegends/backend)** - NestJS + PostgreSQL + TypeORM
- **[Frontend App](https://github.com/LocalhostLegends/frontend)** - Angular + Angular Material
- **[Documentation](https://github.com/LocalhostLegends/documentation)** - This repository

###  Contributing

1. Fork the repository

2. Create a feature branch (git checkout -b feature/amazing-feature)

3. Commit changes (git commit -m 'Add amazing feature')

4. Push to branch (git push origin feature/amazing-feature)

5. Open a Pull Request