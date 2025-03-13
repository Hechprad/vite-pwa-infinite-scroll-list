# 🚀 Vite PWA Infinite Scroll List

![React](https://img.shields.io/badge/React.js-19-blue.svg)
![Vite](https://img.shields.io/badge/Vite-6.2.0-purple.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-✔-green.svg)
![ShadCN UI](https://img.shields.io/badge/ShadCN_UI-✔-yellow.svg)
![Vitest](https://img.shields.io/badge/Vitest-✔-red.svg)
![Testing Library](https://img.shields.io/badge/Testing_Library-✔-orange.svg)
![Vite Plugin PWA](https://img.shields.io/badge/Vite_PWA-✔-blue.svg)
![Husky](https://img.shields.io/badge/Husky-✔-black.svg)
![ESLint](https://img.shields.io/badge/ESLint-✔-red.svg)
![Prettier](https://img.shields.io/badge/Prettier-✔-orange.svg)
![EditorConfig](https://img.shields.io/badge/EditorConfig-✔-gray.svg)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-✔-blue.svg)

## 🌟 Overview

**Vite PWA Infinite Scroll List** is a modern **Progressive Web App (PWA)** built with **React 19**, **Vite 6.2.0**, and **TypeScript 5.7.2**. It features **infinite scrolling** with **react-stately** and **lodash** debounce for search. The UI is styled with **Tailwind CSS** and **ShadCN UI** with **dark mode**, ensuring a sleek and accessible design.
The integration for product listing was implemented using this API for testing purposes only: [FakeAPI Platzi](https://fakeapi.platzi.com/en/rest/products-filter/).

## 🚀 Live Demo

🔗 **[Check out the deployed application here!](https://vite-pwa-infinite-scroll-list.vercel.app/)**

## 📖 Table of Contents

- [🚀 Vite PWA Infinite Scroll List](#-vite-pwa-infinite-scroll-list)
  - [🌟 Overview](#-overview)
  - [🚀 Live Demo](#-live-demo)
  - [📖 Table of Contents](#-table-of-contents)
  - [🚀 Project Setup](#-project-setup)
  - [🛠 Running Tests](#-running-tests)
  - [📂 Project Structure](#-project-structure)
  - [🌍 Available Routes](#-available-routes)
  - [🌍 Available Features](#-available-features)
  - [🤖 GitHub Actions](#-github-actions)
  - [👤 Author](#-author)

## 🚀 Project Setup

To get started, make sure you have **Node.js >= 22** and **npm >= 10** installed.

```bash
# Clone the repository
git clone https://github.com/your-repo/vite-pwa-infinite-scroll-list.git
cd vite-pwa-infinite-scroll-list

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 🛠 Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📂 Project Structure

```bash
📦 vite-pwa-infinite-scroll-list
 ┣ 📂 .github             # GitHub workflows for CI/CD
 ┣ 📂 .husky              # Husky hooks for pre-commit
 ┣ 📂 .vscode             # VS Code settings and extensions
 ┣ 📂 public              # Static files (icons, PWA assets)
 ┣ 📂 src                 # Main source code
 ┃ ┣ 📂 components        # Reusable UI components
 ┃ ┣ 📂 hooks             # Custom hooks
 ┃ ┣ 📂 pages             # Page components
 ┃ ┣ 📂 lib               # External lib configs
 ┃ ┣ 📂 test              # Vitest and Testing Library configs
 ┃ ┣ 📂 types             # Global types
 ┣ 📜 .editorconfig       # Code formatting rules
 ┣ 📜 .env                # Environment variables example
 ┣ 📜 .gitattributes      # Git attributes configuration
 ┣ 📜 .gitignore          # Ignored files for Git
 ┣ 📜 .prettierignore     # Files ignored by Prettier formatting
 ┣ 📜 .prettierrc.json    # Prettier configuration
 ┣ 📜 components.json     # ShadCN UI component registry
 ┣ 📜 eslint.config.js    # ESLint rules and configuration
 ┣ 📜 index.html          # Main HTML file
 ┣ 📜 package.json        # Project dependencies
 ┣ 📜 README.md           # Project documentation
 ┣ 📜 tsconfig.app.json   # TypeScript configuration for application code
 ┣ 📜 tsconfig.json       # TypeScript settings
 ┣ 📜 tsconfig.node.json  # TypeScript configuration for Node.js files
 ┣ 📜 vite.config.ts      # Vite configuration
```

## 🌍 Available Routes

| Route       | Description   |
| ----------- | ------------- |
| `/`         | Home page     |
| `/products` | Products list |
| `/about`    | Empty page    |

## 🌍 Available Features

✅ **Infinite Scrolling** - Fetches more content as the user scrolls
✅ **Search and filter** - Search and filter products
✅ **Mobile-First UI** - Fully responsive design
✅ **Type Safety** - Powered by TypeScript
✅ **Testing Suite** - Unit tests
✅ **Dark mode support** - Toggle between light and dark mode
✅ **PWA Support**

## 🤖 GitHub Actions

This project includes **CI/CD automation** with GitHub Actions:

- **Lint & Test**: Runs ESLint and tests on every pull request
- **Build & Deploy**: Deploys to the chosen hosting provider on `main` branch updates

## 👤 Author

**Jorge Hecherat**
💻 [GitHub](https://github.com/hechprad) • 📧 [Email](mailto:hecherat@gmail.com)
