# PR Automator with Gemini AI 🤖✨

[![NPM Version](https://img.shields.io/npm/v/pr-automator-gemini.svg)](https://www.npmjs.com/package/pr-automator-gemini)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Tired of writing repetitive Pull Request descriptions? This command-line interface (CLI) tool automates the creation of Pull Requests (PRs) and Merge Requests (MRs), harnessing the power of **Google's Gemini AI** to generate intelligent titles and descriptions based on your code changes.

Boost your productivity, standardize your documentation, and speed up the code review process!

## Key Features 🚀

- **AI-Generated Content**: Analyzes the `git diff` to create detailed titles and descriptions for your PRs.
- **Multi-Platform Support**: Works seamlessly with both **GitHub** and **GitLab**.
- **Interactive Mode**: A step-by-step wizard that guides you through the PR creation process, perfect for getting started.
- **Direct Mode with Flags**: For power users, pass all options directly in the command for maximum speed.
- **Standardization**: Uses industry-common PR types (`feature`, `bug`, `refactor`, `chore`, `docs`).

---

## Prerequisites

Before you begin, ensure you have the following:

- **Node.js** (v18 or higher)
- **Git** installed on your machine
- A **Google Gemini API Key**. You can get one from the [Google AI Studio](https://aistudio.google.com/app/apikey).

---

## Installation 📦

You can install the tool in two ways, depending on your needs.

### Option 1: Global Installation

This is the recommended approach if you want to use `pr-automator-gemini` in **multiple projects** on your machine. The `create-pr` command will be available everywhere in your terminal.

```bash
npm install -g pr-automator-gemini
```

### Option 2: Local Installation

This is ideal if you want to include the tool as a development dependency in a **single project**. This allows you to lock in a specific version for that project.

```bash
npm install pr-automator-gemini --save-dev
```

---

## Configuration (Required Step) ⚙️

For the tool to work, it needs your API keys. Create a file named `.env` in the **root of your project** (the one you want to create a PR for).

Copy and paste the content below into your `.env` file and fill in your tokens:

```env
# Google Gemini API Key (Required)
PR_AUTOMATOR_GEMINI_API_KEY="your_gemini_api_key_here"

# --- GITHUB CONFIGURATION ---
# GitHub Personal Access Token with 'repo' scope (Required for GitHub)
PR_AUTOMATOR_GITHUB_TOKEN="ghp_your_github_token_here"

# --- GITLAB CONFIGURATION ---
# GitLab Personal Access Token with 'api' scope (Required for GitLab)
PR_AUTOMATOR_GITLAB_TOKEN="glpat-your_gitlab_token_here"

# GitLab API URL (Required for GitLab)
PR_AUTOMATOR_GITLAB_API_URL="https://gitlab.com/api/v4"
for enterprise users: https://gitlab.<company-name>.com/api/v4

# GitLab Project ID (Required for GitLab)
# You can find this on your project's homepage in GitLab.
PR_AUTOMATOR_GITLAB_PROJECT_ID="12345678"
```

**Important**: Add the `.env` file to your `.gitignore` to never expose your secret keys!

---

## Usage 💻

How you run the command depends on how you installed it. Navigate to your project's repository, add and commit your changes, and then follow the appropriate instructions below.

### If Installed Globally

The `create-pr` command is directly available in your terminal.

**Interactive Mode:**

```bash
create-pr create
```

**Direct Mode (with flags):**

```bash
create-pr create --type feature --base main --provider github
```

### If Installed Locally

You must use a package runner like `npx` to execute the command. `npx` will automatically find the command inside your project's `node_modules` folder.

**Interactive Mode:**

```bash
npx create-pr create
```

**Direct Mode (with flags):**

```bash
npx create-pr create --type feature --base main
```

**Alternative (using NPM Scripts):**
You can also add the command to the `scripts` section of your project's `package.json` to create a handy shortcut.

```json
// package.json
"scripts": {
  "new-pr": "create-pr create"
}
```

Then, run it with:

```bash
npm run new-pr
```

---

## Command Options

| Flag         | Alias | Description                                  | Valid Options                                 | Default   |
| ------------ | ----- | -------------------------------------------- | --------------------------------------------- | --------- |
| `--type`     | `-t`  | The type of the Pull Request.                | `feature`, `bug`, `refactor`, `chore`, `docs` | `feature` |
| `--base`     | `-b`  | The target branch for your Pull Request.     | Any existing branch name                      | `main`    |
| `--provider` | `-p`  | The platform where the repository is hosted. | `github`, `gitlab`                            | `github`  |

---

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE` file for more information.
