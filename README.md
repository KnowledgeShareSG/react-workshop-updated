# Introduction to React
Welcome to the React Workshop! In this workshop, you will learn React concepts by building a stock market application with a search functionality and stock metadata display.

## Workshop Structure
* Part 1: Environment Setup
* Part 2: Creating React Components (Sock Card)
* Part 3: API Integration and Data Fetching
* Part 4: Building the Complete Stocks Application
* Part 5: Deployment

## Part 1: Environment Setuyp
### Prerequisites

Before we start, you will need to install the following tools on your system:

### 1. Node.js and NPM

**What is Node.js?**
Node.js is a JavaScript runtime that allows you to run JavaScript outside of the browser. NPM (Node Package Manager) comes bundled with Node.js and helps manage project dependencies.

#### Installation:

**Option A: Direct Download**
- Visit [nodejs.org](https://nodejs.org/)
- Download the LTS (Long Term Support) version
- Follow the installation wizard

**Option B: Using Package Managers**

**macOS:**
```bash
# Using Homebrew
brew install node

# Using MacPorts
sudo port install nodejs18
```

**Windows:**
```bash
# Using Chocolatey
choco install nodejs

# Using Winget
winget install OpenJS.NodeJS
```

**Linux (Ubuntu/Debian):**
```bash
# Using apt
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

**Verify Installation:**
```bash
node --version
npm --version
```

### 2. NVM (Node Version Manager) - Recommended

NVM allows you to install and switch between different Node.js versions easily.

**macOS/Linux:**
```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload your terminal or run:
source ~/.bashrc

# Install and use latest LTS Node.js
nvm install --lts
nvm use --lts
```

**Windows:**
```bash
# Install nvm-windows from: https://github.com/coreybutler/nvm-windows/releases
# Then in Command Prompt or PowerShell:
nvm install lts
nvm use lts
```

### 3. Visual Studio Code

Download and install VS Code from [code.visualstudio.com](https://code.visualstudio.com/)

#### Essential Extensions for React Development:

**Must-Have Extensions:**
1. **ES7+ React/Redux/React-Native snippets** - Provides useful code snippets
2. **Prettier - Code formatter** - Automatic code formatting
3. **Bracket Pair Colorizer** - Makes matching brackets easier to see
4. **Auto Rename Tag** - Automatically renames paired HTML/JSX tags
5. **Thunder Client** - API testing tool (alternative to Postman)

**Recommended Extensions:**
6. **GitLens** - Enhanced Git capabilities
7. **Live Server** - Launch development local server
8. **Path Intellisense** - Autocompletes filenames
9. **Color Highlight** - Highlights web colors in your code
10. **Indent-Rainbow** - Makes indentation easier to read

#### Installing Extensions:

**Method 1: VS Code Extension Marketplace**
1. Open VS Code
2. Click on Extensions icon (Ctrl+Shift+X)
3. Search for extension name
4. Click Install

**Method 2: Command Line**
```bash
# Install all essential extensions at once
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension esbenp.prettier-vscode
code --install-extension CoenraadS.bracket-pair-colorizer
code --install-extension formulahendry.auto-rename-tag
code --install-extension rangav.vscode-thunder-client
```

### 4. Git (Version Control)

**Installation:**

**macOS:**
```bash
# Git usually comes pre-installed, but to get latest version:
brew install git
```

**Windows:**
- Download from [git-scm.com](https://git-scm.com/)
- Or use: `winget install Git.Git`

**Linux:**
```bash
sudo apt update
sudo apt install git
```

**Verify Installation:**
```bash
git --version
```


## Project Setup
### Install dependencies
npm install

### Start development server
npm run dev


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
