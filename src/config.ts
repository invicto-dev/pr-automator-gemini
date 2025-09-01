import dotenv from "dotenv";

import { Config } from "./types";

dotenv.config();

export const config: Config = {
  geminiApiKey: process.env.PR_AUTOMATOR_GEMINI_API_KEY || "",
  githubToken: process.env.PR_AUTOMATOR_GITHUB_TOKEN,
  gitlabToken: process.env.PR_AUTOMATOR_GITLAB_TOKEN,
  repoOwner: process.env.PR_AUTOMATOR_REPO_OWNER,
  repoName: process.env.PR_AUTOMATOR_REPO_NAME,
  gitlabProjectId: process.env.PR_AUTOMATOR_GITLAB_PROJECT_ID,
};

if (!config.geminiApiKey) {
  console.error(
    "❌ Erro: The environment variable PR_AUTOMATOR_GEMINI_API_KEY has not been defined."
  );
  process.exit(1);
}
