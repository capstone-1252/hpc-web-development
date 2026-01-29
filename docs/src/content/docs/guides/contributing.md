---
title: Contributing Through Github
description: How to effectively commit and merge code with the teamd
---
# Collaboration Workflow


Follow this guide to ensure smooth collaboration on the Starlight site. We use GitHub Flow for all development.

Tip: You can use GitHub CLI, Desktop, or your favorite Git client—the methodology is the same.

## 1. Branching

Always work in feature branches. Never commit directly to main.

Use clear, descriptive branch names, for example:
- feature/add-login
- fix/header-typo
- improvement/performance-update

Keep branches small and focused to make reviews easier.

## 2. Pull Requests

Once your feature is ready:

1. Push your branch to GitHub:
```
git push origin feature/my-feature
```
2. Open a pull request (PR) on GitHub.
3. Team members will review and leave comments if changes are needed.
4. After addressing feedback, merge the PR into main.
5. Delete your branch after merging to keep the repo clean.

Tip: Use descriptive PR titles and include a brief summary of the change.  
Example: Add helper function to extract product price

## 3. Recommended Git Commands

```
# Clone the repository
git clone <repo-url>

# Create a new branch
git checkout -b feature/my-feature

# Stage and commit changes frequently
git add .
git commit -m "Add helper function to extract product price"

# Push your branch
git push origin feature/my-feature
```

Tip: Commit often, but make sure each commit is meaningful. Avoid vague messages like "some updates".

## 4. Issues

Use GitHub Issues to track bugs, improvements, and features:

1. Open an issue when you find a bug or have an idea: https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/about-issues
2. Use templates where available. More templates: https://github.com/topics/issue-templates
3. Apply relevant labels: bug, feature, improvement.
4. Close issues automatically by referencing them in your PR:  
Example: Fix login bug: closes #123

## 5. Testing & Workflows

- Automated tests help ensure development → production reliability.
- The Lead Developer writes primary workflows, but everyone can add tests or improvements.
- Always verify your changes work in production builds before merging.

Tip: Even small changes can break production. Testing prevents future issues.

## 6. Best Practices

- Keep commits atomic: one logical change per commit.
- Rebase frequently to reduce conflicts with main.
- Update documentation if your changes affect APIs or features.
- Tag team members for review when needed.
- Keep PRs small for faster, easier reviews.

Outcome: Following this workflow ensures clean collaboration, minimal conflicts, and stable production builds for the Starlight site.

