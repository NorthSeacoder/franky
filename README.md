# Franky

<h1 align="center">Franky <sup>VS Code</sup></h1>
<p align="center">
<a href="https://marketplace.visualstudio.com/items?itemName=NorthSeacoder.franky" target="__blank"><img src="https://img.shields.io/visual-studio-marketplace/v/NorthSeacoder.franky.svg?color=eee&amp;label=VS%20Code%20Marketplace&logo=visual-studio-code" alt="Visual Studio Marketplace Version" /></a>
<a href="https://marketplace.visualstudio.com/items?itemName=NorthSeacoder.franky" target="__blank"><img src="https://img.shields.io/visual-studio-marketplace/d/NorthSeacoder.franky.svg?color=4bdbe3" alt="Downloads" /></a>
<a href="https://marketplace.visualstudio.com/items?itemName=NorthSeacoder.franky" target="__blank"><img src="https://img.shields.io/visual-studio-marketplace/i/NorthSeacoder.franky.svg?color=63ba83" alt="Installs" /></a>
</p>
<p align="center">
A comprehensive development toolkit for enhanced productivity<br>
</p>

## ✨ Features

### 📝 File Header

Automatically add and maintain file header comments with author information and modification timestamps.

**Supported file types**: JavaScript, TypeScript, Vue, React, and more.

**Key Features**:

- Zero configuration - automatically fetches author from Git config
- Auto-update modification time on file save
- Language-specific comment styles

**Usage**:

- Press `Ctrl+Alt+I` to insert a file header
- Headers automatically update when you save the file

**Example** (JavaScript/TypeScript):

```javascript
/**
 * @Author: Your Name
 * @Date: 2024-01-01 10:00:00
 * @Last Modified by: Your Name
 * @Last Modified time: 2024-01-01 11:30:00
 */
```

**Example** (Vue):

```html
<!-- @Author: Your Name -->
<!-- @Date: 2024-01-01 10:00:00 -->
<!-- @Last Modified by: Your Name -->
<!-- @Last Modified time: 2024-01-01 11:30:00 -->
```

### 🚀 CI/CD Quick Access

Add a status bar button for quick navigation to your CI/CD platform (Jenkins, GitHub Actions, etc.).

**Configuration**:

```json
{
  "franky.cicd.url": "https://your-jenkins-url.com"
}
```

### 🎨 Code Generators

Generate boilerplate code for common patterns:

#### Vue Page Generator

Right-click a folder in the explorer → **Franky** → **生成新页面(vue)**

Generates a complete Vue component structure with:

- `index.vue` - Main component
- `constant/fields.ts` - Field definitions
- `constant/options.ts` - Options configuration
- `modal/edit-modal.vue` - Edit modal
- `modal/detail-modal.vue` - Detail modal

#### React Page Generator

Right-click a folder → **Franky** → **生成新页面(react)**

Generates React/TypeScript component structure.

#### WordPress Page Generator

Right-click a folder → **Franky** → **生成新页面(wp)**

Generates WordPress-compatible component structure.

### 🎯 Developer Utilities

#### Generate Field Definitions

Copy a JSON object → Right-click in editor → **Franky** → **根据复制内容生成 fields**

Transforms:

```json
{
  "name": "User Name",
  "age": "Age",
  "email": "Email Address"
}
```

Into:

```typescript
name: { field: "name", label: pre("name") },
age: { field: "age", label: pre("age") },
email: { field: "email", label: pre("email") },
```

#### CSS to Tailwind Converter

Copy CSS code → Right-click in editor → **Franky** → **根据复制的CSS生成TailwindCSS 类名**

Converts standard CSS to Tailwind CSS utility classes.

### 📦 Dynamic Templates

Create and manage custom code templates using the template system.

- **Template Repository**: Clone and manage template repositories
- **Template Variables**: Use Handlebars syntax for dynamic content
- **Visual Editor**: Configure templates through a visual form interface

**Configuration**:

```json
{
  "franky.templates.repository": "https://github.com/your-username/templates.git",
  "franky.templates.local": "/tmp/franky"
}
```

## 🛠️ Configuration

Open VS Code Settings and search for "Franky" to configure:

| Setting                       | Type    | Default                                          | Description                 |
| ----------------------------- | ------- | ------------------------------------------------ | --------------------------- |
| `franky.fileheader.disabled`  | boolean | `false`                                          | Disable file header feature |
| `franky.cicd.url`             | string  | `https://www.jenkins.io/`                        | CI/CD platform URL          |
| `franky.templates.repository` | string  | `https://github.com/NorthSeacoder/templates.git` | Template repository URL     |
| `franky.templates.local`      | string  | `/tmp/franky`                                    | Local template storage path |

## ⌨️ Keyboard Shortcuts

| Command     | Shortcut     | Description                |
| ----------- | ------------ | -------------------------- |
| File Header | `Ctrl+Alt+I` | Insert file header comment |
| Diff Log    | `Ctrl+Alt+D` | Show git diff log          |

## 🚀 Development

### Prerequisites

- Node.js >= 18
- pnpm (via corepack)

### Setup

```bash
# Install dependencies
pnpm install

# Development mode (watch)
pnpm run dev

# Build extension
pnpm run build

# Run tests
pnpm run test

# Run tests with coverage
pnpm run test:coverage

# Type checking
pnpm run typecheck

# Linting
pnpm run lint

# Format code
pnpm run format
```

### Project Structure

```
franky/
├── packages/
│   ├── extension/        # VS Code extension
│   │   ├── src/
│   │   │   ├── commands/    # Command implementations
│   │   │   ├── common/      # Shared utilities
│   │   │   └── index.ts     # Extension entry
│   │   └── test/            # Tests and coverage
│   └── view/             # React webview bundle
├── package.json          # Workspace scripts and tooling
└── pnpm-workspace.yaml   # Workspace configuration
```

### Testing

```bash
# Run all tests
pnpm run test

# Watch mode
pnpm run test:watch

# Coverage report
pnpm run test:coverage
```

### Release

```bash
# Bump version and publish
pnpm run release
```

## 📝 License

[MIT](LICENSE)

## 🙏 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📮 Feedback

- [Report Issues](https://github.com/NorthSeacoder/franky/issues)
- [Submit Feature Requests](https://github.com/NorthSeacoder/franky/issues/new)

## 🔗 Links

- [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=NorthSeacoder.franky)
- [GitHub Repository](https://github.com/NorthSeacoder/franky)
- [Changelog](CHANGELOG.md)
