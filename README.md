# PR Automator with Gemini AI 🤖✨

[![NPM Version](https://img.shields.io/npm/v/pr-automator-gemini.svg)](https://www.npmjs.com/package/pr-automator-gemini)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Tired of writing repetitive Pull Request descriptions? This command-line interface (CLI) tool automates the lifecycle of your Pull Requests (PRs) and Merge Requests (MRs), leveraging the power of **Google's Gemini** AI to generate intelligent descriptions based on your code changes.

Now with smart updates and deep integration with GitHub Issues, you can go from code to a fully documented, review-ready PR in seconds. Boost your productivity, standardize your documentation, and speed up the code review process\!

## Key Features 🚀

- **AI-Generated Content**: Analyzes the `git diff` to create detailed descriptions for your PRs.
- **Multi-Platform Support**: Works seamlessly with **GitHub** and **GitLab**.
- **🔄 Smart Updates**: Automatically detects if a PR/MR already exists for your branch and updates it, preventing duplicates.
- **🔗 Automatic Issue Linking (GitHub)**: Intelligently links your PR to a GitHub Issue.
- **📝 AI-Powered Issue Documentation (GitHub)**: When an issue is linked, the tool uses Gemini to fill out a detailed template (`Task Description`, `User Story`, `How to Test`) directly in the issue's description, saving a huge amount of documentation time.
- **Interactive Mode**: A step-by-step wizard that guides you through the creation process.
- **Direct Mode with Flags**: For advanced users, pass all options directly in the command for maximum speed.

---

## Prerequisites

Before you begin, ensure you have:

- **Node.js** (v18 or higher)
- **Git** installed on your machine
- A **Google Gemini API Key**. You can get one at [Google AI Studio](https://aistudio.google.com/app/apikey).

---

## Installation 📦

You can install the tool in two ways, depending on your needs.

### Option 1: Global Installation

This is the recommended approach if you want to use `pr-automator-gemini` across **multiple projects** on your machine. The `create-pr` command will be available anywhere in your terminal.

```bash
npm install -g pr-automator-gemini
```

### Option 2: Local Installation

Ideal if you want to include the tool as a development dependency in a **single project**. This allows you to lock a specific version for that project.

```bash
npm install pr-automator-gemini --save-dev
```

---

## Configuration (Required Step) ⚙️

For the tool to work, it needs your API keys. Create a file named `.env` in the **root of your project** (the one you want to create the PR for).

Copy and paste the content below into your `.env` file and fill it in with your tokens:

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
# for enterprise users: https://gitlab.<company-name>.com/api/v4

# GitLab Project ID (Required for GitLab)
# You can find this on your project's homepage in GitLab.
PR_AUTOMATOR_GITLAB_PROJECT_ID="12345678"
```

**Important**: Add the `.env` file to your `.gitignore` to never expose your secret keys\!

---

## How to Use 💻

How you run the command depends on how you installed it. Navigate to your project's repository, add and commit your changes, push to the remote repository, and then follow the appropriate instructions below.

### If Installed Globally

The `create-pr` command is directly available in your terminal.

**Interactive Mode:**

```bash
create-pr generate
```

**Direct Mode (with flags):**

```bash
create-pr generate --type feature --base main --provider github
```

### If Installed Locally

You must use a package runner like `npx` to run the command. `npx` will automatically find the command inside your project's `node_modules` folder.

**Interactive Mode:**

```bash
npx create-pr generate
```

**Direct Mode (with flags):**

```bash
npx create-pr generate --type feature --base main
```

### ✨ New: GitHub Issues Integration

To link and update a GitHub Issue, use the `--issue` flag. The tool will automatically update the issue's description with an AI-generated template and link the PR to it.

```bash
# Example: Link and document Issue #42
create-pr generate --type bug --base develop --issue 42
```

**Don't need a flag?** If you don't provide an issue number, the tool will skip automatic linking.

---

## Command Options

| Flag         | Shortcut | Description                                          | Valid Options                                 | Default         |
| :----------- | :------- | :--------------------------------------------------- | :-------------------------------------------- | :-------------- |
| `--type`     | `-t`     | The type of the Pull Request.                        | `feature`, `bug`, `refactor`, `chore`, `docs` | `feature`       |
| `--base`     | `-b`     | The target branch for your Pull Request.             | Any existing branch name                      | `main`          |
| `--provider` | `-p`     | The platform where the repository is hosted.         | `github`, `gitlab`                            | `github`        |
| `--language` | `-l`     | The output language of the Pull Request description. | `English`, `Spanish`, `Portuguese`            | `English`       |
| `--issue`    | `-i`     | **(GitHub Only)** Issue \# to link and update.       | Any valid issue \#                            | `Auto-detected` |

---

## How to Contribute

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## License

Distributed under the MIT License. See the `LICENSE` file for more information.
