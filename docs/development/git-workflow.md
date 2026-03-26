---
sidebar_position: 1
title: Git Workflow
description: Git branching strategy and contribution guidelines
---

# Git Workflow

This document describes the Git branching strategy, workflow rules, and contribution process for the project.

## Branching Strategy

We use an **adapted GitHub Flow with a `develop` branch**. This approach ensures:
- `main` stays stable and production-ready at all times
- Feature integration can be tested in `develop` before release
- Accidental merges to production are prevented

### Branch Structure
- main # production — stable releases only
- develop # staging — feature integration before release
- feature/* # individual tasks (created from develop)
- hotfix/* # critical fixes (created from main)

## Workflow Process

### 1. Starting a New Feature

Always create feature branches from an up-to-date `develop`:

```bash
# Update develop
git checkout develop
git pull origin develop

# Create a branch for your task
git checkout -b feature/task-name
```

### 2. Working on a Feature

```bash
# Commit changes regularly
git add .
git commit -m "feat: describe your changes"

# Periodically pull updates from develop
git checkout develop
git pull origin develop
git checkout feature/task-name
git merge develop 
```

### 3. Completing a Feature
After finishing work and passing all checks:

```bash
# Switch to develop
git checkout develop
git pull origin develop

# Merge the feature branch
git merge feature/task-name --no-ff
git push origin develop

# Delete local branch (optional)
git branch -d feature/task-name
```

### 4. Releasing to Production
When enough features have accumulated in develop for a release:

```bash
# Switch to main
git checkout main
git pull origin main 

# Merge develop with a merge commit
git merge develop --no-ff -m "Release: v1.2.0"

# Create version tag
git tag -a v1.2.0 -m "Version 1.2.0"

# Push changes and tags
git push origin main --tags
```

### 5. Hotfixes
For critical bugs in production:

```bash
# Create branch from main
git checkout main
git pull origin main
git checkout -b hotfix/problem-description

# Fix the issue and commit
git add .
git commit -m "hotfix: describe the fix"

# Merge to main
git checkout main
git pull origin main
git merge hotfix/problem-description --no-ff
git tag -a v1.2.1 -m "Hotfix v1.2.1"
git push origin main --tags

# Merge to develop (important!)
git checkout develop
git pull origin develop
git merge hotfix/problem-description --no-ff
git push origin develop

# Delete the branch
git branch -d hotfix/problem-description
```

### 6. Rules

✅ What to Do
Create feature branches from an up-to-date develop

Use clear branch names: feature/user-auth, feature/add-tests

Write meaningful commit messages

Regularly pull changes from develop into your feature branch

Use squash merges for cleaner history (optional)

Use tags for versions on main

❌ What NOT to Do
Push directly to main or develop

Use git push --force on shared branches

Work directly in develop (all changes go through feature branches)

Merge feature branches directly to main

Leave unused branches in the repository

### 7. Useful Commands

```bash
# Show commit graph
git log --oneline --graph --all --decorate

# Show all branches
git branch -a

# Clean up local branches that no longer exist remotely
git remote prune origin
git branch -vv | grep ': gone]' | awk '{print $1}' | xargs git branch -d

# Create a tag
git tag -a v1.0.0 -m "Version 1.0.0"

# List all tags
git tag -l

# Undo last commit (careful!)
git reset --soft HEAD~1
```

### 8. Common Issues and Solutions
Merge Conflicts:

```bash
# 1. Get latest changes
git checkout develop
git pull origin develop

# 2. Switch to your branch
git checkout feature/my-feature

# 3. Merge develop
git merge develop

# 4. Resolve conflicts manually
# Edit files, remove markers <<<<<<<, =======, >>>>>>>

# 5. Complete the merge
git add .
git commit -m "merge: resolve conflicts with develop"
git push origin feature/my-feature
```