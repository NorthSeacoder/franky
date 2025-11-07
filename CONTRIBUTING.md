# Contributing to Franky

Thank you for your interest in contributing to Franky! This document provides guidelines and instructions for contributing.

## 🚀 Quick Start

1. **Fork and Clone**

```bash
git clone https://github.com/YOUR_USERNAME/franky.git
cd franky
```

2. **Install Dependencies**

```bash
corepack enable
pnpm install
```

3. **Development**

```bash
# Start development mode
pnpm run dev

# Run tests
pnpm run test

# Type check
pnpm run typecheck

# Lint and format
pnpm run lint
pnpm run format
```

## 📝 Development Workflow

### Branch Naming

- `feat/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `refactor/what-changed` - Code refactoring
- `docs/documentation-update` - Documentation changes
- `test/test-description` - Test additions/modifications

### Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): subject

body

footer
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:

```bash
feat(fileheader): add support for Python files
fix(generator): resolve path resolution on Windows
docs(readme): update installation instructions
test(utils): add tests for git utility functions
```

Use the commitizen tool:

```bash
pnpm run cz
```

### Code Style

- Use TypeScript for all code
- Follow existing code patterns
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions small and focused

### Testing

- Write tests for new features
- Maintain test coverage above 70%
- Test edge cases and error scenarios
- Use descriptive test names

```typescript
describe('Feature Name', () => {
  it('should handle normal case', () => {
    // Test implementation
  });

  it('should handle edge case', () => {
    // Test implementation
  });

  it('should throw error on invalid input', () => {
    // Test implementation
  });
});
```

### Pull Request Process

1. **Create a Branch**

```bash
git checkout -b feat/your-feature-name
```

2. **Make Changes**

- Write clean, tested code
- Follow existing patterns
- Update documentation

3. **Test Your Changes**

```bash
pnpm run test
pnpm run lint
pnpm run typecheck
```

4. **Commit**

```bash
pnpm run cz
```

5. **Push and Create PR**

```bash
git push origin feat/your-feature-name
```

Create a pull request with:

- Clear title and description
- Reference any related issues
- Include screenshots for UI changes
- List breaking changes (if any)

6. **Review Process**

- Address review feedback
- Keep commits clean and focused
- Squash commits if requested

## 🏗️ Project Structure

```
packages/extension/
├── src/
│   ├── commands/         # Command implementations
│   │   ├── fileheader/
│   │   ├── generate/
│   │   └── template/
│   ├── common/           # Shared utilities
│   │   ├── context.ts    # Global state
│   │   └── utils/        # Utility functions
│   └── index.ts          # Extension entry point
└── test/                 # Tests
```

## 🐛 Reporting Bugs

Include:

- VS Code version
- Extension version
- Operating system
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Error messages

## 💡 Suggesting Features

- Check existing issues first
- Describe the use case
- Explain why it's useful
- Provide examples

## 📚 Documentation

- Update README.md for new features
- Add JSDoc comments for public APIs
- Update CHANGELOG.md
- Include code examples

## ⚖️ Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Give constructive feedback
- Focus on the code, not the person

## 🔧 Development Tips

### Debugging

1. Open the extension project in VS Code
2. Press F5 to launch Extension Development Host
3. Set breakpoints in your code
4. Use the Debug Console for logging

### Testing Locally

```bash
# Package extension
pnpm run pack

# Install .vsix file in VS Code
code --install-extension franky-*.vsix
```

### Common Issues

**Problem**: TypeScript errors

**Solution**: Run `pnpm run typecheck` and fix type errors

**Problem**: Tests failing

**Solution**: Clear cache and reinstall

```bash
pnpm run clean:all
pnpm install
pnpm run test
```

## 📮 Questions?

- Open an issue for questions
- Join discussions
- Check existing documentation

## 🎉 First Time Contributors

Look for issues labeled:

- `good first issue` - Simple issues for beginners
- `help wanted` - Community help needed
- `documentation` - Documentation improvements

Thank you for contributing! 🙏
