import inquirer from "inquirer";
import { CLIOptions, FinalOptions } from "./types";
import { getCurrentBranch, getCurrentBranchName, getDiff } from "./git.service";
import { generatePRContent } from "./ai.service";
import { githubService } from "./providers/github.service";
import { gitlabService } from "./providers/gitlab.service";
import { config } from "./config";

async function promptForMissingOptions(
  options: CLIOptions
): Promise<FinalOptions> {
  const questions = [];

  if (!options.type) {
    questions.push({
      type: "list",
      name: "type",
      message: "What is the type of Pull Request?",
      choices: ["feature", "bug", "refactor", "chore", "docs"],
      default: "feature",
    });
  }

  if (!options.base) {
    questions.push({
      type: "input",
      name: "base",
      message: "What is the destination branch?",
      default: "main",
    });
  }

  if (!options.provider) {
    questions.push({
      type: "list",
      name: "provider",
      message: "Where is the repository hosted?",
      choices: ["github", "gitlab"],
      default: "github",
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    type: options.type || answers.type,
    base: options.base || answers.base,
    provider: options.provider || answers.provider,
  };
}

export async function handleCreateCommand(options: CLIOptions) {
  try {
    const finalOptions = await promptForMissingOptions(options);

    if (finalOptions.provider === "github") {
      if (!config.githubToken)
        throw new Error(" PR_AUTOMATOR_GITHUB_TOKEN not defined in .env");
    }

    if (finalOptions.provider === "gitlab") {
      if (!config.gitlabToken)
        throw new Error(" PR_AUTOMATOR_GITLAB_TOKEN not defined in .env");
      if (!config.gitlabProjectId)
        throw new Error(" PR_AUTOMATOR_GITLAB_PROJECT_ID not defined in .env");
      if (!config.gitLabApiUrl)
        throw new Error(" PR_AUTOMATOR_GITLAB_API_URL not defined in .env");
    }

    console.log("🤖 Analyzing changes...");
    const currentBranch = await getCurrentBranch();
    if (currentBranch === finalOptions.base) {
      console.error(
        `❌ Error: You are already on the target branch ('${finalOptions.base}').`
      );
      return;
    }

    const diff = await getDiff(finalOptions.base);
    if (!diff) {
      console.error(
        "⚠️ No changes found for PR. Use `git add .` to stage your files."
      );
      return;
    }

    const brachName = await getCurrentBranchName();
    const defaultTitle = `${finalOptions.type.toUpperCase()}: ${brachName}`;

    const { inputTitle } = await inquirer.prompt([
      {
        type: "input",
        name: "input_title",
        message: "What is the title of the PR?",
        default: defaultTitle,
      },
    ]);

    console.log("🧠 Generating content with Gemini AI...");
    const prContent = await generatePRContent(diff, finalOptions.type);
    if (!prContent) return;

    console.log("\n----------------------------------------");
    console.log(`Title: ${defaultTitle}`);
    console.log("\n----------------------------------------");

    console.log(`Content:\n${prContent.body}\n`);
    console.log(`\n${prContent.body}`);
    console.log("----------------------------------------\n");

    const { proceed } = await inquirer.prompt([
      {
        type: "confirm",
        name: "proceed",
        message: "Would you like to create a Pull Request with this content?",
        default: true,
      },
    ]);

    if (!proceed) {
      console.log("Creation of PR canceled.");
      return;
    }

    console.log(
      `🚀 Creating ${
        finalOptions.provider === "github" ? "Pull Request" : "Merge Request"
      }...`
    );

    let prUrl: string | null = null;
    if (finalOptions.provider === "github") {
      prUrl = await githubService.create({
        ...prContent,
        title: inputTitle,
        head: currentBranch,
        base: finalOptions.base,
      });
    } else {
      prUrl = await gitlabService.create({
        ...prContent,
        title: "meu",
        head: currentBranch,
        base: finalOptions.base,
      });
    }

    if (prUrl) {
      console.log(`✅ Success! Access at: ${prUrl}`);
    }
  } catch (error: any) {
    console.error(`❌ An unexpected error occurred: ${error.message}`);
  }
}
